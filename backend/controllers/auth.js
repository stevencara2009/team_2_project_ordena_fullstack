import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { sendResetEmail } from "../config/mailer.js";

const isProd = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
};

export class AuthController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await this.userModel.usernameLogin({ email });

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Credenciales inválidas" });
      }


      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res
          .status(401)
          .json({ success: false, message: "Credenciales inválidas" });
      }

      const { password: _, ...userWithoutPassword } = user;

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
      );

      res.cookie("access_token", token, cookieOptions);

      return res.status(200).json({
        success: true,
        user: userWithoutPassword,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Error interno" });
    }
  };

  // Se usa cuando el front refresca la página, para validar la cookie
  // y recuperar los datos del usuario sin volver a pedir credenciales
  me = async (req, res) => {
    try {
      const user = await this.userModel.getById({ id: req.user.id });

      if (!user || user.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Usuario no encontrado" });
      }

      const { password: _, ...userWithoutPassword } = Array.isArray(user)
        ? user[0]
        : user;

      return res.status(200).json({ success: true, user: userWithoutPassword });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Error interno" });
    }
  };

  logout = (req, res) => {
    res.clearCookie("access_token", cookieOptions);
    return res.status(200).json({ success: true, message: "Sesión cerrada" });
  };

  forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await this.userModel.usernameLogin({ email });

    // Por seguridad no revelamos si el correo existe o no
    if (!user) {
      return res.json({
        message: "If the email exists, a reset link was sent",
      });
    }

    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    await this.userModel.setResetToken({ email, token, expires });

    try {
      await sendResetEmail({ to: email, token });
    } catch (error) {
      console.error("Error enviando correo:", error);
      return res.status(500).json({ message: "Could not send recovery email" });
    }

    res.json({ message: "If the email exists, a reset link was sent" });
  };

  resetPassword = async (req, res) => {
    const { token, password } = req.body;

    if (!token || !password) {
      return res
        .status(400)
        .json({ message: "Token and password are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await this.userModel.getByResetToken({ token });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userModel.resetPassword({ id: user.id, hashedPassword });

    res.json({ message: "Password updated successfully" });
  };
}
