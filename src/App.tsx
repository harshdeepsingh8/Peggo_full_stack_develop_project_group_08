import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { HelpFeedback, Settings, UserProfile } from './components/account/AccountPages'
import BusRoutes from './components/bus-routes/BusRoutes'
import FavouriteBusRoutes from './components/favourite-bus-routes/FavouriteBusRoutes'
import './App.css'

const themes = [
  { id: 'default', label: 'Default' },
  { id: 'spiderman', label: 'Spider-Man' },
  { id: 'doomsday', label: 'Doomsday' },
  { id: 'christmas', label: 'Christmas' },
  { id: 'love', label: 'Love' },
] as const

type Theme = (typeof themes)[number]['id']

const sideWordmarks: Record<Theme, { icon: string; words: string[] }> = {
  default: { icon: '', words: [] },
  doomsday: { icon: 'AVENGERS', words: ['DOOMSDAY'] },
  christmas: { icon: '🎅', words: ['JINGLE', 'BELL'] },
  spiderman: { icon: '🕷', words: ['YOUR', 'FRIENDLY', 'NEIGHBORHOOD'] },
  love: { icon: '💕', words: ['LOVELY', 'SOUL'] },
}

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

  const [selectedRoute, setSelectedRoute] = useState('No route selected')
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('peggo-theme')
    return themes.find((option) => option.id === savedTheme)?.id ?? 'default'
  })

  function changeTheme(nextTheme: Theme) {
    setTheme(nextTheme)
    localStorage.setItem('peggo-theme', nextTheme)
  }

  return (
    <div className="app-shell" data-theme={theme}>
      <header>
        <div className="brand-row">
          <h1>PeGGo</h1>

          <div className="header-actions">
            <details className="theme-picker">
              <summary>
                Theme · {themes.find((option) => option.id === theme)?.label}
              </summary>

              <div className="theme-options" role="group" aria-label="Colour theme">
                {themes.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={theme === option.id}
                    onClick={(event) => {
                      const picker = event.currentTarget.closest('details')
                      changeTheme(option.id)

                      if (picker) {
                        picker.open = false
                        picker.querySelector('summary')?.focus()
                      }
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </details>

            <details className="theme-picker account-menu">
              <summary>Account</summary>
              <div className="theme-options account-options">
                <Link to="/bus-routes/user-profile">User Profile</Link>
                <Link to="/bus-routes/settings">Settings</Link>
                <Link to="/bus-routes/help-feedback">Help &amp; Feedback</Link>
              </div>
            </details>
          </div>
        </div>

        <nav>
          <Link to="/bus-routes">Bus Routes</Link>
          <Link to="/favourite-routes">Favourite Bus Routes</Link>
        </nav>
      </header>

      <main>
        {theme !== 'default' && (
          <div className="doomsday-wordmark" aria-hidden="true">
            <span className="doomsday-wordmark-title">
              {sideWordmarks[theme].icon}
            </span>

            <div className="doomsday-wordmark-letters">
              {sideWordmarks[theme].words.map((word) => (
                <div className="side-wordmark-word" key={word}>
                  {Array.from(word, (letter, index) => (
                    <span key={index}>{letter}</span>
                  ))}
                </div>
              ))}
            </div>

            {theme === 'love' && (
              <>
                <span className="side-wordmark-hearts side-wordmark-hearts-left">
                  ♥ ♡ ♥ ♡ ♥
                </span>
                <span className="side-wordmark-hearts side-wordmark-hearts-right">
                  ♡ ♥ ♡ ♥ ♡
                </span>
              </>
            )}
          </div>
        )}

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
                selectedRoute={selectedRoute}
                setSelectedRoute={setSelectedRoute}
              />
            }
          />

          <Route path="/bus-routes/user-profile" element={<UserProfile />} />
          <Route path="/bus-routes/settings" element={<Settings />} />
          <Route path="/bus-routes/help-feedback" element={<HelpFeedback />} />
        </Routes>
      </main>

      <footer>
        <p>PeGGo - Group 08</p>
      </footer>
    </div>
  )
}

export default App