import { useState } from 'react'
import type { Dispatch, FormEvent, SetStateAction } from 'react'
import RouteDetailsModal from './RouteDetailsModal'

type BusRoutesProps = {
  routes: string[]
  setRoutes: Dispatch<SetStateAction<string[]>>
  selectedRoute: string
  setSelectedRoute: Dispatch<SetStateAction<string>>
}

const routeGroups = [
  { name: 'Rapid Transit', routes: ['BLUE'] },
  { name: 'Frequent Express', routes: ['FX2', 'FX3', 'FX4'] },
  { name: 'Frequent', routes: ['F5', 'F6', 'F7', 'F8', 'F9'] },
  {
    name: 'Direct',
    routes: [
      'D10', 'D11', 'D12', 'D13', 'D14',
      'D15', 'D16', 'D17', 'D18', 'D19',
    ],
  },
  {
    name: 'Two-digit routes',
    routes: ['22', '28', '31', '37', '38', '39', '43', '48', '70', '74', '91'],
  },
  { name: '200-series', routes: ['220', '223', '224'] },
  { name: '300-series', routes: ['330', '332', '334', '336'] },
  { name: '400-series', routes: ['440', '442', '444', '446'] },
  { name: '500-series', routes: ['551', '552', '556', '557', '558'] },
  {
    name: '600-series',
    routes: [
      '641', '642', '649', '650', '662', '664', '671', '672',
      '676', '677', '678', '679', '680', '690', '691', '694',
    ],
  },
  {
    name: '800-series',
    routes: [
      '833', '881', '883', '884', '885',
      '886', '887', '888', '889', '895',
    ],
  },
]

const allRoutes = routeGroups.flatMap((group) =>
  group.routes.map((route) => `Route ${route}`),
)

function RouteOptions() {
  return (
    <>
      {routeGroups.map((group) => (
        <optgroup key={group.name} label={group.name}>
          {group.routes.map((route) => (
            <option key={route} value={`Route ${route}`}>
              Route {route}
            </option>
          ))}
        </optgroup>
      ))}
    </>
  )
}

function BusRoutes({
  routes,
  setRoutes,
  selectedRoute,
  setSelectedRoute,
}: BusRoutesProps) {
  const [newRoute, setNewRoute] = useState('')
  const [message, setMessage] = useState('')
  const [popupRoute, setPopupRoute] = useState<string | null>(null)

  const extraRoutes = [...new Set(routes)].filter(
    (route) => !allRoutes.includes(route),
  )

  const dropdownValue =
    allRoutes.includes(selectedRoute) || extraRoutes.includes(selectedRoute)
      ? selectedRoute
      : ''

  function openRouteDetails(route: string) {
    setSelectedRoute(route)
    setPopupRoute(route)
  }

  function addRoute(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!allRoutes.includes(newRoute)) {
      setMessage('Please choose a route to add.')
      return
    }

    if (routes.includes(newRoute)) {
      setMessage(`${newRoute} is already in your available routes.`)
      return
    }

    setRoutes((currentRoutes) =>
      currentRoutes.includes(newRoute)
        ? currentRoutes
        : [...currentRoutes, newRoute],
    )

    setMessage(`${newRoute} added to your available routes.`)
    setNewRoute('')
  }

  function removeRoute(route: string) {
    setRoutes((currentRoutes) =>
      currentRoutes.filter((currentRoute) => currentRoute !== route),
    )

    if (selectedRoute === route) {
      setSelectedRoute('No route selected')
    }

    if (popupRoute === route) {
      setPopupRoute(null)
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
          onChange={(event) => {
            const route = event.target.value

            if (route) {
              openRouteDetails(route)
            } else {
              setSelectedRoute('No route selected')
              setPopupRoute(null)
            }
          }}
        >
          <option value="">Select a route</option>
          <RouteOptions />

          {extraRoutes.length > 0 && (
            <optgroup label="Previously saved routes">
              {extraRoutes.map((route) => (
                <option key={route} value={route}>
                  {route}
                </option>
              ))}
            </optgroup>
          )}
        </select>

        <p className="helper-text">
          Routes are grouped by service type and route number.
        </p>
      </div>

      <p className="selected-route">
        <strong>Selected Route:</strong> {selectedRoute}
      </p>

      <form onSubmit={addRoute}>
        <label htmlFor="add-route-dropdown">Add a bus route</label>

        <select
          id="add-route-dropdown"
          value={newRoute}
          onChange={(event) => setNewRoute(event.target.value)}
        >
          <option value="">Choose a route to add</option>
          <RouteOptions />
        </select>

        <button type="submit">Add Route</button>
      </form>

      <p role="status" className="route-message">
        {message}
      </p>

      <h2>Available Routes</h2>

      {routes.length === 0 ? (
        <p>No routes yet. Choose one above and click Add Route.</p>
      ) : (
        <ul>
          {[...new Set(routes)].map((route) => (
            <li key={route}>
              <button
                type="button"
                className="route-name-button"
                onClick={() => openRouteDetails(route)}
              >
                {route}
              </button>

              <div className="route-actions">
                <button
                  type="button"
                  onClick={() => openRouteDetails(route)}
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

export default BusRoutes