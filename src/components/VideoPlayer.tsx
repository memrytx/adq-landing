import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import s from '../App.module.css'

function toEmbedUrl(url: string) {
  try {
    const parsed = new URL(url)
    const driveMatch = parsed.pathname.match(/\/file\/d\/([^/]+)/)

    if (driveMatch) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`

    if (parsed.hostname.includes('youtube.com')) {
      const id = parsed.searchParams.get('v')
      if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
    }

    if (parsed.hostname === 'youtu.be') {
      const id = parsed.pathname.split('/').filter(Boolean)[0]
      if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
    }
  } catch {
    return url
  }

  return url
}

function VideoOverlay({ src, label, portrait, onClose }: { src: string; label: string; portrait: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.current?.showModal()
    return () => { document.body.style.overflow = previousOverflow }
  }, [])

  return createPortal(<dialog ref={dialog} className={s.videoOverlayDialog} data-portrait={portrait} aria-label={label} onClose={onClose}
    onClick={(event) => {
      if (event.target !== event.currentTarget) return
      const box = event.currentTarget.getBoundingClientRect()
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) onClose()
    }}>
    <button className={s.videoOverlayClose} type="button" onClick={onClose} aria-label="Close video" autoFocus>×</button>
    <iframe src={src} title={label} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
  </dialog>, document.body)
}

export function VideoButton({ url, label = 'Watch video' }: { url: string; label?: string }) {
  const [open, setOpen] = useState(false)
  const [portrait, setPortrait] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const embedUrl = useMemo(() => toEmbedUrl(url), [url])
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
    <button ref={trigger} className={s.playButton} type="button" onClick={show} aria-label={label}>▶</button>
    {open && <VideoOverlay src={embedUrl} label={label} portrait={portrait} onClose={close} />}
  </>
}
