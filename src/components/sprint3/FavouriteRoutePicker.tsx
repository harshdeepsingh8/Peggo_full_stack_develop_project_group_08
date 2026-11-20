import type { FormEvent } from 'react'
import { useTransitRecords } from '../../hooks/useTransitRecords'
import { useRecordForm } from '../../hooks/useRecordForm'
import { transitService } from '../../services/transitService'

/**
 * Reads shared routes through useTransitRecords.
 * Reuses useRecordForm for dropdown and feedback presentation.
 * The service validates route existence and creates the favourite.
 * No repository calls or business rules are implemented here.
 */
export default function FavouriteRoutePicker() {
  const { records } = useTransitRecords('routes')
  const form = useRecordForm()

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      transitService.addRouteToFavourites(Number(form.value))
      form.reset()
      form.setMessage('Route added to favourites.')
    } catch (error) {
      form.setMessage(
        error instanceof Error ? error.message : 'Unable to save.',
      )
    }
  }

  return (
    <section className="sprint-card">
      <h2>Save an available route</h2>

      <form onSubmit={submit}>
        <label htmlFor="available-route">Choose a route</label>

        <select
          id="available-route"
          value={form.value}
          onChange={event => form.setValue(event.target.value)}
        >
          <option value="">Select a route</option>

          {records.map(record => (
            <option key={record.id} value={record.id}>
              {record.name}
            </option>
          ))}
        </select>

        <button type="submit">Add Favourite</button>
      </form>

      <p role="status">{form.message}</p>
    </section>
  )
}