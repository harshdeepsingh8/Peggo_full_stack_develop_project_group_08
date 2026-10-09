import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useRouteDetails } from '../../hooks/useRouteDetails'

type RouteDetailsModalProps = {
  routeName: string
  onClose: () => void
}

function RouteDetailsModal({
  routeName,
  onClose,
}: RouteDetailsModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { details, loading, error } = useRouteDetails(routeName)

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) return

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    const previousOverflow = document.body.style.overflow

    dialog.showModal()
    document.body.style.overflow = 'hidden'

    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow

      if (previousFocus?.isConnected) {
        previousFocus.focus()
      }
    }
  }, [])

  return createPortal(
    <dialog
      ref={dialogRef}
      className="route-modal"
      aria-labelledby="route-modal-title"
      aria-describedby="route-modal-note"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return

        const bounds = event.currentTarget.getBoundingClientRect()

        const clickedOutside =
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom

        if (clickedOutside) {
          onClose()
        }
      }}
    >
      <div className="route-modal-heading">
        <h2 id="route-modal-title">Route details</h2>

        <button
          type="button"
          className="route-modal-close"
          onClick={onClose}
          aria-label="Close route details"
          autoFocus
        >
          ×
        </button>
      </div>

      <p className="route-modal-name">{routeName}</p>

      <p id="route-modal-note" className="route-modal-note">
        Demo data only. Stops and times below are fictional examples,
        not live Winnipeg Transit information.
      </p>

      {loading && <p role="status">Loading route details…</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && details && (
        <dl className="route-detail-grid">
          <div>
            <dt>Stop number</dt>
            <dd>{details.stopNumber}</dd>
          </div>

          <div>
            <dt>Stop name</dt>
            <dd>{details.stopName}</dd>
          </div>

          <div>
            <dt>Scheduled arrival</dt>
            <dd>{details.scheduledTime}</dd>
          </div>

          <div>
            <dt>Estimated arrival</dt>
            <dd>{details.estimatedTime}</dd>
          </div>

          <div>
            <dt>Arrival status</dt>
            <dd>{details.status}</dd>
          </div>
        </dl>
      )}

      <button
        type="button"
        className="route-modal-done"
        onClick={onClose}
      >
        Close
      </button>
    </dialog>,
    document.body,
  )
}

export default RouteDetailsModal