import { Router } from 'express'
import {  BillController } from '../controllers/bills.js'

export const createBillRouter = ({ billModel }) => {

  const billRouter = Router()

  const billController = new BillController({ billModel })

  billRouter.get('/', billController.getAll)
  billRouter.get('/:id/details', billController.getDetails)
  billRouter.get('/:id', billController.getById)
  billRouter.post('/', billController.create)


  return billRouter
}