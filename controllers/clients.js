import { validateClient, validatePartialClient } from '../schemas/clients.js'
import { ALLOWED_ORIGINS } from "../config/cors.js"


export class ClientController {

  constructor({ clientModel }) {
    this.clientModel = clientModel
  }

  getAll = async (req, res) => {
    const origin = req.header('origin')
    if (ALLOWED_ORIGINS.includes(origin) || !origin) {
      res.header('Access-Control-Allow-Origin', origin)
    }
    try {
      const { category } = req.query
      const clients = await this.clientModel.getAll({ category })
      res.json(clients)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  getById = async (req, res) => {
    try {
      const { id } = req.params
      const client = await this.clientModel.getById({ id })
      if (client) return res.json(client)
      res.status(404).json({ message: 'Product not found' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  create = async (req, res) => {
    try {
      const result = validateProduct(req.body)
      if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })
      const newProduct = await this.productModel.create({ input: result.data })
      res.status(201).json(newProduct)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  update = async (req, res) => {
    try {
      const result = validatePartialProduct(req.body)
      if (!result.success) return res.status(400).json({ error: result.error.message })
      const { id } = req.params
      const updatedProduct = await this.productModel.update({ id, input: result.data })
      return res.status(200).json(updatedProduct)
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
      const result = await this.productModel.delete({ id })
      if (result === false) {
        return res.status(404).json({ message: 'Product not found' })
      }
      return res.json({ message: 'Product deleted' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

}
