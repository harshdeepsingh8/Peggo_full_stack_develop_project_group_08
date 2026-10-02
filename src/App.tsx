import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import BusRoutes from './components/bus-routes/BusRoutes'
import FavouriteBusRoutes from './components/favourite-bus-routes/FavouriteBusRoutes'
import './App.css'

function App() {
  const [routes, setRoutes] = useState([
    'Route 11 - Portage',
    'Route 18 - North Main',
    'Route 21 - Portage Express',
    'Route 47 - Transcona',
  ])

  const [favouriteRoutes, setFavouriteRoutes] = useState([
    'Route 11 - Portage',
    'Route 18 - North Main',
  ])

  return (
    <>
      <header>
        <h1>PeGGo</h1>

        <nav>
          <Link to="/bus-routes">Bus Routes</Link>{' '}
          <Link to="/favourite-routes">Favourite Bus Routes</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <BusRoutes
                routes={routes}
                setRoutes={setRoutes}
              />
            }
          />

          <Route
            path="/bus-routes"
            element={
              <BusRoutes
                routes={routes}
                setRoutes={setRoutes}
              />
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