import { Logo } from './Logo'
import { GlowAccent } from './GlowAccent'
import { assetUrl } from '../assetUrl'
import s from '../App.module.css'

const stats = [['10+', 'years of experience\nin performance marketing'], ['100+', 'employees'], ['24+', 'countries'], ['10K+', 'creators\nworldwide'], ['100+', 'campaigns']]

export function About() {
  return <section className={s.about}><GlowAccent asset="sweep" className={s.aboutGlowAsset} parallax={false} /><div className={s.aboutInner}><div className={s.aboutCopy}><Logo /><p>is a proprietary creative production studio, created by <span>AdQuantum</span> to maximize your ROI with standout creatives.</p></div><div className={s.stats}>{stats.map(([number, text]) => <div className={s.stat} key={`${number}-${text}`}><strong>{number}</strong><span>{text}</span></div>)}<div className={`${s.stat} ${s.tiktok}`}><img src={assetUrl('assets/figma/tiktok.svg')} alt="TikTok" /><span>years of experience<br />in performance marketing</span></div></div></div></section>
}
