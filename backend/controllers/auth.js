import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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

      if (user.password !== password) {
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
      const user = await this.userModel.getById({ id: req.user.id })

      if (!user || user.length === 0) {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' })
      }

      const { password: _, ...userWithoutPassword } = Array.isArray(user) ? user[0] : user

      return res.status(200).json({ success: true, user: userWithoutPassword })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ success: false, message: 'Error interno' })
    }
  }

  logout = (req, res) => {
    res.clearCookie('access_token', cookieOptions)
    return res.status(200).json({ success: true, message: 'Sesión cerrada' })
  }
}
