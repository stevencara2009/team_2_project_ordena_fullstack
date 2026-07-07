import { Router } from "express";
import { ClientController } from '../controllers/clients.js'

export const createClientRouter = ({ clientModel }) => {

  const clientsRouter = Router()
  const clientController = new ClientController({ clientModel})

  clientsRouter.get('/', clientController.getAll)
  clientsRouter.get('/:id', clientController.getById)
  clientsRouter.post('/', clientController.create)
  clientsRouter.patch('/:id', clientController.update)
  clientsRouter.delete('/:id', clientController.delete)

  return clientsRouter
}



