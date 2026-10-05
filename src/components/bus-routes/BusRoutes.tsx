import { useState } from 'react'
import type { Dispatch, FormEvent, SetStateAction } from 'react'

type BusRoutesProps = {
  routes: string[]
  setRoutes: Dispatch<SetStateAction<string[]>>
  selectedRoute: string
  setSelectedRoute: Dispatch<SetStateAction<string>>
}

const sampleRoutes = Array.from(
  { length: 20 },
  (_, index) => `Sample Route ${index + 1}`,
)

function BusRoutes({
  routes,
  setRoutes,
  selectedRoute,
  setSelectedRoute,
}: BusRoutesProps) {
  const [newRoute, setNewRoute] = useState('')
  const [message, setMessage] = useState('')

  const dropdownRoutes = [...new Set([...routes, ...sampleRoutes])]
  const dropdownValue = dropdownRoutes.includes(selectedRoute)
    ? selectedRoute
    : ''

  function addRoute(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const route = newRoute.trim()

    if (!route) {
      setMessage('Please enter a route.')
      return
    }

    setRoutes((currentRoutes) =>
      currentRoutes.includes(route)
        ? currentRoutes
        : [...currentRoutes, route],
    )
    setNewRoute('')
    setMessage(`${route} is in your available routes.`)
  }

  function removeRoute(route: string) {
    setRoutes((currentRoutes) =>
      currentRoutes.filter((currentRoute) => currentRoute !== route),
    )

    if (selectedRoute === route) {
      setSelectedRoute('No route selected')
    }

    setMessage(`${route} removed.`)
  }

  return (
    <section className="bus-routes">
      <span className="section-tag">EXPLORE YOUR CITY</span>
      <h1>Bus Routes</h1>
      <p>Choose a route and plan your next journey.</p>

      <div className="route-picker">
        <label htmlFor="route-dropdown">Choose a bus route</label>

        <select
          id="route-dropdown"
          value={dropdownValue}
          onChange={(event) =>
            setSelectedRoute(event.target.value || 'No route selected')
          }
        >
          <option value="">Select a route</option>

          <optgroup label="Your available routes">
            {[...new Set(routes)].map((route) => (
              <option key={route} value={route}>
                {route}
              </option>
            ))}
          </optgroup>

          <optgroup label="Sample routes">
            {sampleRoutes
              .filter((route) => !routes.includes(route))
              .map((route) => (
                <option key={route} value={route}>
                  {route}
                </option>
              ))}
          </optgroup>
        </select>

        <p className="helper-text">
          Sample routes are for the project demonstration.
        </p>
      </div>

      <p className="selected-route">
        <strong>Selected Route:</strong> {selectedRoute}
      </p>

      <form onSubmit={addRoute}>
        <label htmlFor="bus-route">Add a bus route</label>

        <input
          id="bus-route"
          type="text"
          placeholder="Enter a route number or name"
          value={newRoute}
          onChange={(event) => setNewRoute(event.target.value)}
        />

        <button type="submit">Add Route</button>
      </form>

      <p role="status" className="route-message">
        {message}
      </p>

      <h2>Available Routes</h2>

      {routes.length === 0 ? (
        <p>No routes yet. Add one above.</p>
      ) : (
        <ul>
          {routes.map((route) => (
            <li key={route}>
              <span>{route}</span>

              <div className="route-actions">
                <button
                  type="button"
                  onClick={() => setSelectedRoute(route)}
                >
                  Select
                </button>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeRoute(route)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default BusRoutes