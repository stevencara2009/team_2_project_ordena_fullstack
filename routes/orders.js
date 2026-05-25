import { Router } from 'express'
import { OrderController } from '../controllers/orders.js'
import { ALLOWED_ORIGINS } from "../config/cors.js";

export const createOrderRouter = ({ orderModel }) => {

  const orderRouter = Router()

  const orderController = new OrderController({ orderModel })

  orderRouter.get('/', orderController.getAll)
  orderRouter.get('/:id', orderController.getById)
  orderRouter.post('/', orderController.create)
  orderRouter.patch('/:id', orderController.update)
  orderRouter.delete('/:id', orderController.delete)

  orderRouter.options('/:id', (req, res) => {
    const origin = req.header('origin')
    if (ALLOWED_ORIGINS.includes(origin) || !origin) {
      res.header('Access-Control-Allow-Origin', origin)
      res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
      res.header('Access-Control-Allow-Headers', 'Content-Type')
    }
    res.status(200).end()
  })

  return orderRouter
}