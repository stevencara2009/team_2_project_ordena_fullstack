import { validateOrderProduct } from "../schemas/orderProducts.js"
import { ALLOWED_ORIGINS } from "../config/cors.js"

export class OrderProductController {

  constructor({ orderProductModel }) {
    this.orderProductModel = orderProductModel
  }


  getAll = async (req, res) => {
    const origin = req.header('origin')
    if (ALLOWED_ORIGINS.includes(origin) || !origin) {
      res.header('Access-Control-Allow-Origin', origin)
    }
    const rows = await this.orderProductModel.getAll()
    res.json(rows)
  }


  getByOrder = async (req, res) => {
    const { orderId } = req.params
    const rows = await this.orderProductModel.getByOrder({
      orderId
    })
    res.json(rows)
  }


  create = async (req, res) => {
    const result = validateOrderProduct(req.body)

    if (!result.success) {
      return res.status(400).json({
        errors: result.error
      })
    }

    try {
      const created = await this.orderProductModel.create({
        input: result.data
      })
      res.status(201).json(created)
    } catch (error) {
      res.status(400).json({
        message: error.message
      })
    }
  }

  update = async (req, res) => {

    const { order_id, product_id } = req.params

    const updated =
      await this.orderProductModel.update({
        order_id,
        product_id,
        input: req.body
      })

    if (!updated) {
      return res.status(404).json({
        message: 'Order product not found'
      })
    }

    res.json(updated)
  }


  delete = async (req, res) => {

    const {
      order_id,
      product_id
    } = req.params

    const deleted =
      await this.orderProductModel.delete({
        order_id,
        product_id
      })

    if (!deleted) {
      return res.status(404).json({
        message: 'Order product not found'
      })
    }

    res.json({
      message: 'Product removed from order'
    })
  }

}