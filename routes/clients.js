import { Router } from "express";
import { ClientController } from '../controllers/clients.js'
import { ALLOWED_ORIGINS } from "../config/cors.js";

export const createClientRouter = ({ clientModel }) => {

  const clientsRouter = Router()
  const clientController = new ClientController({ clientModel})

  clientsRouter.get('/', clientController.getAll)
  clientsRouter.get('/:id', clientController.getById)
  clientsRouter.post('/', clientController.create)
  clientsRouter.patch('/:id', clientController.update)
  clientsRouter.delete('/:id', clientController.delete)

  clientsRouter.options('/:id', (req, res) => {
    const origin = req.header('origin')
    if (ALLOWED_ORIGINS.includes(origin) || !origin) {
      res.header('Access-Control-Allow-Origin', origin)
      res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
      res.header('Access-Control-Allow-Headers', 'Content-Type')
    }
    res.status(200).end()
  })
  return clientsRouter
}



