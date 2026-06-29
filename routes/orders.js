import { Router } from 'express'
import { OrderController } from '../controllers/orders.js'

export const createOrderRouter = ({ orderModel }) => {

  const orderRouter = Router()

  const orderController = new OrderController({ orderModel })

  orderRouter.get('/', orderController.getAll)
  orderRouter.get('/table/:id', orderController.getByTable)
  orderRouter.get('/:id', orderController.getById)
  orderRouter.post('/', orderController.create)
  orderRouter.patch('/:id', orderController.update)
  orderRouter.delete('/:id', orderController.delete)

  return orderRouter
}