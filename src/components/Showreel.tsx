import { useState } from 'react'
import { playables } from '../data/playables'
import s from '../App.module.css'
export function Showreel() {
  const [open,setOpen] = useState(false); const item = playables[1]
  return <div className={s.showreel}><div className={s.showreelBackdrop} style={{backgroundImage:`url(${item.preview})`}}/><div className={s.showreelPhones}>{playables.slice(0,5).map((p,i) => <img src={p.preview} alt="" key={p.id} style={{'--i':i} as React.CSSProperties}/>)}</div><button className={s.playButton} onClick={() => setOpen(true)} aria-label="Play showreel">▶</button>{open && <div className={s.modal} role="dialog" aria-modal="true" aria-label={`${item.title} demo`}><button className={s.modalClose} onClick={() => setOpen(false)} aria-label="Close demo">×</button><iframe src={item.file} title={`${item.title} playable`} allow="autoplay; fullscreen"/></div>}</div>
}
