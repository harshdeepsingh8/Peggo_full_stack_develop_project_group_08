
import type { FavouriteRoute } from '../types/FavouriteRoute'
import { favouriteRoutesData } from '../data/favouriteRoutes'

let favouriteRoutes: FavouriteRoute[] = [...favouriteRoutesData]

export const favouriteRouteRepo = {
  // Read all favourite routes
  getAll(): FavouriteRoute[] {
    return [...favouriteRoutes]
  },

  // Read one favourite route
  getById(id: number): FavouriteRoute | undefined {
    return favouriteRoutes.find((route) => route.id === id)
  },

  // Create a favourite route
  create(route: FavouriteRoute): void {
    favouriteRoutes.push(route)
  },

  // Update a favourite route
  update(updatedRoute: FavouriteRoute): void {
    favouriteRoutes = favouriteRoutes.map((route) =>
      route.id === updatedRoute.id ? updatedRoute : route
    )
  },

  // Delete a favourite route
  delete(id: number): void {
    favouriteRoutes = favouriteRoutes.filter((route) => route.id !== id)
  },
}
