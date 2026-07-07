import fs from 'node:fs'
import { randomUUID } from 'node:crypto'

const products = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
const date = new Date(Date.now()).toISOString()

export class ProductModel {
  static async getAll({ category }) {
    if (category) {
      return products.filter(
        product => product.category.some(c => c.toLowerCase() === category.toLowerCase())
      )
    }
    return products
  }

  static async getById({ id }) {
    const product = products.find(product => product.id.toString() === id)
    return product
  }

  static async create({ input }) {
    const newProduct = {
      id: randomUUID(),
      ...input,
      created_at: date
    }
    products.push(newProduct)
    return newProduct
  }

  static async update({ id, input }) {
    const productIndex = products.findIndex(product => product.id.toString() === id)
    if (productIndex === -1) return false

    products[productIndex] = {
      ...products[productIndex],
      ...input
    }

    return products[productIndex]
  }

  static async delete({ id }) {
    const productIndex = products.findIndex(product => product.id.toString() === id)
    if (productIndex === -1) return false
    products.splice(productIndex, 1)
    return true
  }
  
}