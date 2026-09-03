import { Logo } from './Logo'
import { GlowAccent } from './GlowAccent'
import { assetUrl } from '../assetUrl'
import s from '../App.module.css'

const cards = ['hero-baby.png', 'hero-chat.png', 'hero-game.png', 'hero-runner.png', 'hero-angry-birds.png', 'hero-princess.png', 'hero-baby.png', 'hero-chat.png'].map((name) => assetUrl(`assets/design/${name}`))

export function Hero() {
  const loop = [...cards, ...cards]
  return <section className={`${s.hero} ${s.glowTop}`} id="top"><GlowAccent asset="bridge" className={s.heroGlowAsset} /><div className={s.heroCopy}><h1><span>Ad</span>Quantum</h1><p>We make creatives for top publishers<br />all over the world</p></div><div className={s.heroRail}><div className={s.heroTrack}>{loop.map((src, i) => <img src={src} alt="" key={`${src}-${i}`} />)}</div></div><a className={s.gradientButton} href="https://www.adquantum.com/" target="_blank" rel="noreferrer"><span className={s.heroCtaDesktop}>adquantum.design</span><span className={s.heroCtaMobile}>visit our site</span></a><span className={s.heroLogoMobile}><Logo /></span></section>
}
