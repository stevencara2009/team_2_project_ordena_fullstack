import mysql from 'mysql2/promise'

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}

const connection = await mysql.createConnection(config)

export class UserModel {

  static async getAll({ role }) {
    if (role) {
      const lowerCaseRole = role.toLowerCase()
      const [roles] = await connection.query(
        'SELECT * FROM tbl_users WHERE LOWER(role) = ?;', [lowerCaseRole]
      )
      // No role found
      if (roles.length === 0) return []

      // get the id from the first role result
      //const [{ id }] = roles

      // get all users ids from database table
      // query to user roles
      // join 
      // return results
      return roles
    }


    const [users] = await connection.query(
      'SELECT * FROM tbl_users;'
    )
    return users
  }

  static async getById({ id }) {
    const [users] = await connection.query(
      `SELECT * FROM tbl_users WHERE id = ?;`, [id]
    )

    if (users.length === 0) return null
    return users
  }

  static async create({ input }) {
    const {
      name,
      lastname,
      email,
      password,
      phone,
      role,
      nationality,
      image,
      created_at
    } = input

    /* const [uuidResult] = await connection.query(`SELECT UUID() uuid;`)
    const [{ uuid }] = uuidResult */

    let insertId

    try {
      const [result] = await connection.query(
        `INSERT INTO tbl_users (name, lastname, email, password, phone, role, nationality, image, created_at) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?);`,
        [name, lastname, email, password, phone, role, nationality, image, created_at]
      )
      insertId = result.insertId
    } catch (e) {
      console.error(e)
      throw new Error('Error creating user')
    }



    const [users] = await connection.query(
      `SELECT * FROM tbl_users WHERE id = ? ;`, [insertId]
    )
    return users[0]
  }


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

    if (input.role !== undefined) {
      fields.push('role = ?')
      values.push(input.role)
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
      `UPDATE tbl_users SET 
        ${fields.join(',')}
      WHERE id = ?;`, [...values, id]
    )

    if (fields.length === 0) return null

    const [users] = await connection.query(
      `SELECT * FROM tbl_users WHERE id = ?;`, [id]
    )

    return users[0]
  }

  static async delete({ id }) {
    const [users] = await connection.query(
      `DELETE FROM tbl_users WHERE id = ?;`, [id]
    )
  }

}