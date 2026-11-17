import { Router } from 'express'
import { getFavouriteRoutes } from '../controllers/favouriteRoutesController'

const router = Router()

router.get('/', getFavouriteRoutes)

export default router