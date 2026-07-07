import { Router } from 'express'
import { OrderProductController } from '../controllers/orderProducts.js'

export const createOrderProductRouter = ({ orderProductModel }) => {

  const router = Router()

  const controller = new OrderProductController({orderProductModel})

  router.get('/', controller.getAll)
  router.get('/:orderId', controller.getByOrder)
  router.post('/', controller.create)
  router.patch('/:order_id/:product_id', controller.update)
  router.delete('/:order_id/all', controller.deleteByOrder)
  router.delete('/:order_id/:product_id', controller.delete)


  return router
}