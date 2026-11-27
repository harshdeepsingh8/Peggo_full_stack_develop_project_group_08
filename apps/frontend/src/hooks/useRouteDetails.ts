import { useEffect, useState } from 'react'
import { getRouteDetails } from '../services/routeService'
import type { RouteDetails } from '../services/routeService'

export function useRouteDetails(routeName: string) {
  const [details, setDetails] = useState<RouteDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    setLoading(true)
    setDetails(null)
    setError('')

    async function loadDetails() {
      try {
        const result = await getRouteDetails(routeName)

        if (!cancelled) {
          setDetails(result)
        }
      } catch (error: unknown) {
        if (!cancelled) {
          setError(
            error instanceof Error
              ? error.message
              : 'Unable to load route details.',
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void loadDetails()

    return () => {
      cancelled = true
    }
  }, [routeName])

  return { details, loading, error }
}