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

function MobileVideo({ src, label, portrait, onClose }: { src: string; label: string; portrait: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.current?.showModal()
    return () => { document.body.style.overflow = previousOverflow }
  }, [])

  return createPortal(<dialog ref={dialog} className={s.mobileVideoDialog} data-portrait={portrait} aria-label={label} onClose={onClose}>
    <button className={s.mobileVideoClose} type="button" onClick={onClose} aria-label="Close video" autoFocus>×</button>
    <iframe src={src} title={label} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
  </dialog>, document.body)
}

export function VideoButton({ url, label = 'Watch video' }: { url: string; label?: string }) {
  const [open, setOpen] = useState(false)
  const [mobileViewer, setMobileViewer] = useState(false)
  const [portrait, setPortrait] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const embedUrl = useMemo(() => toEmbedUrl(url), [url])
  const close = () => {
    setOpen(false)
    requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }))
  }
  const show = () => {
    const box = trigger.current?.parentElement?.getBoundingClientRect()
    setPortrait(!!box && box.height > box.width)
    setMobileViewer(window.matchMedia('(max-width: 767px)').matches && embedUrl.startsWith('https://drive.google.com/'))
    setOpen(true)
  }

  return <>
    {!open && <button ref={trigger} className={s.playButton} type="button" onClick={show} aria-label={label}>▶</button>}
    {open && mobileViewer && <MobileVideo src={embedUrl} label={label} portrait={portrait} onClose={close} />}
    {open && !mobileViewer && <div className={s.inlineVideo} aria-label={label}>
      <iframe className={s.videoFrame} src={embedUrl} title={label} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
      <button className={s.videoClose} type="button" onClick={close} aria-label="Close video">×</button>
    </div>}
  </>
}
