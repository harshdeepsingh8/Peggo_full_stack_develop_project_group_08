import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import BusRoutes from './components/bus-routes/BusRoutes'
import FavouriteBusRoutes from './components/favourite-bus-routes/FavouriteBusRoutes'
import './App.css'

function App() {
  const [routes, setRoutes] = useState([
  'Route BLUE - St Norbert/Uom',
  'Route FX2 - St Vital/Garden City',
  'Route F5 - St Vital/Garden City',
  'Route D10 - Transcona/Southdale',
  'Route D11 - Portage/Main',
  'Route D12 - Forks/Airport',
  'Route D13 - St Boniface/West Kildonan',
  'Route D14 - St Boniface/West Kildonan',
  'Route D15 - St Boniface/West Kildonan',
  'Route D16 - Polo Park/Downtown',
  'Route D17 - Downtown/Zoo',
  'Route D18 - Downtown/RRC',
  'Route D19 - Downtown/West Kildonan',
  'Route 22 - Downtown/Transcona',
  'Route 28 - Downtown/St Vital',
  'Route 31 - Downtown/St Boniface',
  'Route 37 - Downtown/St James',
  'Route 38 - Downtown/St James',
  'Route 39 - Downtown/St James',
  'Route 43 - Downtown/St James',
  'Route 48 - Downtown/St James',
])

  const [favouriteRoutes, setFavouriteRoutes] = useState([
    'Route 11 - Portage',
    'Route 18 - North Main',
  ])

  const [selectedRoute, setSelectedRoute] = useState('No route selected')

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
                selectedRoute={selectedRoute}
                setSelectedRoute={setSelectedRoute}
              />
            }
          />

          <Route
            path="/bus-routes"
            element={
              <BusRoutes
                routes={routes}
                setRoutes={setRoutes}
                selectedRoute={selectedRoute}
                setSelectedRoute={setSelectedRoute}
              />
            }
          />

          <Route
            path="/favourite-routes"
            element={
              <FavouriteBusRoutes
              routes={routes}
              favouriteRoutes={favouriteRoutes}
              setFavouriteRoutes={setFavouriteRoutes}
              selectedRoute={selectedRoute}
              setSelectedRoute={setSelectedRoute}
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