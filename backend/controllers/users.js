import { validateUser, validatePartialUser } from "../schemas/users.js";

export class UserController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  getAll = async (req, res) => {
    try {
      const { role } = req.query;
      const users = await this.userModel.getAll({ role });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await this.userModel.getById({ id });
      if (user) return res.json(user);
      res.status(404).json({ message: "User not found" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  create = async (req, res) => {
    try {
      const result = validateUser(req.body);

      if (result.error)
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });

      const newUser = await this.userModel.create({ input: result.data });
      res.status(201).json(newUser);
    } catch (error) {
      if (error.code === "EMAIL_DUPLICATED") {
        return res.status(400).json({
          message: "El correo electrónico ya se encuentra registrado",
        });
      }
      res.status(500).json({
        message: "Error interno del servidor al registrar el usuario",
      });
    }
  };

  update = async (req, res) => {
    try {
      const result = validatePartialUser(req.body);
      console.log(result);

      if (!result.success)
        return res.status(400).json({ error: result.error.message });
      const { id } = req.params;
      const updatedUser = await this.userModel.update({
        id,
        input: result.data,
      });
      return res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;

      const currentUserId = req.user?.id;

      // Validar si el usuario intenta eliminarse a sí mismo
      if (currentUserId && String(currentUserId) === String(id)) {
        return res.status(400).json({
          message: "No puedes eliminar tu propia cuenta de usuario activa.",
        });
      }

      const result = await this.userModel.delete({ id });
      if (result === false) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
