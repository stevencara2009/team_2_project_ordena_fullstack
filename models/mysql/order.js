import mysql from 'mysql2/promise'

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
}

const connection = await mysql.createConnection(config)

export class OrderModel {

    static async getAll() {
        const [orders] = await connection.query(`
      SELECT
        o.id,
        o.state,
        o.created_at,

        t.number AS table_number,

        c.name AS client_name,
        c.lastname AS client_lastname,

        u.name AS user_name,
        u.lastname AS user_lastname

      FROM tbl_orders o

      INNER JOIN TBL_TABLES t
        ON o.table_id = t.id

      LEFT JOIN TBL_CLIENTS c
        ON o.client_id = c.id

      INNER JOIN TBL_USERS u
        ON o.user_id = u.id

      ORDER BY o.id DESC
    `)

        return orders
    }


    static async getById({ id }) {

        const [orders] = await connection.query(`
      SELECT *
      FROM tbl_orders
      WHERE id = ?
    `, [id])

        if (orders.length === 0) return null
        return orders[0]
    }


    // =========================================
    // CREAR ORDEN
    // =========================================

    static async create({ input }) {

        const {
            table_id,
            client_id,
            user_id
        } = input

        // INICIAR TRANSACCION
        const pool = mysql.createPool(config)
        const conn = await pool.getConnection()

        try {
            await conn.beginTransaction()

            // VALIDAR QUE LA MESA EXISTA
            const [tables] = await conn.query(`
        SELECT *
        FROM TBL_TABLES
        WHERE id = ?
      `, [table_id])

            const table = tables[0]

            if (!table) {
                throw new Error('Table not found')
            }

            // VALIDAR ESTADO DE MESA
            if (table.state !== 'LIBRE') {
                throw new Error('Table is not available')
            }

            // CREAR ORDEN
            const [result] = await conn.query(`
        INSERT INTO tbl_orders
        (
          table_id,
          client_id,
          user_id
        )
        VALUES (?, ?, ?)
      `, [
                table_id,
                client_id ?? null,
                user_id
            ])


            // CAMBIAR ESTADO MESA
            await conn.query(`
        UPDATE TBL_TABLES
        SET state = 'OCUPADA'
        WHERE id = ?
      `, [table_id])

            await conn.commit()

            const [orders] = await conn.query(`
        SELECT *
        FROM tbl_orders
        WHERE id = ?
      `, [result.insertId])

            return orders[0]

        } catch (error) {

            await conn.rollback()
            throw error

        } finally {

            conn.release()

        }
    }





    // =========================================
    // ACTUALIZAR ORDEN
    // =========================================
    static async update({ id, input }) {

        const fields = []
        const values = []

        if (input.table_id !== undefined) {
            fields.push('table_id = ?')
            values.push(input.table_id)
        }

        if (input.client_id !== undefined) {
            fields.push('client_id = ?')
            values.push(input.client_id)
        }

        if (input.user_id !== undefined) {
            fields.push('user_id = ?')
            values.push(input.user_id)
        }

        if (input.state !== undefined) {
            fields.push('state = ?')
            values.push(input.state)
        }

        console.log(fields)
        console.log(values)
        if (fields.length === 0) return null


        await connection.query(`
      UPDATE tbl_orders
      SET ${fields.join(', ')}
      WHERE id = ?
    `, [...values, id])

        const [orders] = await connection.query(`
      SELECT *
      FROM tbl_orders
      WHERE id = ?
    `, [id])

        return orders[0]
    }



    // =========================================
    // ELIMINAR ORDEN
    // =========================================
    static async delete({ id }) {

        const [order] = await connection.query(`
      DELETE FROM tbl_orders
      WHERE id = ?
    `, [id])

        return order.affectedRows > 0
    }
}