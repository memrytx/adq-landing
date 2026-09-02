import s from '../App.module.css'
import { GlowAccent } from './GlowAccent'
import { assetUrl } from '../assetUrl'

const gamingLogos = ['logo-peak.png', 'logo-helio.png', 'logo-rovio.png', 'logo-cm.png', 'logo-playrix.png', 'logo-supercent.png', 'logo-gamegos.png']
const networkLogos = ['logo-applovin.png', 'logo-vungle.png', 'logo-moloco.png', 'logo-appreciate.png', 'logo-fyber.png', 'logo-supercent.png']

export function LogoRail({ networks = false }: { networks?: boolean }) {
  const names = networks ? networkLogos : gamingLogos
  return <div className={s.logoRail}><div className={`${s.logoTrack} ${networks ? s.logoTrackReverse : ''}`}>{Array.from({ length: 4 }, (_, group) => <div className={s.logoGroup} key={group}>{names.map((name) => <img src={assetUrl(`assets/design/${name}`)} alt="" key={`${group}-${name}`} />)}</div>)}</div></div>
}

export function AudienceBanner({ type }: { type: 'gaming' | 'playable' | 'non-gaming' }) {
  const id = type === 'playable' ? 'playable-ads' : type
  return <section className={`${s.audienceBanner} ${s[`audience_${type}`]}`} id={id}>
    <div className={s.audienceGlowLayer} aria-hidden="true">
      <GlowAccent asset="lenses-a" className={s.audienceGlowLeft} />
      <GlowAccent asset="lenses-b" className={s.audienceGlowRight} reverse />
    </div>
    <h2>{type === 'gaming' ? <><small>For</small> Gaming<br />Companies</> : type === 'playable' ? <>Playable Ads</> : <><small>For</small> Non-Gaming<br />Companies</>}</h2><LogoRail networks={type === 'playable'} />
  </section>
}
