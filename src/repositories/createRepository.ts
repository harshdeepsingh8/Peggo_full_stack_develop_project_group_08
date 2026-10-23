import type { TransitRecord } from '../types/transit'

/**
 * Owns in-memory storage, IDs and change notifications.
 * Contains no business validation or React presentation state.
 */
export function createRepository<T extends TransitRecord>(seed: T[]) {
  let records: readonly T[] = seed.map(record => ({ ...record }))
  let nextId = Math.max(0, ...records.map(record => record.id)) + 1

  const listeners = new Set<() => void>()

  function publish(next: readonly T[]) {
    records = next
    listeners.forEach(listener => listener())
  }

  return {
    getAll: (): readonly T[] => records,

    getById: (id: number): T | undefined =>
      records.find(record => record.id === id),

    create(name: string): T {
      const record = { id: nextId++, name } as T
      publish([...records, record])
      return record
    },

    update(id: number, name: string): boolean {
      if (!records.some(record => record.id === id)) {
        return false
      }

      const updated: T[] = records.map(record => {
        if (record.id !== id) return record

        const replacement: T = { ...record, name }
        return replacement
      })

      publish(updated)
      return true
    },

    delete(id: number): boolean {
      if (!records.some(record => record.id === id)) {
        return false
      }

      publish(records.filter(record => record.id !== id))
      return true
    },

    subscribe(listener: () => void) {
      listeners.add(listener)

      return () => {
        listeners.delete(listener)
      }
    },
  }
}