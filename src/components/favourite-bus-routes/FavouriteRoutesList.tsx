
import { useFavouriteRoutes } from '../../hooks/useFavouriteRoutes'
import { favouriteRouteService } from '../../services/favouriteRouteService'

type FavouriteRoutesListProps = {
  onSelect: (routeName: string) => void
  onRemove: (routeName: string) => void
}

/**
 * Sprint 3 - Lovedeep Singh
 *
 * Displays saved favourite routes.
 * Hook: Manages favourite route presentation state.
 * Service: Checks whether routes are saved.
 * Repository: Stores favourite route test data.
 */
function FavouriteRoutesList({
  onSelect,
  onRemove,
}: FavouriteRoutesListProps) {
  const { favouriteRoutes, removeFavourite } = useFavouriteRoutes()

  return (
    <>
      <h2>Saved Routes</h2>

      <ul>
        {favouriteRoutes
          .filter((route) =>
            favouriteRouteService.isFavourite(route.routeName)
          )
          .map((route) => (
            <li key={route.id}>
              <button
                type="button"
                className="route-name-button"
                onClick={() => onSelect(route.routeName)}
              >
                {route.routeName}
              </button>{' '}

              <button
                type="button"
                onClick={() => onSelect(route.routeName)}
              >
                Select
              </button>{' '}

              <button
                type="button"
                onClick={() => {
                  removeFavourite(route.id)
                  onRemove(route.routeName)
                }}
              >
                Remove
              </button>
            </li>
          ))}
      </ul>
    </>
  )
}

export default FavouriteRoutesList
