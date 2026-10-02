import { useState } from 'react'
import type { Dispatch, FormEvent, SetStateAction } from 'react'

type FavouriteBusRoutesProps = {
  favouriteRoutes: string[]
  setFavouriteRoutes: Dispatch<SetStateAction<string[]>>
  selectedRoute: string
  setSelectedRoute: Dispatch<SetStateAction<string>>
}

function FavouriteBusRoutes({
  favouriteRoutes,
  setFavouriteRoutes,
  selectedRoute,
  setSelectedRoute,
}: FavouriteBusRoutesProps) {
  const [newRoute, setNewRoute] = useState('')

  function addFavourite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const route = newRoute.trim()

    if (route === '') {
      return
    }

    setFavouriteRoutes([...favouriteRoutes, route])
    setNewRoute('')
  }

  function removeFavourite(route: string) {
    setFavouriteRoutes(
      favouriteRoutes.filter((favouriteRoute) => favouriteRoute !== route),
    )
  }

  return (
    <section className="favourite-bus-routes">
      <h1>Favourite Bus Routes</h1>

      <p>Selected Route: {selectedRoute}</p>

      <form onSubmit={addFavourite}>
        <label htmlFor="favourite-route">Bus Route</label>

        <input
          id="favourite-route"
          type="text"
          value={newRoute}
          onChange={(event) => setNewRoute(event.target.value)}
        />

        <button type="submit">Add Favourite</button>
      </form>

      <h2>Saved Routes</h2>

      <ul>
        {favouriteRoutes.map((route) => (
          <li key={route}>
            {route}{' '}

            <button
              type="button"
              onClick={() => setSelectedRoute(route)}
            >
              Select
            </button>{' '}

            <button
              type="button"
              onClick={() => removeFavourite(route)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default FavouriteBusRoutes