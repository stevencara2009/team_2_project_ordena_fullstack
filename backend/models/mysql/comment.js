import mysql from "mysql2/promise";

const isProduction = process.env.NODE_ENV === 'production' || (process.env.DB_HOST && !process.env.DB_HOST.includes('localhost'));

const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  ssl: isProduction ? { rejectUnauthorized: false } : false
};


const connection = await mysql.createPool(config);



export class CommentModel {
  static async getAll() {
    const [rows] = await connection.query(
      `SELECT c.id, c.content, c.rating, c.created_at, u.name, u.lastname
       FROM tbl_comments c
       JOIN tbl_users u ON u.id = c.user_id
       ORDER BY c.created_at DESC
       LIMIT 50`
    )
    return rows
  }

  static async create({ userId, content, rating }) {
    const [result] = await connection.query(
      "INSERT INTO tbl_comments (user_id, content, rating) VALUES (?, ?, ?)",
      [userId, content, rating ?? null]
    )
    return { id: result.insertId, content, rating }
  }
}