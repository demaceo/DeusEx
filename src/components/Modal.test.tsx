import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { Modal } from './Modal'

function Harness() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open
      </button>
      {open ? (
        <Modal onClose={() => setOpen(false)} ariaLabel="Test modal">
          <p>Modal content</p>
        </Modal>
      ) : null}
    </>
  )
}

describe('Modal', () => {
  it('is not rendered until opened, then shows as a labeled dialog', () => {
    render(<Harness />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('dialog', { name: 'Test modal' })).toBeInTheDocument()
    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  it('closes on the close button', () => {
    render(<Harness />)
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes on Escape', () => {
    render(<Harness />)
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes on overlay click but not on a click inside the dialog', () => {
    const { container } = render(<Harness />)
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))

    fireEvent.click(screen.getByText('Modal content'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    fireEvent.click(container.querySelector('.modal-overlay')!)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('locks body scroll while open and restores it on close', () => {
    render(<Harness />)
    expect(document.body.style.overflow).toBe('')

    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(document.body.style.overflow).toBe('hidden')

    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(document.body.style.overflow).toBe('')
  })

  it('restores focus to the triggering element on close', () => {
    render(<Harness />)
    const trigger = screen.getByRole('button', { name: 'Open' })
    trigger.focus()
    fireEvent.click(trigger)
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(trigger).toHaveFocus()
  })

  it('closes on the Back gesture instead of leaving the page', () => {
    render(<Harness />)
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // An open dialog parks one throwaway entry on the stack so Back has
    // something to pop; popping it must close rather than navigate away.
    fireEvent.popState(window)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes on the bottom dismiss button', () => {
    render(<Harness />)
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))

    fireEvent.click(screen.getByRole('button', { name: 'Done' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes when the handle is dragged past the dismiss threshold', () => {
    const { container } = render(<Harness />)
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    const handle = container.querySelector('.sheet-handle')!

    fireEvent.pointerDown(handle, { clientY: 100, button: 0 })
    fireEvent.pointerMove(handle, { clientY: 260 })
    fireEvent.pointerUp(handle)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('settles back open when the drag is released short of the threshold', () => {
    const { container } = render(<Harness />)
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    const handle = container.querySelector('.sheet-handle')!

    fireEvent.pointerDown(handle, { clientY: 100, button: 0 })
    fireEvent.pointerMove(handle, { clientY: 140 })
    fireEvent.pointerUp(handle)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('ignores upward drag so the sheet never lifts off its anchor', () => {
    const { container } = render(<Harness />)
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    const handle = container.querySelector('.sheet-handle')!
    const dialog = screen.getByRole('dialog')

    fireEvent.pointerDown(handle, { clientY: 300, button: 0 })
    fireEvent.pointerMove(handle, { clientY: 40 })
    expect(dialog).not.toHaveAttribute('style', expect.stringContaining('translateY'))

    fireEvent.pointerUp(handle)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
