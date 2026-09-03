import { assetUrl } from '../assetUrl'
import s from '../App.module.css'

export type GlowAsset = 'lenses-a' | 'lenses-b' | 'bridge' | 'sweep'

const sources: Record<GlowAsset, string> = {
  'lenses-a': 'ambient-im1.png',
  'lenses-b': 'ambient-im2.png',
  bridge: 'ambient-im3.png',
  sweep: 'ambient-im4.png',
}

const assetClasses: Record<GlowAsset, string> = {
  'lenses-a': '',
  'lenses-b': '',
  bridge: s.glowBridge,
  sweep: s.glowSweep,
}

export function GlowAccent({ asset, className = '', reverse = false }: {
  asset: GlowAsset
  className?: string
  reverse?: boolean
}) {
  return <span className={`${s.glowAccent} ${assetClasses[asset]} ${reverse ? s.glowAccentReverse : ''} ${className}`} aria-hidden="true">
    <img src={assetUrl(`assets/design/${sources[asset]}`)} alt="" />
  </span>
}
