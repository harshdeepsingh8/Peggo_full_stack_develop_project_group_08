
import { useState } from 'react'
import { favouriteRouteService } from '../services/favouriteRouteService'

export function useFavouriteRoutes() {
  const [favouriteRoutes, setFavouriteRoutes] = useState(
    favouriteRouteService.getAll()
  )

  const [errorMessage, setErrorMessage] = useState('')

  function refreshRoutes() {
    setFavouriteRoutes(favouriteRouteService.getAll())
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
