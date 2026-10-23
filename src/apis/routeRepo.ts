export type RouteRecord = {
  routeName: string
  stopNumber: string
  stopName: string
  scheduledMinutes: number
  estimatedMinutes: number
}

// Sample data only: these are not actual transit stops or schedules.
const demoStops = [
  { stopNumber: 'DEMO-1001', stopName: 'Sample Downtown Stop' },
  { stopNumber: 'DEMO-1002', stopName: 'Sample Shopping Centre Stop' },
  { stopNumber: 'DEMO-1003', stopName: 'Sample Campus Stop' },
]

export async function fetchRouteDetails(
  routeName: string,
): Promise<RouteRecord> {
  // Both "Route BLUE" and "Route BLUE - St Norbert/Uom"
  // receive the same demo details.
  const routeCode = routeName
    .replace(/^Route\s+/i, '')
    .split(' - ')[0]
    .trim()
    .toUpperCase()

  const seed = Array.from(routeCode).reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  )

  const stop = demoStops[seed % demoStops.length]!
  const scheduledMinutes = 9 * 60 + (seed % 60)
  const delayMinutes = [-2, 0, 5][seed % 3]!

  return {
    routeName,
    ...stop,
    scheduledMinutes,
    estimatedMinutes: scheduledMinutes + delayMinutes,
  }
}