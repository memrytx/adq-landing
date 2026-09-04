import s from '../App.module.css'
import aqDesignLogo from '../../../../exports/title_1.png'

export function Logo({ compact = false }: { compact?: boolean }) {
  return <span className={`${s.logo} ${compact ? s.logoCompact : ''}`}><img src={aqDesignLogo} alt="AQDesign" /></span>
}
