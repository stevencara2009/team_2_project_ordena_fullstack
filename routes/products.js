import { Router } from "express";
import { ProductController } from '../controllers/products.js'
import { ALLOWED_ORIGINS } from "../config/cors.js";

export const createProductRouter = ({ productModel }) => {

  const productsRouter = Router()
  const productController = new ProductController({ productModel})

  productsRouter.get('/', productController.getAll)
  productsRouter.get('/:id', productController.getById)
  productsRouter.post('/', productController.create)
  productsRouter.patch('/:id', productController.update)
  productsRouter.delete('/:id', productController.delete)

  productsRouter.options('/:id', (req, res) => {
    const origin = req.header('origin')
    if (ALLOWED_ORIGINS.includes(origin) || !origin) {
      res.header('Access-Control-Allow-Origin', origin)
      res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
      res.header('Access-Control-Allow-Headers', 'Content-Type')
    }
    res.status(200).end()
  })
  return productsRouter
}



