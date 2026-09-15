import mobileBridge from '../assets/exported/mobile/im3.webp'
import mobileSweep from '../assets/exported/mobile/im4.webp'
import lensesA from '../assets/exported/im1.png'
import lensesB from '../assets/exported/im2.png'
import s from '../App.module.css'
import bridgeLight from '../assets/exported/im3.png'
import sweepLight from '../assets/exported/im4.png'

export type GlowAsset = 'lenses-a' | 'lenses-b' | 'bridge' | 'sweep'

const sources: Record<GlowAsset, string> = {
  'lenses-a': lensesA,
  'lenses-b': lensesB,
  bridge: bridgeLight,
  sweep: sweepLight,
}

const assetClasses: Record<GlowAsset, string> = {
  'lenses-a': '',
  'lenses-b': '',
  bridge: s.glowBridge,
  sweep: s.glowSweep,
}

export function GlowAccent({ asset, className = '', reverse = false, parallax = true }: {
  asset: GlowAsset
  className?: string
  reverse?: boolean
  parallax?: boolean
}) {
  return <span className={`${s.glowAccent} ${assetClasses[asset]} ${reverse ? s.glowAccentReverse : ''} ${parallax ? '' : s.glowAccentStatic} ${className}`} data-glow-asset={asset} aria-hidden="true">
    <picture>{(asset === 'bridge' || asset === 'sweep') && <source media="(max-width: 767px)" srcSet={asset === 'bridge' ? mobileBridge : mobileSweep} />}<img src={sources[asset]} alt="" loading="lazy" decoding="async" /></picture>
  </span>
}
