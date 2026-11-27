import { useCallback, useSyncExternalStore } from 'react'
import type { ResourceKind } from '../types/transit'
import { transitService } from '../services/transitService'

/**
 * Adapts service data to React rendering.
 * Validation and storage remain outside the hook.
 *
 * @returns records - current read-only resource snapshot.
 * @returns create - requests validated creation.
 * @returns update - requests a validated rename by ID.
 * @returns remove - requests deletion by ID.
 */
export function useTransitRecords(kind: ResourceKind) {
  const subscribe = useCallback(
    (listener: () => void) => transitService.subscribe(kind, listener),
    [kind],
  )

  const getSnapshot = useCallback(
    () => transitService.getAll(kind),
    [kind],
  )

  const records = useSyncExternalStore(subscribe, getSnapshot)

  return {
    records,
    create: (name: string) => transitService.create(kind, name),
    update: (id: number, name: string) =>
      transitService.update(kind, id, name),
    remove: (id: number) => transitService.remove(kind, id),
  }
}