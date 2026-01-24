import { Router } from "express";
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'
import { MovieModel } from '../models/movie.js'

const ALLOWED_ORIGINS = [
  'http://localhost:8080'
]

export const moviesRouter = Router()

moviesRouter.get('/', async (req, res) => {
  const origin = req.header('origin')
  if (ALLOWED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  try {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


moviesRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


moviesRouter.post('/', async (req, res) => {
  try {
    const result = validateMovie(req.body)
    if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })
    const newMovie = await MovieModel.create({ input: result.data })
    res.status(201).json(newMovie)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

moviesRouter.patch('/:id', async (req, res) => {
  try {
    const result = validatePartialMovie(req.body)
    if (!result.success) return res.status(400).json({ error: result.error.message })
    const { id } = req.params
    const updatedMovie = await MovieModel.update({ id, input: result.data })
    return res.status(200).json(updatedMovie)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


moviesRouter.options('/:id', (req, res) => {
  const origin = req.header('origin')
  if (ALLOWED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
  }
  res.status(200).end()
})

moviesRouter.delete('/:id', async (req, res) => {
  const origin = req.header('origin')
  if (ALLOWED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  try {
    const { id } = req.params
    const result = await MovieModel.delete({ id })
    if (result === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    return res.json({ message: 'Movie deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
