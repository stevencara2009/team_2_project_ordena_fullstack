import express, {json} from 'express'
import { moviesRouter } from './routes/movies.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'hola mundo' })
})

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})