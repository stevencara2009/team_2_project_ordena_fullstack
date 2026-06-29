import mysql from 'mysql2/promise'

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
}

const pool = mysql.createPool(config)

export class OrderProductModel {

    // =========================================
    // OBTENER TODOS
    // =========================================
    static async getAll() {

        const [rows] = await pool.query(`
        SELECT

            op.order_id,
            op.product_id,
            op.quantity,
            op.price,

            p.name AS product_name,
            p.category AS product_category

        FROM TBL_ORDER_PRODUCTS op

        INNER JOIN TBL_PRODUCTS p
            ON op.product_id = p.id

        ORDER BY op.order_id DESC
        `)

        return rows
    }



    // =========================================
    // OBTENER PRODUCTOS DE UNA ORDEN
    // =========================================
    static async getByOrder({ orderId }) {
        const [rows] = await pool.query(`
        SELECT

            op.order_id,
            op.product_id,
            op.quantity,
            op.price,
            op.notes,
            p.name,
            p.description,
            p.image

        FROM TBL_ORDER_PRODUCTS op

        INNER JOIN TBL_PRODUCTS p
            ON op.product_id = p.id

        WHERE op.order_id = ?
        `, [orderId])

        return rows
    }



    // =========================================
    // AGREGAR PRODUCTO A ORDEN
    // =========================================
    static async create({ input }) {
        const {
            order_id,
            product_id,
            quantity,
            notes = null
        } = input

        const conn = await pool.getConnection()

        try {
            
            await conn.beginTransaction()

            // VALIDAR ORDEN
            const [orders] = await conn.query(`
                SELECT *
                FROM TBL_ORDERS
                WHERE id = ?
            `, [order_id])

            if (orders.length === 0) {
                throw new Error('Order not found')
            }

            // VALIDAR PRODUCTO
            const [products] = await conn.query(`
                SELECT *
                FROM TBL_PRODUCTS
                WHERE id = ?
            `, [product_id])

            const product = products[0]

            if (!product) {
                throw new Error('Product not found')
            }

            // VALIDAR SI YA EXISTE
            const [existing] = await conn.query(`
                SELECT *
                FROM TBL_ORDER_PRODUCTS
                WHERE order_id = ?
                AND product_id = ?
            `, [order_id, product_id])


            if (existing.length > 0) {
                // SI EXISTE -> SUMAR CANTIDAD Y ACTUALIZAR NOTES
                await conn.query(`
                UPDATE TBL_ORDER_PRODUCTS
                SET quantity = quantity + ?, notes + ?
                WHERE order_id = ?
                AND product_id = ?
                `, [
                    quantity,
                    notes,
                    order_id,
                    product_id
                ])

            } else {
                // CREAR NUEVO
                await conn.query(`
                INSERT INTO TBL_ORDER_PRODUCTS
                (
                    order_id,
                    product_id,
                    quantity,
                    price,
                    notes
                )
                VALUES (?, ?, ?, ?, ?)
                `, [
                    order_id,
                    product_id,
                    quantity,
                    product.price,
                    notes
                ])
            }

            await conn.commit()

            const [rows] = await conn.query(`
                SELECT 
                    op.order_id,
                    op.product_id,
                    op.quantity,
                    op.price,
                    op.notes,
                    p.name,
                    p.image
                FROM TBL_ORDER_PRODUCTS op
                INNER JOIN TBL_PRODUCTS p ON op.product_id = p.id
                WHERE op.order_id = ?
            `, [order_id])

            return rows

        } catch (error) {
            await conn.rollback()
            console.error(error)
            throw new Error('Error creating OrderProduct')
        } finally {
            conn.release()
        }
    }



    // =========================================
    // ACTUALIZAR CANTIDAD PRODUCTO - ORDEN
    // =========================================

    static async update({
        order_id,
        product_id,
        input
    }) {

        const { quantity } = input

        await pool.query(`
        UPDATE TBL_ORDER_PRODUCTS
        SET quantity = ?
        WHERE order_id = ?
        AND product_id = ?
        `, [
            quantity,
            order_id,
            product_id
        ])

        const [rows] = await pool.query(`
        SELECT *
        FROM TBL_ORDER_PRODUCTS
        WHERE order_id = ?
        AND product_id = ?
        `, [
            order_id,
            product_id
        ])

        return rows[0]
    }



    // =========================================
    // ELIMINAR PRODUCTO DE ORDEN
    // =========================================
    static async delete({ order_id, product_id }) {

        const [result] = await pool.query(`
        DELETE FROM TBL_ORDER_PRODUCTS
        WHERE order_id = ?
        AND product_id = ?
        `, [order_id, product_id])

        return result.affectedRows > 0
    }

    // =========================================
    // ELIMINAR TODOS LOS PRODUCTOS DE UNA ORDEN
    // =========================================
    static async deleteByOrder({ order_id }) {
    const [result] = await pool.query(`
        DELETE FROM TBL_ORDER_PRODUCTS
        WHERE order_id = ?
    `, [order_id])

    return result.affectedRows > 0
}
}