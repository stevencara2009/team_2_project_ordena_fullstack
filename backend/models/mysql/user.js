import mysql from "mysql2/promise";
import { toUpperCase } from "zod";
import bcrypt from "bcryptjs";

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

export class UserModel {
  // =========================================
  // OBTENER USUARIOS
  // =========================================
  static async getAll({ role }) {
    if (role) {
      const lowerCaseRole = role.toLowerCase();
      const [roles] = await connection.query(
        "SELECT * FROM tbl_users WHERE LOWER(role) = ?;",
        [lowerCaseRole],
      );
      // No role found
      if (roles.length === 0) return [];

      return roles;
    }

    const [users] = await connection.query("SELECT * FROM tbl_users;");
    return users;
  }

  // =========================================
  // OBTENER USUARIO POR ID
  // =========================================
  static async getById({ id }) {
    const [users] = await connection.query(
      `SELECT * FROM tbl_users WHERE id = ?;`,
      [id],
    );

    if (users.length === 0) return null;
    return users;
  }

  // =========================================
  // CREAR USUARIO
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
      role,
      nationality,
      image,
      active,
      birthdate,
    } = input;

    let insertId;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await connection.query(
        `INSERT INTO tbl_users (name, lastname, dni, typeDocument, email, password, phone, role, nationality, image, active, birthdate) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          name,
          lastname,
          dni,
          typeDocument,
          email,
          hashedPassword,
          phone,
          role,
          nationality,
          image,
          active,
          birthdate,
        ],
      );

      insertId = result.insertId;
    } catch (e) {
      // Capturamos el error de clave duplicada de MySQL (Duplicate entry)
      if (e.code === "ER_DUP_ENTRY" || e.errno === 1062) {
        const customError = new Error("EmailAlreadyExists");
        customError.code = "EMAIL_DUPLICATED";
        throw customError;
      }

      console.error("Error no controlado en UserModel.create:", e);
      throw new Error("DatabaseError");
    }

    const [users] = await connection.query(
      `SELECT * FROM tbl_users WHERE id = ? ;`,
      [insertId],
    );
    return users[0];
  }

  // =========================================
  // ACTUALIZAR USUARIO
  // =========================================
  static async update({ id, input }) {
    const fields = [];
    const values = [];

    if (input.name !== undefined) {
      fields.push("name = ?");
      values.push(input.name);
    }

    if (input.lastname !== undefined) {
      fields.push("lastname = ?");
      values.push(input.lastname);
    }

    if (input.dni !== undefined) {
      fields.push("dni = ?");
      values.push(input.dni);
    }

    if (input.email !== undefined) {
      fields.push("email = ?");
      values.push(input.email);
    }

    if (input.password !== undefined) {
      fields.push("password = ?");
      values.push(input.password);
    }

    if (input.phone !== undefined) {
      fields.push("phone = ?");
      values.push(input.phone);
    }

    if (input.role !== undefined) {
      fields.push("role = ?");
      values.push(input.role);
    }

    if (input.birthdate !== undefined) {
      fields.push("birthdate = ?");
      values.push(input.birthdate);
    }

    if (input.nationality !== undefined) {
      fields.push("nationality = ?");
      values.push(input.nationality);
    }

    if (input.image !== undefined) {
      fields.push("image = ?");
      values.push(input.image);
    }

    if (input.active !== undefined) {
      fields.push("active = ?");
      values.push(input.active);
    }

    if (input.created_at !== undefined) {
      fields.push("created_at = ?");
      values.push(input.created_at);
    }

    await connection.query(
      `UPDATE tbl_users SET 
        ${fields.join(",")}
      WHERE id = ?;`,
      [...values, id],
    );

    if (fields.length === 0) return null;

    const [users] = await connection.query(
      `SELECT * FROM tbl_users WHERE id = ?;`,
      [id],
    );

    return users[0];
  }

  // =========================================
  // ELIMINAR USUARIO
  // =========================================
  static async delete({ id }) {
    const [users] = await connection.query(
      `DELETE FROM tbl_users WHERE id = ?;`,
      [id],
    );
  }

  // =========================================
  // LOGUEARSE
  // =========================================
  static async usernameLogin({ email }) {
    const [users] = await connection.query(
      "SELECT * FROM tbl_users WHERE email = ?;",
      [email],
    );
    return users[0];
  }

  // =========================================
  // BUSCAR USUARIO POR DNI (para facturación)
  // =========================================
  static async getByDni({ dni }) {
    const [users] = await connection.query(
      `SELECT id, name, lastname, dni FROM tbl_users WHERE dni = ?;`,
      [dni],
    );
    return users[0] ?? null;
  }

  // =========================================
  // GUARDAR TOKEN DE RECUPERACION
  // =========================================
  static async setResetToken({ email, token, expires }) {
    const [result] = await connection.query(
      `UPDATE tbl_users SET reset_token = ?, reset_token_expires = ? WHERE email = ?;`,
      [token, expires, email],
    );
    return result.affectedRows > 0;
  }

  // =========================================
  // BUSCAR USUARIO POR TOKEN VALIDO
  // =========================================
  static async getByResetToken({ token }) {
    const [users] = await connection.query(
      `SELECT * FROM tbl_users WHERE reset_token = ? AND reset_token_expires > NOW();`,
      [token],
    );
    return users[0] ?? null;
  }

  // =========================================
  // ACTUALIZAR CONTRASEÑA Y LIMPIAR TOKEN
  // =========================================
  static async resetPassword({ id, hashedPassword }) {
    const [result] = await connection.query(
      `UPDATE tbl_users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?;`,
      [hashedPassword, id],
    );
    return result.affectedRows > 0;
  }
}
