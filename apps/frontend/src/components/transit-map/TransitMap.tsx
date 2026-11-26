import React, { useEffect } from 'react'
import type { LatLngTuple } from 'leaflet'
import { MapContainer, Polyline, TileLayer, useMap } from 'react-leaflet'
import routePaths from '../../data/winnipegRoutePaths.json'
import 'leaflet/dist/leaflet.css'

const winnipegCenter: LatLngTuple = [49.8951, -97.1384]
const overviewZoom = 11

// The Python importer outputs each coordinate as [latitude, longitude].
const pathsByRoute: Partial<Record<string, LatLngTuple[][]>> = Object.fromEntries(
  Object.entries(routePaths).map(([routeId, branches]) => [
    routeId,
    branches.map((branch) =>
      branch.map(([latitude, longitude]): LatLngTuple => [latitude, longitude]),
    ),
  ]),
)

const routeColors: Partial<Record<string, string>> = {
  BLUE: '#175cd3',
  D16: '#a13273',
  '22': '#a64716',
}

function RouteViewport({ points }: { points: LatLngTuple[][] | undefined }) {
  const map = useMap()

  useEffect(() => {
    if (points?.length) {
      map.fitBounds(points.flat(), { padding: [28, 28], maxZoom: 14 })
    } else {
      map.setView(winnipegCenter, overviewZoom)
    }
  }, [map, points])

  return null
}

export default function TransitMap({
  selectedRoute,
}: {
  selectedRoute: string
}) {
  // Handles both "Route BLUE" and "Route BLUE - St Norbert/Uom".
  const routeId = /^Route\s+([A-Z0-9]+)\b/i.exec(selectedRoute)?.[1]?.toUpperCase()
  const points = routeId ? pathsByRoute[routeId] : undefined
  const color = (routeId ? routeColors[routeId] : undefined) ?? '#d72b5a'

  let description = 'Choose a bus route to see its scheduled path.'

  if (routeId) {
    description = points?.length
      ? `Showing scheduled paths for Route ${routeId}.`
      : `No scheduled path was found for Route ${routeId} in the imported feed.`
  }

  return React.createElement(
    'section',
    { className: 'transit-map', 'aria-labelledby': 'transit-map-heading' },
    React.createElement('h2', { id: 'transit-map-heading' }, 'Winnipeg Route Map'),
    React.createElement('p', { 'aria-live': 'polite' }, description),
    React.createElement(
      MapContainer,
      {
        className: 'transit-map-canvas',
        style: { width: '100%', height: '400px' },
        center: winnipegCenter,
        zoom: overviewZoom,
        scrollWheelZoom: false,
      },
      React.createElement(TileLayer, {
        className: 'transit-basemap',
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }),
      React.createElement(RouteViewport, { points }),
      points?.length
        ? React.createElement(Polyline, {
            key: routeId,
            positions: points,
            pathOptions: { color, weight: 6, opacity: 0.9 },
          })
        : null,
    ),
  )
}