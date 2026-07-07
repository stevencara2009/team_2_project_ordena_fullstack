import { Router } from "express";
import { UserController } from '../controllers/users.js'
import { createUpload } from '../middlewares/upload.js'



export const createUserRouter = ({ userModel }) => {

  const usersRouter = Router()
  const userController = new UserController({ userModel })
  const upload = createUpload('users')
  
  usersRouter.post('/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No se recibió ninguna imagen' })
    }
    res.json({ imageUrl: req.file.path })
  })


  usersRouter.get('/', userController.getAll)
  usersRouter.get('/:id', userController.getById)
  usersRouter.post('/', userController.create)
  usersRouter.patch('/:id', userController.update)
  usersRouter.delete('/:id', userController.delete)

  return usersRouter
}



