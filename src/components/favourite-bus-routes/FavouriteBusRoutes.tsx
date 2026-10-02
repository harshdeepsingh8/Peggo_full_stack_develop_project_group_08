import { useState } from 'react'

function FavouriteBusRoutes() {
  const [favouriteRoutes, setFavouriteRoutes] = useState([
    'Route 11 - Portage',
    'Route 18 - North Main',
  ])

  function removeFavourite(route: string) {
    setFavouriteRoutes(
      favouriteRoutes.filter((favouriteRoute) => favouriteRoute !== route)
    )
  }

  return (
    <section className="favourite-bus-routes">
      <h2>Favourite Bus Routes</h2>

      <ul>
        {favouriteRoutes.map((route) => (
          <li key={route}>
            {route}
            <button type="button" onClick={() => removeFavourite(route)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default FavouriteBusRoutes