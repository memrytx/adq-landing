import type { CSSProperties } from 'react'
import logoSizes from '../assets/exported/company-logo-sizes.json'
import s from '../App.module.css'
import { GlowAccent } from './GlowAccent'

type CompanyLogo = { src: string; width: number; height: number }

type AudienceType = 'gaming' | 'playable' | 'non-gaming'

function logoUrls(assets: Record<string, unknown>) {
  return Object.entries(assets).sort(([a], [b]) => a.localeCompare(b)).map(([path, url]) => {
    const key = path.split('/exported/')[1] as keyof typeof logoSizes
    const [width, height] = logoSizes[key]
    return { src: url as string, width, height }
  })
}

const logosByAudience: Record<AudienceType, CompanyLogo[]> = {
  gaming: logoUrls(import.meta.glob('../assets/exported/ForGamingCompanies/*.png', {
    eager: true, query: '?url', import: 'default',
  })),
  playable: logoUrls(import.meta.glob('../assets/exported/PlayableAds/*.png', {
    eager: true, query: '?url', import: 'default',
  })),
  'non-gaming': logoUrls(import.meta.glob('../assets/exported/ForNoneGamingApps/*.png', {
    eager: true, query: '?url', import: 'default',
  })),
}

function LogoTrack({ logos, reverse = false }: { logos: CompanyLogo[]; reverse?: boolean }) {
  return <div className={`${s.logoTrack} ${reverse ? s.logoTrackReverse : ''}`}>{Array.from({ length: 4 }, (_, group) => <div className={s.logoGroup} key={group}>{logos.map(({ src, width, height }) => <img src={src} alt="" key={`${group}-${src}`} style={{ '--company-logo-width': `${width}px`, '--company-logo-height': `${height}px` } as CSSProperties} />)}</div>)}</div>
}

function LogoRail({ type }: { type: AudienceType }) {
  const logos = logosByAudience[type]
  return <div className={s.logoRail} aria-hidden="true">
    <div className={s.logoDesktop}><LogoTrack logos={logos} reverse={type === 'playable'} /></div>
    <div className={s.logoMobile}>
      <LogoTrack logos={logos.filter((_, i) => i % 2 === 0)} />
      <LogoTrack logos={logos.filter((_, i) => i % 2 === 1)} reverse />
    </div>
  </div>
}

export function AudienceBanner({ type }: { type: AudienceType }) {
  return <section className={`${s.audienceBanner} ${s[`audience_${type}`] ?? ''}`}>
    <GlowAccent asset="bridge" className={s.audienceTitleGlow} parallax={false} />
    <div className={s.audienceGlowLayer} aria-hidden="true">
      <GlowAccent asset="lenses-a" className={s.audienceGlowLeft} />
      <GlowAccent asset="lenses-b" className={s.audienceGlowRight} reverse />
    </div>
    <h2>{type === 'gaming' ? <><small>For</small> Gaming<br />Companies</> : type === 'playable' ? <>Playable Ads</> : <><small>For</small> Non-Gaming<br />Companies</>}</h2><LogoRail type={type} />
  </section>
}
