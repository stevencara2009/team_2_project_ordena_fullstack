import mysql from 'mysql2/promise'

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}

const connection = await mysql.createConnection(config)

export class ProductModel {

  static async getAll({ category }) {
    if (category) {
      const lowerCaseCategory = category.toLowerCase()
      const [categories] = await connection.query(
        'SELECT * FROM tbl_products WHERE LOWER(category) = ?;', [lowerCaseCategory]
      )
      // No category found
      if (categories.length === 0) return []

      // get the id from the first category result
      //const [{ id }] = categories

      // get all products ids from database table
      // query to product categories
      // join 
      // return results
      return categories
    }

    const [products] = await connection.query(
      'SELECT * FROM tbl_products;'
    )
    return products
  }




  static async getById({ id }) {
    const [products] = await connection.query(
      `SELECT id, name, category, availability, price, image, created_at  FROM tbl_products WHERE id = ?;`, [id]
    )

    if (products.length === 0) return null
    return products
  }



  static async create({ input }) {
    const {
      name,
      category,
      availability,
      price,
      image,
      description
    } = input

    console.log(input)
    /* const [uuidResult] = await connection.query(`SELECT UUID() uuid;`)
    const [{ uuid }] = uuidResult */

    let insertId

    try {
      const [result] = await connection.query(
        `INSERT INTO tbl_products (name, category, availability, price, image, description) VALUES ( ?, ?, ?, ?, ?, ?);`,
        [name, category[0], availability, price, image, description]
      )
      insertId = result.insertId
    } catch (e) {
      console.error(e)
      throw new Error('Error creating product')
    }



    const [products] = await connection.query(
      `SELECT id, name, category, availability, price, image, description, created_at FROM tbl_products WHERE id = ? ;`, [insertId]
    )
    return products[0]
  }



  static async update({ id, input }) {
    const fields = []
    const values = []

    if (input.name !== undefined) {
      fields.push('name = ?')
      values.push(input.name)
    }

    if (input.category !== undefined) {
      fields.push('category = ?')
      values.push(input.category[0] ?? input.category)
    }

    if (input.availability !== undefined) {
      fields.push('availability = ?')
      values.push(input.availability)
    }

    if (input.price !== undefined) {
      fields.push('price = ?')
      values.push(input.price)
    }

    if (input.image !== undefined) {
      fields.push('image = ?')
      values.push(input.image)
    }

    await connection.query(
      `UPDATE tbl_products SET 
        ${fields.join(',')}
      WHERE id = ?;`, [...values, id]
    )

    if (fields.length === 0) return null

    const [products] = await connection.query(
      `SELECT * FROM tbl_products WHERE id = ?;`, [id]
    )

    return products[0]
  }


  
  static async delete({ id }) {
    const [product] = await connection.query(
      `DELETE FROM tbl_products WHERE id = ?;`, [id]
    )
  }

}