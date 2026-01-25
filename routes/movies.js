import { Router } from "express";
import { MovieController } from '../controllers/movies.js'
import { ALLOWED_ORIGINS } from "../config/cors.js";

export const createMovieRouter = ({ movieModel }) => {

  const moviesRouter = Router()
  const movieController = new MovieController({ movieModel})

  moviesRouter.get('/', movieController.getAll)
  moviesRouter.get('/:id', movieController.getById)
  moviesRouter.post('/', movieController.create)
  moviesRouter.patch('/:id', movieController.update)
  moviesRouter.delete('/:id', movieController.delete)

  moviesRouter.options('/:id', (req, res) => {
    const origin = req.header('origin')
    if (ALLOWED_ORIGINS.includes(origin) || !origin) {
      res.header('Access-Control-Allow-Origin', origin)
      res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
      res.header('Access-Control-Allow-Headers', 'Content-Type')
    }
    res.status(200).end()
  })
  return moviesRouter
}



