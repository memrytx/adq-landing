import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import s from '../App.module.css'

const links = [['Gaming', 'gaming'], ['Playable Ads', 'playable-ads'], ['Non-Gaming', 'non-gaming']]

export function Header() {
  const [open, setOpen] = useState(false)
  useEffect(() => { document.body.classList.toggle('menu-open', open); return () => document.body.classList.remove('menu-open') }, [open])
  return <header className={s.header}><div className={s.headerInner}><a href="#top" aria-label="AQDesign home"><Logo compact /></a><nav className={`${s.nav} ${open ? s.navOpen : ''}`} aria-label="Main navigation"><div className={s.mobileNavHead}><Logo compact /><button onClick={() => setOpen(false)} aria-label="Close menu">×</button></div>{links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}</nav><button className={s.menuButton} onClick={() => setOpen(true)} aria-label="Open menu"><span /><span /><span /></button></div></header>
}
