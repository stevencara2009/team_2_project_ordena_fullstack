import mysql from 'mysql2/promise'

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}

const connection = await mysql.createConnection(config)

export class TableModel {

  static async getAll({ state }) {
    if (state) {
      const lowerCaseState = state.toLowerCase()
      const [states] = await connection.query(
        'SELECT * FROM tbl_tables WHERE LOWER(state) = ?;', [lowerCaseState]
      )
      // No state found
      if (states.length === 0) return []

      // get the id from the first state result
      //const [{ id }] = state

      // get all tables ids from database table
      // query to table state
      // join 
      // return results
      return states
    }

    const [tables] = await connection.query(
      'SELECT * FROM tbl_tables;'
    )
    return tables
  }


  static async getById({ id }) {
    const [tables] = await connection.query(
      `SELECT *  FROM tbl_tables WHERE number = ?;`, [id]
    )

    if (tables.length === 0) return null
    return tables
  }


  static async create({ input }) {
    const {
      number,
      capacity,
      state
    } = input

    /* const [uuidResult] = await connection.query(`SELECT UUID() uuid;`)
    const [{ uuid }] = uuidResult */

    let insertId

    try {
      const [result] = await connection.query(
        `INSERT INTO tbl_tables (number, capacity, state) VALUES ( ?, ?, ?);`,
        [number, capacity, state]
      )
      insertId = result.insertId
    } catch (e) {
      console.error(e)
      throw new Error('Error creating table')
    }



    const [tables] = await connection.query(
      `SELECT * FROM tbl_tables WHERE id = ? ;`, [insertId]
    )
    return tables[0]
  }


  static async update({ id, input }) {
    const fields = []
    const values = []

    if (input.number !== undefined) {
      fields.push('number = ?')
      values.push(input.number)
    }

    if (input.capacity !== undefined) {
      fields.push('capacity = ?')
      values.push(input.capacity)
    }

    if (input.state !== undefined) {
      fields.push('state = ?')
      values.push(input.state)
    }

    if (fields.length === 0) return null

    await connection.query(
      `UPDATE tbl_tables SET 
        ${fields.join(',')}
      WHERE number = ?;`, [...values, id]
    )

    const [tables] = await connection.query(
      `SELECT * FROM tbl_tables WHERE number = ?;`, [id]
    )

    return tables[0]
  }



  static async delete({ id }) {
    const [table] = await connection.query(
      `DELETE FROM tbl_tables WHERE number = ?;`, [id]
    )
  }

}