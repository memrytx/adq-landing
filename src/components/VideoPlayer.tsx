import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { LocalVideo } from './LocalVideo'
import s from '../App.module.css'

function VideoOverlay({ src, label, portrait, onClose }: { src: string; label: string; portrait: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [isPortrait, setPortrait] = useState(portrait)
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.current?.showModal()
    return () => { document.body.style.overflow = previousOverflow }
  }, [])

  return createPortal(<dialog ref={dialog} className={s.videoOverlayDialog} data-portrait={isPortrait} aria-label={label} onClose={onClose}
    onClick={(event) => {
      if (event.target !== event.currentTarget) return
      const box = event.currentTarget.getBoundingClientRect()
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) onClose()
    }}>
    <button className={s.videoOverlayClose} type="button" onClick={onClose} aria-label="Close video" autoFocus>×</button>
    <LocalVideo src={src} label={label} onOrientation={setPortrait} />
  </dialog>, document.body)
}

export function VideoButton({ url, label = 'Watch video' }: { url: string; label?: string }) {
  const [open, setOpen] = useState(false)
  const [portrait, setPortrait] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const close = () => {
    setOpen(false)
    requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }))
  }
  const show = () => {
    const box = trigger.current?.parentElement?.getBoundingClientRect()
    const poster = trigger.current?.parentElement?.querySelector('img')
    setPortrait(poster?.naturalWidth ? poster.naturalHeight > poster.naturalWidth : !!box && box.height > box.width)
    setOpen(true)
  }

  return <>
    <button ref={trigger} className={s.playButton} type="button" onClick={show} aria-label={label}>
      <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="5" /><path d="M39 28 73 50 39 72Z" fill="currentColor" /></svg>
    </button>
    {open && <VideoOverlay src={url} label={label} portrait={portrait} onClose={close} />}
  </>
}
