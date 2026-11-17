
import { useSyncExternalStore, useState } from 'react'
import { favouriteRouteService } from '../services/favouriteRouteService'
import type { FavouriteRoute } from '../types/FavouriteRoute'

let currentRoutes = favouriteRouteService.getAll()
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot(): FavouriteRoute[] {
  return currentRoutes
}

function refreshSharedRoutes() {
  currentRoutes = favouriteRouteService.getAll()
  listeners.forEach((listener) => listener())
}

/**
 * Manages favourite route presentation state.
 * favouriteRoutes: saved routes displayed by components.
 * errorMessage: validation feedback for the user.
 * addFavourite: adds a route and refreshes the display.
 * removeFavourite: removes a route and refreshes the display.
 * updateFavourite: updates a route and refreshes the display.
 * refreshRoutes: reloads the displayed routes.
 */
export function useFavouriteRoutes() {
  const favouriteRoutes = useSyncExternalStore(subscribe, getSnapshot)
  const [errorMessage, setErrorMessage] = useState('')

  function refreshRoutes() {
    refreshSharedRoutes()
  }

  function addFavourite(routeName: string) {
    const success = favouriteRouteService.add(routeName)

    if (!success) {
      setErrorMessage('Please select a valid route that is not already saved.')
      return
    }

    setErrorMessage('')
    refreshRoutes()
  }

  function removeFavourite(id: number) {
    favouriteRouteService.remove(id)
    setErrorMessage('')
    refreshRoutes()
  }

  function updateFavourite(id: number, routeName: string) {
    const success = favouriteRouteService.update(id, routeName)

    if (!success) {
      setErrorMessage('Unable to update favourite route.')
      return
    }

    setErrorMessage('')
    refreshRoutes()
  }

  return {
    favouriteRoutes,
    errorMessage,
    addFavourite,
    removeFavourite,
    updateFavourite,
    refreshRoutes,
  }
}
