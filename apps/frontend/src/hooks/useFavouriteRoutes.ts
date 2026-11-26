import { useSyncExternalStore, useState, useEffect } from 'react'
import { favouriteRouteService } from '../services/favouriteRouteService'
import type { FavouriteRoute } from '../types/FavouriteRoute'

let currentRoutes: FavouriteRoute[] = []
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

async function refreshSharedRoutes() {
  currentRoutes = await favouriteRouteService.getAll()
  listeners.forEach((listener) => listener())
}

/**
 * Manages favourite route presentation state.
 */
export function useFavouriteRoutes() {
  const favouriteRoutes = useSyncExternalStore(subscribe, getSnapshot)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    refreshSharedRoutes().catch(() => {
      setErrorMessage('Unable to load favourite routes.')
    })
  }, [])

  async function refreshRoutes() {
    await refreshSharedRoutes()
  }

  async function addFavourite(routeName: string) {
    try {
      const success = await favouriteRouteService.add(routeName)

      if (!success) {
        setErrorMessage('Please select a valid route that is not already saved.')
        return
      }

      setErrorMessage('')
      await refreshRoutes()
    } catch {
      setErrorMessage('Unable to add favourite route.')
    }
  }

  async function removeFavourite(id: number) {
    try {
      await favouriteRouteService.remove(id)
      setErrorMessage('')
      await refreshRoutes()
    } catch {
      setErrorMessage('Unable to remove favourite route.')
    }
  }

  async function updateFavourite(id: number, routeName: string) {
    try {
      const success = await favouriteRouteService.update(id, routeName)

      if (!success) {
        setErrorMessage('Unable to update favourite route.')
        return
      }

      setErrorMessage('')
      await refreshRoutes()
    } catch {
      setErrorMessage('Unable to update favourite route.')
    }
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