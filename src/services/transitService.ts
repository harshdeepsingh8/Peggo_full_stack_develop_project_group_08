import type { ResourceKind } from '../types/transit'
import { busRouteRepository } from '../repositories/busRouteRepository'
import { favouriteRepository } from '../repositories/favouriteRepository'

const repositories = {
  routes: busRouteRepository,
  favourites: favouriteRepository,
}

/**
 * Business rules: names must be nonempty and unique within a resource.
 * Repositories handle storage; components handle presentation.
 */
function validateName(
  kind: ResourceKind,
  name: string,
  excludingId?: number,
): string {
  const trimmed = name.trim()

  if (!trimmed) {
    throw new Error('Please enter a name.')
  }

  const duplicate = repositories[kind].getAll().some(record =>
    record.id !== excludingId &&
    record.name.toLowerCase() === trimmed.toLowerCase(),
  )

  if (duplicate) {
    throw new Error('That name already exists.')
  }

  return trimmed
}

function create(kind: ResourceKind, name: string) {
  return repositories[kind].create(validateName(kind, name))
}

export const transitService = {
  getAll(kind: ResourceKind) {
    return repositories[kind].getAll()
  },

  subscribe(kind: ResourceKind, listener: () => void) {
    return repositories[kind].subscribe(listener)
  },

  create,

  update(kind: ResourceKind, id: number, name: string) {
    const trimmed = validateName(kind, name, id)

    if (!repositories[kind].update(id, trimmed)) {
      throw new Error('This record no longer exists.')
    }
  },

  remove(kind: ResourceKind, id: number) {
    if (!repositories[kind].delete(id)) {
      throw new Error('This record no longer exists.')
    }
  },

  addRouteToFavourites(routeId: number) {
    const route = busRouteRepository.getById(routeId)

    if (!route) {
      throw new Error('Please select an available route.')
    }

    return create('favourites', route.name)
  },
}