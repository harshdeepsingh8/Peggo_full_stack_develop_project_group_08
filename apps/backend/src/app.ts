import express from 'express'
import favouriteRoutes from './routes/favouriteRoutes'

const app = express()

app.use(express.json())

app.use('/api/favourite-routes', favouriteRoutes)

export default app