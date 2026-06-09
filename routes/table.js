import { Router } from "express";
import { TableController } from '../controllers/tables.js'

export const createTableRouter = ({ tableModel }) => {

  const tablesRouter = Router()
  const tableController = new TableController({ tableModel})

  tablesRouter.get('/', tableController.getAll)
  tablesRouter.get('/:id', tableController.getById)
  tablesRouter.post('/', tableController.create)
  tablesRouter.patch('/:id', tableController.update)
  tablesRouter.delete('/:id', tableController.delete)

  return tablesRouter
}



