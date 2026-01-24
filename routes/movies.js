import { Router } from "express";
import { MovieController } from '../controllers/movies.js'

export const ALLOWED_ORIGINS = [
  'http://localhost:8080'
]

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)
moviesRouter.get('/:id', MovieController.getById)
moviesRouter.post('/', MovieController.create)
moviesRouter.patch('/:id', MovieController.update)
moviesRouter.delete('/:id', MovieController.delete)

moviesRouter.options('/:id', (req, res) => {
  const origin = req.header('origin')
  if (ALLOWED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
  }
  res.status(200).end()
})


