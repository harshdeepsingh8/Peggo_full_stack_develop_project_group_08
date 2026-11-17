
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useFavouriteRoutes } from '../../hooks/useFavouriteRoutes'
import RouteDetailsModal from '../bus-routes/RouteDetailsModal'
import FavouriteRoutesList from './FavouriteRoutesList'
type FavouriteBusRoutesProps = {
  routes: string[]
  selectedRoute: string
  setSelectedRoute: (route: string) => void
}

/**
 * Sprint 3 - Lovedeep Singh
 *
 * Component: Displays the Favourite Bus Routes page.
 * Hook: useFavouriteRoutes manages presentation state.
 * Service: Handles favourite route validation and business logic.
 * Repository: Manages favourite route test data.
 *
 * FavouriteRoutesList reuses the same custom hook.
 * RouteDetailsModal displays the selected route details.
 */
function FavouriteBusRoutes({
  routes,
  selectedRoute,
  setSelectedRoute,
}: FavouriteBusRoutesProps) {
  const [newRoute, setNewRoute] = useState('')
  const [popupRoute, setPopupRoute] = useState<string | null>(null)

  const {
    errorMessage,
    addFavourite,
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

      <FavouriteRoutesList
        onSelect={openRouteDetails}
        onRemove={(routeName) => {
          if (popupRoute === routeName) {
            setPopupRoute(null)
          }
        }}
      />

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
