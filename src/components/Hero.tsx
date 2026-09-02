import { Logo } from './Logo'
import { assetUrl } from '../assetUrl'
import s from '../App.module.css'

const cards = ['hero-baby.png', 'hero-chat.png', 'hero-game.png', 'hero-runner.png', 'hero-angry-birds.png', 'hero-princess.png', 'hero-baby.png', 'hero-chat.png'].map((name) => assetUrl(`assets/design/${name}`))

export function Hero() {
  const loop = [...cards, ...cards]
  return <section className={`${s.hero} ${s.glowTop}`} id="top"><div className={s.heroCopy}><h1><span>Ad</span>Quantum</h1><p>We make creatives for top publishers<br />all over the world</p></div><div className={s.heroRail}><div className={s.heroTrack}>{loop.map((src, i) => <img src={src} alt="" key={`${src}-${i}`} />)}</div></div><a className={s.gradientButton} href="https://www.adquantum.com/" target="_blank" rel="noreferrer">adquantum.design</a><span className={s.heroLogoMobile}><Logo /></span></section>
}
