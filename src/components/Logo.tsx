import s from '../App.module.css'

export function Logo({ compact = false }: { compact?: boolean }) {
  return <span className={`${s.logo} ${compact ? s.logoCompact : ''}`} aria-label="AQDesign"><span className={s.logoLetters}><b>A</b><b>Q</b><b>D</b></span><span className={s.logoWord}>esign</span></span>
}
