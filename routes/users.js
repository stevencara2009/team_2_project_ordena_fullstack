import { Router } from "express";
import { UserController } from '../controllers/users.js'
import { ALLOWED_ORIGINS } from "../config/cors.js";

export const createUserRouter = ({ userModel }) => {

  const usersRouter = Router()
  const userController = new UserController({ userModel})

  usersRouter.get('/', userController.getAll)
  usersRouter.get('/:id', userController.getById)
  usersRouter.post('/', userController.create)
  usersRouter.patch('/:id', userController.update)
  usersRouter.delete('/:id', userController.delete)

  usersRouter.options('/:id', (req, res) => {
    const origin = req.header('origin')
    if (ALLOWED_ORIGINS.includes(origin) || !origin) {
      res.header('Access-Control-Allow-Origin', origin)
      res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
      res.header('Access-Control-Allow-Headers', 'Content-Type')
    }
    res.status(200).end()
  })
  return usersRouter
}



