import { assetUrl } from '../assetUrl'
import s from '../App.module.css'
import bridgeLight from '../../../../exports/im3.png'
import sweepLight from '../../../../exports/im4.png'

export type GlowAsset = 'lenses-a' | 'lenses-b' | 'bridge' | 'sweep'

const sources: Record<GlowAsset, string> = {
  'lenses-a': 'ambient-im1.png',
  'lenses-b': 'ambient-im2.png',
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
    <img src={asset.startsWith('lenses-') ? assetUrl(`assets/design/${sources[asset]}`) : sources[asset]} alt="" />
  </span>
}
