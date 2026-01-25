import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  post: '3306',
  password: '123456789',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {

  static async getAll({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowercase()
      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre]
      )

      // No genre found
      if (genres.length === 0) return []

      // get the id from the first genre result
      const [{ id }] = genres

      // get all movies ids from database table
      // query to movie genres
      // join 
      // return results
      return []
    }

    const [movies] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate  FROM movie;'
    )
    console.log(movies)
    return movies
  }

  static async getById({ id }) {
    const [movies] = await connection.query(
      `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate  FROM movie WHERE id =  UUID_TO_BIN(?);`, [id]
    )

    if (movies.length === 0) return null
    return movies
  }

  static async create({ input }) {
    const {
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input

    const [uuidResult] = await connection.query(`SELECT UUID() uuid;`)
    const [{ uuid }] = uuidResult


    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, duration, director, rate, poster) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
        [uuid, title, year, duration, director, rate, poster]
      )
    } catch (e) {
      console.error(e)
      throw new Error('Error creating movie')
    }



    const [movies] = await connection.query(
      `SELECT BIN_TO_UUID(id) id, title, year, duration, director, rate, poster FROM movie WHERE id = UUID_TO_BIN(?);`, [uuid]
    )
    return movies[0]
  }

  static async delete({ id }) {

  }

  static async update({ id, input }) {

  }

}