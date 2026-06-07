import mysql from 'mysql2/promise'

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}

const pool = mysql.createPool(config)

export class BillModel {

    // =========================================
    // OBTENER FACTURAS
    // =========================================
    static async getAll() {

        const [rows] = await pool.query(
            `SELECT * FROM tbl_bills ORDER BY id DESC;`
        )
        return rows
    }

    // =========================================
    // OBTENER FACTURA POR ID
    // =========================================
    static async getById({ id }) {
        const [rows] = await pool.query(
            `SELECT * FROM tbl_bills WHERE id = ?;`, [id]
        )

        if (rows.length === 0) return null
        return rows
    }



    // =========================================
    // OBTENER DETALLE DE FACTURA
    // =========================================
    static async getDetails({ id }) {

        const [bills] = await pool.query(`
            SELECT

            b.id,
            b.date,
            b.total,

            c.id AS client_id,
            c.name AS client_name,
            c.lastname AS client_lastname,

            u.id AS user_id,
            u.name AS user_name,
            u.lastname AS user_lastname,

            t.number AS table_number,
            t.number AS table_number,

            o.id AS order_id

            FROM TBL_BILLS b

            INNER JOIN TBL_ORDERS o
            ON b.order_id = o.id

            INNER JOIN TBL_TABLES t
            ON o.table_number = t.number

            INNER JOIN TBL_USERS u
            ON b.user_id = u.id

            LEFT JOIN TBL_CLIENTS c
            ON b.client_id = c.id

            WHERE b.id = ?
        `, [id])

        const bill = bills[0]

        if (!bill) return null

        const [products] = await pool.query(`
            SELECT

            p.id AS product_id,
            p.name,

            op.quantity,
            op.price,

            (op.quantity * op.price) AS subtotal

            FROM TBL_ORDER_PRODUCTS op

            INNER JOIN TBL_PRODUCTS p
            ON op.product_id = p.id

            WHERE op.order_id = ?
        `, [bill.order_id])

        return {
            bill: {
                id: bill.id,
                date: bill.date,
                total: bill.total
            },

            client: bill.client_id
            ? {
                id: bill.client_id,
                name: bill.client_name,
                lastname: bill.client_lastname
                }
            : null,

            user: {
                id: bill.user_id,
                name: bill.user_name,
                lastname: bill.user_lastname
            },

            table: {
                id: bill.table_id,
                number: bill.table_number
            },

            products
        }
    }



    // =========================================
    // CREAR FACTURA
    // =========================================
    static async create({ input }) {

        const conn = await pool.getConnection()

        try {
            await conn.beginTransaction()
            
            const {
                order_id,
                user_id,
                client_id
            } = input

            // Paso 1: Validar orden
            const [orders] = await conn.query(`
                SELECT *
                FROM TBL_ORDERS
                WHERE id = ?
            `, [order_id])

            const order = orders[0]

            if (!order) {
                throw new Error('Order not found')
            }
            
            // Paso 2: Validar estado unicamente cuando la orden esté entregada
            if (order.state !== 'ENTREGADO') {
                throw new Error(
                    'Only delivered orders can be billed'
                )
            }

            // PASO 3: Calcular el total
            const [totals] = await conn.query(`
                SELECT
                SUM(quantity * price) AS total
                FROM TBL_ORDER_PRODUCTS
                WHERE order_id = ?
            `, [order_id])

            const total = totals[0].total
            
            // PASO 4: Crear Factura
            const [result] = await conn.query(`
                INSERT INTO TBL_BILLS
                (
                    total,
                    order_id,
                    user_id,
                    client_id
                )
                VALUES (?, ?, ?, ?)
                `, [
                total,
                order_id,
                user_id,
                client_id ?? null
            ])

            // Paso 5: Actualizar orden
            await conn.query(`
                UPDATE TBL_ORDERS
                SET state = 'FACTURADO'
                WHERE id = ?
            `, [order_id])
            
            // Paso 6: Liberar mesa
            await conn.query(`
                UPDATE TBL_TABLES
                SET state = 'LIBRE'
                WHERE id = ?
            `, [order.table_id])

            await conn.commit()
            
            // Paso 7: Mostrar factura
            const [bill] = await conn.query(`
                SELECT *
                FROM TBL_BILLS
                WHERE id = ?
            `, [result.insertId])

            return bill[0]

        } catch (error) {
            await conn.rollback()
            throw error
        } finally {
            conn.release()
        }
    }

}