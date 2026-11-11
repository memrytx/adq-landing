import s from '../App.module.css'
import aqDesignLogo from '../assets/logo_AQDesign.svg'

export function Logo({ compact = false }: { compact?: boolean }) {
  return <span className={`${s.logo} ${compact ? s.logoCompact : ''}`}><img src={aqDesignLogo} alt="AQDesign" /></span>
}
