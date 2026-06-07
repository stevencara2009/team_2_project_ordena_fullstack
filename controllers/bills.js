import { validateBill } from "../schemas/bills.js"
import { ALLOWED_ORIGINS } from "../config/cors.js"

export class BillController {

  constructor({ billModel }) {
    this.billModel = billModel
  }


  getAll = async (req, res) => {
    const origin = req.header('origin')
    if (ALLOWED_ORIGINS.includes(origin) || !origin) {
      res.header('Access-Control-Allow-Origin', origin)
    }
    const rows = await this.billModel.getAll()
    res.json(rows)
  }


  getById = async (req, res) => {
    const { id } = req.params
    console.log(id)
    const rows = await this.billModel.getById({
      id
    })
    res.json(rows)
  }


  create = async (req, res) => {
    const result = validateBill(req.body)

    if (!result.success) {
      return res.status(400).json({
        errors: result.error
      })
    }

    try {
      const created = await this.billModel.create({
        input: result.data
      })
      res.status(201).json(created)
    } catch (error) {
      res.status(400).json({
        message: error.message
      })
    }
  }


  getDetails = async (req, res) => {

    const { id } = req.params

    const details =
      await this.billModel.getDetails({ id })

    if (!details) {
      return res.status(404).json({
        message: 'Bill not found'
      })
    }

    res.json(details)
  }
}