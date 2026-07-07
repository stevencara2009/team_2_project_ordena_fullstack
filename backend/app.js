import express, { json } from 'express';
import cors from 'cors';
import { createProductRouter } from './routes/products.js'
import { createUserRouter } from './routes/users.js'
import { createTableRouter } from './routes/table.js'
import { createClientRouter } from './routes/clients.js'
import { createOrderRouter } from './routes/orders.js'
import { createOrderProductRouter } from './routes/orderProducts.js'
import { createBillRouter } from './routes/bills.js'
import { createAuthRouter } from './routes/auth.js';

export const createApp = ({ productModel, userModel, tableModel, clientModel, orderModel, orderProductModel, billModel }) => {
  const app = express()
  app.use(json())
  app.use(cors({ origin: 'http://localhost:5173' }));
  app.disable('x-powered-by')

  app.get('/', (req, res) => {
    res.json({ message: 'hola mundo' })
  })

  app.use('/products', createProductRouter({ productModel }))
  app.use('/users', createUserRouter({ userModel }));
  app.use('/tables', createTableRouter({ tableModel }));
  app.use('/clients', createClientRouter({ clientModel }));
  app.use('/orders', createOrderRouter({ orderModel }))
  app.use('/order-products', createOrderProductRouter({ orderProductModel }))
  app.use('/bills', createBillRouter({ billModel }))
  app.use('/api/auth', createAuthRouter({ userModel }))

  
  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}