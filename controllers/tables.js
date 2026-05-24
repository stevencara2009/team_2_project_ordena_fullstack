import { validateTable, validatePartialTable } from '../schemas/tables.js'
import { ALLOWED_ORIGINS } from "../config/cors.js"


export class TableController {

  constructor({ tableModel }) {
    this.tableModel = tableModel
  }

  getAll = async (req, res) => {
    const origin = req.header('origin')
    if (ALLOWED_ORIGINS.includes(origin) || !origin) {
      res.header('Access-Control-Allow-Origin', origin)
    }
    try {
      const { state } = req.query
      const tables = await this.tableModel.getAll({ state })
      res.json(tables)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  getById = async (req, res) => {
    try {
      const { id } = req.params
      const table = await this.tableModel.getById({ id })
      if (table) return res.json(table)
      res.status(404).json({ message: 'Table not found' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  create = async (req, res) => {
    try {
      const result = validateTable(req.body)
      if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })
      const newTable = await this.tableModel.create({ input: result.data })
      res.status(201).json(newTable)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  update = async (req, res) => {
    try {
      const result = validatePartialTable(req.body)
      if (!result.success) return res.status(400).json({ error: result.error.message })
      const { id } = req.params
      const updatedTable = await this.tableModel.update({ id, input: result.data })
      return res.status(200).json(updatedTable)
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
      const result = await this.tableModel.delete({ id })
      if (result === false) {
        return res.status(404).json({ message: 'Table not found' })
      }
      return res.json({ message: 'Table deleted' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

}
