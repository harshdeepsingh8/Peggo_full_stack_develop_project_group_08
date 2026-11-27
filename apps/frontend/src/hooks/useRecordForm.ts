import { useState } from 'react'

/**
 * Manages form presentation without validation or data access.
 *
 * @returns value - current input or dropdown value.
 * @returns setValue - updates the input or dropdown.
 * @returns editingId - edited record ID, or null when creating.
 * @returns message - feedback text displayed to the user.
 * @returns setMessage - changes feedback text.
 * @returns startEdit - fills the form for an existing record.
 * @returns reset - clears the input and exits edit mode.
 */
export function useRecordForm() {
  const [value, setValue] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [message, setMessage] = useState('')

  function startEdit(id: number, name: string) {
    setEditingId(id)
    setValue(name)
    setMessage('')
  }

  function reset() {
    setValue('')
    setEditingId(null)
  }

  return {
    value,
    setValue,
    editingId,
    message,
    setMessage,
    startEdit,
    reset,
  }
}