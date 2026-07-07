import mysql from 'mysql2/promise'

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}

const connection = await mysql.createConnection(config)

export class ClientModel {

  // =========================================
  // OBTENER CLIENTES
  // =========================================
  static async getAll() {

    const [clients] = await connection.query(
      'SELECT * FROM tbl_clients;'
    )
    return clients
  }


  static async getById({ id }) {
    const [clients] = await connection.query(
      `SELECT * FROM tbl_clients WHERE id = ?;`, [id]
    )

    if (clients.length === 0) return null
    return clients
  }

  // =========================================
  // CREAR CLIENTE
  // =========================================
  static async create({ input }) {
    const {
      name,
      lastname,
      dni,
      typeDocument,
      email,
      password,
      phone,
      nationality,
      image,
      active,
      birthdate
    } = input

    /* const [uuidResult] = await connection.query(`SELECT UUID() uuid;`)
    const [{ uuid }] = uuidResult */

    let insertId

    try {
      const [result] = await connection.query(
        `INSERT INTO tbl_clients (name, lastname, dni, typeDocument, email, password, phone, nationality, image, active, birthdate) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [name, lastname, dni, typeDocument, email, password, phone, nationality, image, active, birthdate]
      )
      insertId = result.insertId
    } catch (e) {
      console.error(e)
      throw new Error('Error creating client')
    }



    const [clients] = await connection.query(
      `SELECT * FROM tbl_clients WHERE id = ? ;`, [insertId]
    )
    return clients[0]
  }

  // =========================================
  // ACTUALIZAR CLIENTE
  // =========================================
  static async update({ id, input }) {
    const fields = []
    const values = []

    if (input.name !== undefined) {
      fields.push('name = ?')
      values.push(input.name)
    }

    if (input.lastname !== undefined) {
      fields.push('lastname = ?')
      values.push(input.lastname)
    }

    if (input.email !== undefined) {
      fields.push('email = ?')
      values.push(input.email)
    }

    if (input.password !== undefined) {
      fields.push('password = ?')
      values.push(input.password)
    }

    if (input.phone !== undefined) {
      fields.push('phone = ?')
      values.push(input.phone)
    }

    if (input.nationality !== undefined) {
      fields.push('nationality = ?')
      values.push(input.nationality)
    }

    if (input.image !== undefined) {
      fields.push('image = ?')
      values.push(input.image)
    }

    if (input.created_at !== undefined) {
      fields.push('created_at = ?')
      values.push(input.created_at)
    }

    await connection.query(
      `UPDATE tbl_clients SET 
        ${fields.join(',')}
      WHERE id = ?;`, [...values, id]
    )

    if (fields.length === 0) return null

    const [clients] = await connection.query(
      `SELECT * FROM tbl_clients WHERE id = ?;`, [id]
    )

    return clients[0]
  }


  // =========================================
  // ELIMINAR CLIENTE
  // =========================================
  static async delete({ id }) {
    const [client] = await connection.query(
      `DELETE FROM tbl_clients WHERE id = ?;`, [id]
    )
  }

}