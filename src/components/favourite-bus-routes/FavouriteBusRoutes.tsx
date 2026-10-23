
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useFavouriteRoutes } from '../../hooks/useFavouriteRoutes'
import RouteDetailsModal from '../bus-routes/RouteDetailsModal'

type FavouriteBusRoutesProps = {
  routes: string[]
  selectedRoute: string
  setSelectedRoute: (route: string) => void
}

/**
 * Sprint 3 - Student 2: Lovedeep Singh
 *
 * Component: Displays favourite routes and user actions.
 * Hook: useFavouriteRoutes manages UI state and calls the service.
 * Service: Validates route names and handles business rules.
 * Repository: Stores and manages favourite route test data.
 *
 * RouteDetailsModal is reused from the Bus Routes feature.
 */

function FavouriteBusRoutes({
  routes,
  selectedRoute,
  setSelectedRoute,
}: FavouriteBusRoutesProps) {
  const [newRoute, setNewRoute] = useState('')
  const [popupRoute, setPopupRoute] = useState<string | null>(null)

  const {
    favouriteRoutes,
    errorMessage,
    addFavourite,
    removeFavourite,
  } = useFavouriteRoutes()

  function handleAddFavourite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (newRoute === '') {
      return
    }

    addFavourite(newRoute)
    setNewRoute('')
  }

  function openRouteDetails(routeName: string) {
    setSelectedRoute(routeName)
    setPopupRoute(routeName)
  }

  return (
    <section className="favourite-bus-routes">
      <h1>Favourite Bus Routes</h1>

      <p>Selected Route: {selectedRoute}</p>

      <form onSubmit={handleAddFavourite}>
        <label htmlFor="favourite-route">Bus Route</label>

        <select
          id="favourite-route"
          value={newRoute}
          onChange={(event) => setNewRoute(event.target.value)}
        >
          <option value="">Select a route</option>

          {routes.map((route) => (
            <option key={route} value={route}>
              {route}
            </option>
          ))}
        </select>

        <button type="submit">Add Favourite</button>
      </form>

      <p role="status">{errorMessage}</p>

      <h2>Saved Routes</h2>

      <ul>
        {favouriteRoutes.map((route) => (
          <li key={route.id}>
            <button
              type="button"
              className="route-name-button"
              onClick={() => openRouteDetails(route.routeName)}
            >
              {route.routeName}
            </button>{' '}

            <button
              type="button"
              onClick={() => openRouteDetails(route.routeName)}
            >
              Select
            </button>{' '}

            <button
              type="button"
              onClick={() => {
                removeFavourite(route.id)

                if (popupRoute === route.routeName) {
                  setPopupRoute(null)
                }
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {popupRoute !== null && (
        <RouteDetailsModal
          key={popupRoute}
          routeName={popupRoute}
          onClose={() => setPopupRoute(null)}
        />
      )}
    </section>
  )
}

export default FavouriteBusRoutes
