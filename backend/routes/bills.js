import { Router } from 'express'
import {  BillController } from '../controllers/bills.js'

export const createBillRouter = ({ billModel }) => {

  const billRouter = Router()

  const billController = new BillController({ billModel })

  billRouter.get('/', billController.getAll)
  billRouter.get('/:id/details', billController.getDetails)
  billRouter.get('/:id', billController.getById)
  billRouter.post('/', billController.create)


  /* billRouter.options('/:id', (req, res) => {
    const origin = req.header('origin')
    if (ALLOWED_ORIGINS.includes(origin) || !origin) {
      res.header('Access-Control-Allow-Origin', origin)
      res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
      res.header('Access-Control-Allow-Headers', 'Content-Type')
    }
    res.status(200).end()
  })*/

  return billRouter
}