import { fetchRouteDetails } from '../apis/routeRepo'

export type RouteDetails = {
  routeName: string
  stopNumber: string
  stopName: string
  scheduledTime: string
  estimatedTime: string
  status: string
}

function formatTime(totalMinutes: number): string {
  const minutesInDay = ((totalMinutes % 1440) + 1440) % 1440
  const hours = Math.floor(minutesInDay / 60)
  const minutes = minutesInDay % 60
  const period = hours >= 12 ? 'PM' : 'AM'

  return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${period}`
}

export async function getRouteDetails(
  routeName: string,
): Promise<RouteDetails> {
  if (!routeName.trim() || routeName === 'No route selected') {
    throw new Error('Please select a valid route.')
  }

  const record = await fetchRouteDetails(routeName)
  const difference = record.estimatedMinutes - record.scheduledMinutes

  // Demo business rule: only an exact match counts as on time.
  const status =
    difference > 0
      ? `${difference} minutes late`
      : difference < 0
        ? `${Math.abs(difference)} minutes early`
        : 'On time'

  return {
    routeName: record.routeName,
    stopNumber: record.stopNumber,
    stopName: record.stopName,
    scheduledTime: formatTime(record.scheduledMinutes),
    estimatedTime: formatTime(record.estimatedMinutes),
    status,
  }
}