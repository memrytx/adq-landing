import s from '../App.module.css'
import { GlowAccent } from './GlowAccent'

// All three audience sections use the same publisher strip in the source file.
const publisherLogos = Object.entries(import.meta.glob('../assets/figma-logo-*.svg', {
  eager: true, query: '?url', import: 'default',
})).sort(([a], [b]) => a.localeCompare(b)).map(([, url]) => url as string)

export function LogoRail({ networks = false }: { networks?: boolean }) {
  return <div className={s.logoRail} aria-hidden="true"><div className={`${s.logoTrack} ${networks ? s.logoTrackReverse : ''}`}>{Array.from({ length: 4 }, (_, group) => <div className={s.logoGroup} key={group}>{publisherLogos.map((src) => <img src={src} alt="" key={`${group}-${src}`} />)}</div>)}</div></div>
}

export function AudienceBanner({ type }: { type: 'gaming' | 'playable' | 'non-gaming' }) {
  return <section className={`${s.audienceBanner} ${s[`audience_${type}`] ?? ''}`}>
    <GlowAccent asset="bridge" className={s.audienceTitleGlow} parallax={false} />
    <div className={s.audienceGlowLayer} aria-hidden="true">
      <GlowAccent asset="lenses-a" className={s.audienceGlowLeft} />
      <GlowAccent asset="lenses-b" className={s.audienceGlowRight} reverse />
    </div>
    <h2>{type === 'gaming' ? <><small>For</small> Gaming<br />Companies</> : type === 'playable' ? <>Playable Ads</> : <><small>For</small> Non-Gaming<br />Companies</>}</h2><LogoRail networks={type === 'playable'} />
  </section>
}
