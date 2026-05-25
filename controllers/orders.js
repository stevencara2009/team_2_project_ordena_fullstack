import { validateOrder, validatePartialOrder } from '../schemas/orders.js'
import { ALLOWED_ORIGINS } from "../config/cors.js"

export class OrderController {

  constructor({ orderModel }) {
    this.orderModel = orderModel
  }

  

  getAll = async (req, res) => {
    const origin = req.header('origin')
    if (ALLOWED_ORIGINS.includes(origin) || !origin) {
      res.header('Access-Control-Allow-Origin', origin)
    }
    try {
      const orders = await this.orderModel.getAll()
      res.json(orders)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }

  }



  getById = async (req, res) => {
    try {
      const { id } = req.params
      const order = await this.orderModel.getById({ id })
      if (!order) {
        return res.status(404).json({
          message: 'Order not found'
        })
      }
      res.json(order)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }

  }



  create = async (req, res) => {
    try {
      const result = validateOrder(req.body)
      if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }

      const newOrder = await this.orderModel.create({
        input: result.data
      })

      res.status(201).json(newOrder)
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
  }



  update = async (req, res) => {
    try {
      const result = validatePartialOrder(req.body)

      if (!result.success) {
        return res.status(400).json({ error: result.error.message })
      }

      const { id } = req.params

      const updatedOrder = await this.orderModel.update({
        id,
        input: result.data
      })

      if (!updatedOrder) {
        return res.status(404).json({
          message: 'Order not found'
        })
      }
      res.status(200).json(updatedOrder)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }



  delete = async (req, res) => {
    const origin = req.header('origin')
    if (ALLOWED_ORIGINS.includes(origin) || !origin) {
      res.header('Access-Control-Allow-Origin', origin)
    }

    try {
      const { id } = req.params

      const result = await this.orderModel.delete({ id })

      if (!result) {
        return res.status(404).json({
          message: 'Order not found'
        })
      }

      return res.json({
        message: 'Order deleted'
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }


}