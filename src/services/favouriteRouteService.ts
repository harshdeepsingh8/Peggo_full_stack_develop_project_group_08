
import type { FavouriteRoute } from '../types/FavouriteRoute'
import { favouriteRouteRepo } from '../repositories/favouriteRouteRepo'

export const favouriteRouteService = {
  getAll(): FavouriteRoute[] {
    return favouriteRouteRepo.getAll()
  },

  isFavourite(routeName: string): boolean {
    return favouriteRouteRepo.getAll().some(
      (route) => route.routeName === routeName.trim()
    )
  },

  add(routeName: string): boolean {
    const name = routeName.trim()

    if (name === '') {
      return false
    }

    const routes = favouriteRouteRepo.getAll()

    if (routes.some((route) => route.routeName === name)) {
      return false
    }

    const newRoute: FavouriteRoute = {
      id: Math.max(0, ...routes.map((route) => route.id)) + 1,
      routeName: name,
    }

    favouriteRouteRepo.create(newRoute)
    return true
  },

  remove(id: number): void {
    favouriteRouteRepo.delete(id)
  },

  update(id: number, routeName: string): boolean {
    const name = routeName.trim()

    if (name === '') {
      return false
    }

    const route = favouriteRouteRepo.getById(id)

    if (!route) {
      return false
    }

    favouriteRouteRepo.update({
      ...route,
      routeName: name,
    })

    return true
  },
}
