// controllers/comments.js
import { validateComment } from "../schemas/comments.js"

export class CommentController {
  constructor({ commentModel }) {
    this.commentModel = commentModel
  }

  // Usamos arrow functions para no perder el contexto de 'this'
  getAll = async (req, res) => {
    try {
      const comments = await this.commentModel.getAll()
      res.json(comments)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Error al obtener comentarios" })
    }
  }

  create = async (req, res) => {
    const result = validateComment(req.body)
    if (!result.success) {
      return res.status(400).json({ message: result.error.issues[0].message })
    }

    try {
      const comment = await this.commentModel.create({
        userId: req.user.id,
        ...result.data
      })
      res.status(201).json(comment)
    } catch (error) {
      console.error("Error en CommentController.create:", error)
      res.status(500).json({ message: "Error al crear el comentario" })
    }
  }
}