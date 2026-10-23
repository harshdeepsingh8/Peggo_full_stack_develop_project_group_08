import type { BusRoute } from '../types/transit'
import { routeData } from '../data/transitData'
import { createRepository } from './createRepository'

/** Provides CRUD access to typed bus-route test data. */
export const busRouteRepository =
  createRepository<BusRoute>(routeData)