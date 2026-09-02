import { useState } from 'react'
import { playables } from '../data/playables'
import { openPlayableDirectly, shouldOpenPlayableDirectly } from '../playableLaunch'
import s from '../App.module.css'

export function Showreel() {
  const [open, setOpen] = useState(false)
  const item = playables[1]

  const launch = () => {
    if (shouldOpenPlayableDirectly()) {
      openPlayableDirectly(item.file)
      return
    }
    setOpen(true)
  }

  return <div className={s.showreel}>
    <div className={s.showreelBackdrop} style={{ backgroundImage: `url(${item.preview})` }} />
    <div className={s.showreelPhones}>{playables.slice(0, 5).map((playable, index) => <img src={playable.preview} alt="" key={playable.id} style={{ '--i': index } as React.CSSProperties} />)}</div>
    <button className={s.playButton} onClick={launch} aria-label="Play showreel">▶</button>
    {open && <div className={s.modal} role="dialog" aria-modal="true" aria-label={`${item.title} demo`}>
      <button className={s.modalClose} onClick={() => setOpen(false)} aria-label="Close demo">×</button>
      <iframe src={item.file} title={`${item.title} playable`} allow="autoplay; fullscreen" />
    </div>}
  </div>
}
