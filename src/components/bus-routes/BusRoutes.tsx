import { useState } from 'react'
import type { Dispatch, FormEvent, SetStateAction } from 'react'

type BusRoutesProps = {
  routes: string[]
  setRoutes: Dispatch<SetStateAction<string[]>>
  selectedRoute: string
  setSelectedRoute: Dispatch<SetStateAction<string>>
}

function BusRoutes({
  routes,
  setRoutes,
  selectedRoute,
  setSelectedRoute,
}: BusRoutesProps) {
  const [newRoute, setNewRoute] = useState('')

  function addRoute(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const route = newRoute.trim()

    if (route === '') {
      return
    }

    setRoutes([...routes, route])
    setNewRoute('')
  }

  function removeRoute(route: string) {
    setRoutes(routes.filter((currentRoute) => currentRoute !== route))
  }

  return (
    <section className="bus-routes">
      <h1>Bus Routes</h1>
      <p>Explore Winnipeg bus routes.</p>

      <p>Selected Route: {selectedRoute}</p>

      <form onSubmit={addRoute}>
        <label htmlFor="bus-route">Bus Route</label>

        <input
          id="bus-route"
          type="text"
          value={newRoute}
          onChange={(event) => setNewRoute(event.target.value)}
        />

        <button type="submit">Add Route</button>
      </form>

      <h2>Available Routes</h2>

      <ul>
        {routes.map((route) => (
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
              onClick={() => removeRoute(route)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default BusRoutes