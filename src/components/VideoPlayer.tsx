import { useEffect, useMemo, useState } from 'react'
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

export function VideoButton({ url, label = 'Watch video' }: { url: string; label?: string }) {
  const [open, setOpen] = useState(false)
  const embedUrl = useMemo(() => toEmbedUrl(url), [url])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  return <>
    <button className={s.playButton} type="button" onClick={() => setOpen(true)} aria-label={label}>▶</button>
    {open && <div className={s.videoModal} role="dialog" aria-modal="true" aria-label={label} onClick={() => setOpen(false)}>
      <div className={s.videoDialog} onClick={(event) => event.stopPropagation()}>
        <button className={s.videoClose} type="button" onClick={() => setOpen(false)} aria-label="Close video">×</button>
        <iframe className={s.videoFrame} src={embedUrl} title={label} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
      </div>
    </div>}
  </>
}
