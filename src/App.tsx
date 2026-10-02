import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import NearbyStops from './components/nearby-stops/NearbyStops'
import FavouriteBusRoutes from './components/favourite-bus-routes/FavouriteBusRoutes'
import './App.css'

function App() {
  const [favouriteRoutes, setFavouriteRoutes] = useState([
    'Route 11 - Portage',
    'Route 18 - North Main',
  ])

  return (
    <>
      <header>
        <h1>PeGGo</h1>

        <nav>
          <Link to="/">Nearby Stops</Link>{' '}
          <Link to="/favourite-routes">Favourite Bus Routes</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NearbyStops />

                <p>
                  Favourite routes saved: {favouriteRoutes.length}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setFavouriteRoutes([
                      ...favouriteRoutes,
                      `Route ${favouriteRoutes.length + 1}`,
                    ])
                  }
                >
                  Add Favourite Route
                </button>
              </>
            }
          />

          <Route
            path="/favourite-routes"
            element={
              <FavouriteBusRoutes
                favouriteRoutes={favouriteRoutes}
                setFavouriteRoutes={setFavouriteRoutes}
              />
            }
          />
        </Routes>
      </main>

      <footer>
        <p>PeGGo - Group 08</p>
      </footer>
    </>
  )
}

export default App