import type { FavouriteRoute } from '../types/transit'
import { favouriteData } from '../data/transitData'
import { createRepository } from './createRepository'

export const favouriteRepository =
  createRepository<FavouriteRoute>(favouriteData)