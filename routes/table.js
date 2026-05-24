import { Router } from "express";
import { TableController } from '../controllers/tables.js'
import { ALLOWED_ORIGINS } from "../config/cors.js";

export const createTableRouter = ({ tableModel }) => {

  const tablesRouter = Router()
  const tableController = new TableController({ tableModel})

  tablesRouter.get('/', tableController.getAll)
  tablesRouter.get('/:id', tableController.getById)
  tablesRouter.post('/', tableController.create)
  tablesRouter.patch('/:id', tableController.update)
  tablesRouter.delete('/:id', tableController.delete)

  tablesRouter.options('/:id', (req, res) => {
    const origin = req.header('origin')
    if (ALLOWED_ORIGINS.includes(origin) || !origin) {
      res.header('Access-Control-Allow-Origin', origin)
      res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
      res.header('Access-Control-Allow-Headers', 'Content-Type')
    }
    res.status(200).end()
  })
  return tablesRouter
}



