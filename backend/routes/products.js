import { Router } from "express";
import { ProductController } from '../controllers/products.js'
import { createUpload  } from '../middlewares/upload.js'


export const createProductRouter = ({ productModel }) => {

  const productsRouter = Router()
  const productController = new ProductController({ productModel })
  const upload = createUpload('products')

  productsRouter.post('/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No se recibió ninguna imagen' })
    }
    res.json({ imageUrl: req.file.path })
  })

  productsRouter.get('/', productController.getAll)
  productsRouter.get('/:id', productController.getById)
  productsRouter.post('/', productController.create)
  productsRouter.patch('/:id', productController.update)
  productsRouter.delete('/:id', productController.delete)

  return productsRouter
}



