import { Router } from "express";
import { AuthController } from '../controllers/auth.js'
import { verifyToken } from '../middlewares/auth.js'

export const createAuthRouter = ({ userModel }) => {

  const authRouter = Router()
  const authController = new AuthController({ userModel })

  authRouter.post('/login', authController.login)
  authRouter.get('/me', verifyToken, authController.me)
  authRouter.post('/logout', authController.logout)

  return authRouter;
}



