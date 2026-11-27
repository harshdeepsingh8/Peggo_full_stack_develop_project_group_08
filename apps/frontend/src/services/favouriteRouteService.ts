import type { FavouriteRoute } from '../types/FavouriteRoute'
import { favouriteRouteRepo } from '../repositories/favouriteRouteRepo'

export const favouriteRouteService = {
  async getAll(): Promise<FavouriteRoute[]> {
    return await favouriteRouteRepo.getAll()
  },

  async isFavourite(routeName: string): Promise<boolean> {
    const routes = await favouriteRouteRepo.getAll()

    return routes.some(
      (route) => route.routeName === routeName.trim()
    )
  },

  async add(routeName: string): Promise<boolean> {
    const name = routeName.trim()

    if (name === '') {
      return false
    }

    if (await this.isFavourite(name)) {
      return false
    }

    await favouriteRouteRepo.create({
      id: 0,
      routeName: name,
    })

    return true
  },

  async remove(id: number): Promise<void> {
    await favouriteRouteRepo.delete(id)
  },

  async update(id: number, routeName: string): Promise<boolean> {
    const name = routeName.trim()

    if (name === '') {
      return false
    }

    const route = await favouriteRouteRepo.getById(id)

    if (!route) {
      return false
    }

    await favouriteRouteRepo.update({
      ...route,
      routeName: name,
    })

    return true
  },
}