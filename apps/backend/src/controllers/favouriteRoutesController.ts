import type { Request, Response } from 'express'
import { favouriteRoutesService } from '../services/favouriteRoutesService'

export const getFavouriteRoutes = (
  req: Request,
  res: Response
) => {
  res.json(favouriteRoutesService.getAll())
}