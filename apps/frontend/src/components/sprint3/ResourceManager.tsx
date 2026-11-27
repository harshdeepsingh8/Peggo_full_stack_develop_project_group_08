import type { FormEvent } from 'react'
import type { ResourceKind } from '../../types/transit'
import { useTransitRecords } from '../../hooks/useTransitRecords'
import { useRecordForm } from '../../hooks/useRecordForm'

/**
 * Renders CRUD forms and lists for routes or favourites.
 * useRecordForm manages input, editing and feedback state.
 * useTransitRecords invokes the service and resource repository.
 * Business validation and storage stay outside this component.
 */
export default function ResourceManager({
  kind,
  title,
}: {
  kind: ResourceKind
  title: string
}) {
  const { records, create, update, remove } = useTransitRecords(kind)
  const form = useRecordForm()

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      if (form.editingId === null) {
        create(form.value)
      } else {
        update(form.editingId, form.value)
      }

      form.reset()
      form.setMessage('Saved successfully.')
    } catch (error) {
      form.setMessage(
        error instanceof Error ? error.message : 'Unable to save.',
      )
    }
  }

  function deleteRecord(id: number) {
    try {
      remove(id)

      if (form.editingId === id) {
        form.reset()
      }

      form.setMessage('Removed successfully.')
    } catch (error) {
      form.setMessage(
        error instanceof Error ? error.message : 'Unable to remove.',
      )
    }
  }

  return (
    <section className="sprint-card">
      <h2>{title}</h2>

      <form onSubmit={submit}>
        <label htmlFor={`${kind}-name`}>Route name</label>

        <input
          id={`${kind}-name`}
          value={form.value}
          onChange={event => form.setValue(event.target.value)}
        />

        <button type="submit">
          {form.editingId === null ? 'Add' : 'Save changes'}
        </button>

        {form.editingId !== null && (
          <button type="button" onClick={form.reset}>
            Cancel
          </button>
        )}
      </form>

      <p role="status">{form.message}</p>

      {records.length === 0 && <p>No records yet.</p>}

      <ul>
        {records.map(record => (
          <li key={record.id}>
            <span>{record.name}</span>

            <div>
              <button
                type="button"
                onClick={() => form.startEdit(record.id, record.name)}
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => deleteRecord(record.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}