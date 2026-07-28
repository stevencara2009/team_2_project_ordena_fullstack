import mysql from "mysql2/promise";

const isProduction = process.env.NODE_ENV === 'production' || (process.env.DB_HOST && !process.env.DB_HOST.includes('localhost'));

const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT) || 3306,
  ssl: isProduction ? { rejectUnauthorized: false } : false
};

const pool = mysql.createPool(config);

const TAX_RATE = 0.19;

export class BillModel {
  // =========================================
  // OBTENER FACTURAS (listado con filtros)
  // =========================================
  static async getAll({
    from,
    to,
    payment_method,
    table_number,
    client_id,
  } = {}) {
    const conditions = [];
    const values = [];

    if (from) {
      conditions.push("DATE(b.date) >= ?");
      values.push(from);
    }

    if (to) {
      conditions.push("DATE(b.date) <= ?");
      values.push(to);
    }

    if (payment_method) {
      conditions.push("b.payment_method = ?");
      values.push(payment_method);
    }

    if (table_number) {
      conditions.push("t.number = ?");
      values.push(table_number);
    }

    if (client_id) {
      conditions.push("b.client_id = ?");
      values.push(client_id);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

    const [rows] = await pool.query(
      `
      SELECT

      b.id,
      b.order_id,
      b.date,
      b.subtotal,
      b.tax,
      b.total,
      b.payment_method,

      t.number AS table_number,

      w.name AS waiter_name,
      w.lastname AS waiter_lastname,

      ca.name AS cashier_name,
      ca.lastname AS cashier_lastname,

      cl.name AS client_name,
      cl.lastname AS client_lastname

      FROM tbl_bills b

      INNER JOIN tbl_orders o
          ON b.order_id = o.id

      INNER JOIN tbl_tables t
          ON o.table_number = t.number

      INNER JOIN tbl_users w
          ON b.waiter_id = w.id

      LEFT JOIN tbl_users ca
          ON b.cashier_id = ca.id

      LEFT JOIN tbl_users cl
          ON b.client_id = cl.id

      ${whereClause}

      ORDER BY b.date DESC
      `,
      values,
    );

    return rows;
  }

  // =========================================
  // OBTENER FACTURA POR ID
  // =========================================
  static async getById({ id }) {
    const [rows] = await pool.query(`SELECT * FROM tbl_bills WHERE id = ?;`, [
      id,
    ]);

    if (rows.length === 0) return null;
    return rows[0];
  }

  // =========================================
  // OBTENER DETALLE DE FACTURA
  // =========================================
  static async getDetails({ id }) {
    const [bills] = await pool.query(
      `
            SELECT

            b.id,
            b.date,
            b.subtotal,
            b.tax,
            b.total,
            b.payment_method,

            cl.id AS client_id,
            cl.name AS client_name,
            cl.lastname AS client_lastname,
            cl.dni AS client_dni,

            w.id AS waiter_id,
            w.name AS waiter_name,
            w.lastname AS waiter_lastname,

            ca.id AS cashier_id,
            ca.name AS cashier_name,
            ca.lastname AS cashier_lastname,

            t.id AS table_id,
            t.number AS table_number,

            o.id AS order_id

            FROM tbl_bills b

            INNER JOIN tbl_orders o
                ON b.order_id = o.id

            INNER JOIN tbl_tables t
                ON o.table_number = t.number

            INNER JOIN tbl_users w
                ON b.waiter_id = w.id

            LEFT JOIN tbl_users ca
                ON b.cashier_id = ca.id

            LEFT JOIN tbl_users cl
                ON b.client_id = cl.id

            WHERE b.id = ?
        `,
      [id],
    );

    const bill = bills[0];
    if (!bill) return null;

    const [products] = await pool.query(
      `
            SELECT

            p.id AS product_id,
            p.name,

            op.quantity,
            op.price,

            (op.quantity * op.price) AS subtotal

            FROM tbl_order_products op

            INNER JOIN tbl_products p
                ON op.product_id = p.id

            WHERE op.order_id = ?
        `,
      [bill.order_id],
    );

    return {
      bill: {
        id: bill.id,
        order_id: bill.order_id,
        date: bill.date,
        subtotal: bill.subtotal,
        tax: bill.tax,
        total: bill.total,
        payment_method: bill.payment_method,
      },

      client: bill.client_id
        ? {
            id: bill.client_id,
            name: bill.client_name,
            lastname: bill.client_lastname,
            dni: bill.client_dni,
          }
        : null,

      waiter: {
        id: bill.waiter_id,
        name: bill.waiter_name,
        lastname: bill.waiter_lastname,
      },

      cashier: bill.cashier_id
        ? {
            id: bill.cashier_id,
            name: bill.cashier_name,
            lastname: bill.cashier_lastname,
          }
        : null,

      table: {
        id: bill.table_id,
        number: bill.table_number,
      },

      products,
    };
  }

  // =========================================
  // CREAR FACTURA
  // =========================================
  static async create({ input }) {
    const conn = await pool.getConnection();

    try {
      await conn.beginTransaction();

      const { order_id, cashier_id, client_dni, payment_method } = input;

      // Paso 1: Validar orden
      const [orders] = await conn.query(
        `SELECT * FROM tbl_orders WHERE id = ?`,
        [order_id],
      );
      const order = orders[0];

      if (!order) {
        const err = new Error("Order not found");
        err.code = "ORDER_NOT_FOUND";
        throw err;
      }

      if (order.state !== "ENTREGADO") {
        const err = new Error("Only delivered orders can be billed");
        err.code = "ORDER_NOT_DELIVERABLE";
        throw err;
      }

      // Paso 2: Buscar cliente por DNI (opcional)
      let client_id = null;

      if (client_dni) {
        const [clients] = await conn.query(
          `SELECT id FROM tbl_users WHERE dni = ?`,
          [client_dni],
        );

        if (clients.length === 0) {
          const err = new Error("Client not found");
          err.code = "CLIENT_NOT_FOUND";
          throw err;
        }

        client_id = clients[0].id;
      }

      // Paso 3: Calcular subtotal
      const [totals] = await conn.query(
        `SELECT SUM(quantity * price) AS subtotal
         FROM tbl_order_products
         WHERE order_id = ?`,
        [order_id],
      );

      const subtotal = totals[0].subtotal;

      if (!subtotal) {
        const err = new Error("Order has no products to bill");
        err.code = "EMPTY_ORDER";
        throw err;
      }

      const tax = Number((subtotal * TAX_RATE).toFixed(2));
      const total = Number((Number(subtotal) + tax).toFixed(2));

      // Paso 4: Crear factura
      const [result] = await conn.query(
        `INSERT INTO tbl_bills
         (subtotal, tax, total, order_id, waiter_id, cashier_id, client_id, payment_method)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          subtotal,
          tax,
          total,
          order_id,
          order.user_id,
          cashier_id,
          client_id,
          payment_method,
        ],
      );

      // Paso 5: Actualizar orden
      await conn.query(
        `UPDATE tbl_orders SET state = 'FACTURADO' WHERE id = ?`,
        [order_id],
      );

      // Paso 6: Liberar mesa
      await conn.query(
        `UPDATE tbl_tables SET state = 'LIBRE' WHERE number = ?`,
        [order.table_number],
      );

      await conn.commit();

      // Paso 7: Devolver factura
      const [bill] = await conn.query(`SELECT * FROM tbl_bills WHERE id = ?`, [
        result.insertId,
      ]);

      return bill[0];
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
}
