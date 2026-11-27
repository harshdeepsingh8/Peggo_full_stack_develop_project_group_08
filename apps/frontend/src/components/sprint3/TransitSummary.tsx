import { useTransitRecords } from '../../hooks/useTransitRecords'

/**
 * Reuses useTransitRecords to display shared resource counts.
 * The hook calls the service, which reads the repositories.
 * Subscriptions update the counts after CRUD operations.
 */
export default function TransitSummary() {
  const routes = useTransitRecords('routes')
  const favourites = useTransitRecords('favourites')

  return (
    <aside className="sprint-summary" aria-label="Transit summary">
      Routes: {routes.records.length}
      {' | '}Favourites: {favourites.records.length}
    </aside>
  )
}