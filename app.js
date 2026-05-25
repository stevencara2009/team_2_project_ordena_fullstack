import express, { json } from 'express'
import { createProductRouter } from './routes/products.js'
import { createUserRouter } from './routes/users.js'
import { createTableRouter } from './routes/table.js'
import { createClientRouter } from './routes/clients.js'
import { createOrderRouter } from './routes/orders.js'
import 'dotenv/config'

export const createApp = ({ productModel, userModel, tableModel, clientModel, orderModel }) => {
  const app = express()
  app.use(json())
  app.disable('x-powered-by')

  app.get('/', (req, res) => {
    res.json({ message: 'hola mundo' })
  })

  app.use('/products', createProductRouter({ productModel }))
  app.use('/users', createUserRouter({ userModel }));
  app.use('/tables', createTableRouter({ tableModel }));
  app.use('/clients', createClientRouter({ clientModel }));
  app.use('/orders', createOrderRouter({ orderModel }))

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}