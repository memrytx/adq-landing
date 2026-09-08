import { useEffect, useRef, useState } from 'react'
import s from '../App.module.css'

const clock = (seconds: number) => {
  const value = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, '0')}`
}

export function LocalVideo({ src, label, onOrientation }: { src: string; label: string; onOrientation: (portrait: boolean) => void }) {
  const video = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [error, setError] = useState(false)

  useEffect(() => {
    const media = video.current
    // React StrictMode replays effects; restore a source cleared by cleanup.
    if (media && !media.getAttribute('src')) media.src = src
    return () => { media?.pause(); media?.removeAttribute('src'); media?.load() }
  }, [src])

  const togglePlay = () => {
    const media = video.current
    if (!media) return
    if (media.paused) void media.play().catch(() => setPlaying(false))
    else media.pause()
  }
  const fullscreen = () => {
    const media = video.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null
    const dialog = media?.closest('dialog')
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {})
    else if (dialog?.requestFullscreen) void dialog.requestFullscreen().catch(() => media?.webkitEnterFullscreen?.())
    else media?.webkitEnterFullscreen?.()
  }

  return <div className={s.localVideo}>
    <video ref={video} src={src} playsInline autoPlay preload="metadata" aria-label={label}
      onClick={togglePlay} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
      onEnded={() => setPlaying(false)} onTimeUpdate={() => setTime(video.current?.currentTime ?? 0)}
      onVolumeChange={() => setMuted(video.current?.muted ?? false)}
      onLoadedMetadata={() => {
        const media = video.current!
        setDuration(media.duration)
        onOrientation(media.videoHeight > media.videoWidth)
      }} onError={() => setError(true)} />
    {error && <p className={s.videoError} role="alert">Video could not be loaded. <a href={src} download>Download video</a></p>}
    <div className={s.videoControls} role="group" aria-label="Video controls">
      <input className={s.videoSeek} type="range" min="0" max={duration || 0} step="0.1" value={Math.min(time, duration)}
        disabled={!duration} aria-label="Seek video" aria-valuetext={`${clock(time)} of ${clock(duration)}`}
        onChange={(event) => { if (video.current) video.current.currentTime = Number(event.target.value) }} />
      <button type="button" aria-label={playing ? 'Pause video' : 'Play video'} onClick={togglePlay}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d={playing ? 'M6 4h4v16H6zM14 4h4v16h-4z' : 'm7 3 15 9-15 9z'} fill="currentColor" /></svg>
      </button>
      <span className={s.videoTime}>{clock(time)} / {clock(duration)}</span>
      <button type="button" aria-label={muted ? 'Unmute video' : 'Mute video'} onClick={() => { if (video.current) video.current.muted = !video.current.muted }}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9h4l5-4v14l-5-4H3z" fill="currentColor" /><path d={muted ? 'm16 8 6 8m0-8-6 8' : 'M16 8q5 4 0 8M19 5q8 7 0 14'} fill="none" stroke="currentColor" strokeWidth="2" /></svg>
      </button>
      <button type="button" aria-label="Toggle fullscreen" onClick={fullscreen}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
      </button>
    </div>
  </div>
}
