import lensesA from '../../../../exports/im1.png'
import lensesB from '../../../../exports/im2.png'
import s from '../App.module.css'
import bridgeLight from '../../../../exports/im3.png'
import sweepLight from '../../../../exports/im4.png'

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
  return <span className={`${s.glowAccent} ${assetClasses[asset]} ${reverse ? s.glowAccentReverse : ''} ${parallax ? '' : s.glowAccentStatic} ${className}`} aria-hidden="true">
    <img src={sources[asset]} alt="" />
  </span>
}
