import { Logo } from './Logo'
import { GlowAccent } from './GlowAccent'
import { useHeroCarousel } from './useHeroCarousel'
import { assetUrl } from '../assetUrl'
import s from '../App.module.css'
import adQuantumLogo from '../assets/exported/title_2.png'

const cards = ['hero-baby.png', 'hero-chat.png', 'hero-game.png', 'hero-runner.png', 'hero-angry-birds.png', 'hero-princess.png'].map((name) => assetUrl(`assets/design/${name}`))

export function Hero() {
  const railRef = useHeroCarousel(cards.length)
  const loop = [...cards, ...cards]
  return <section className={s.hero} id="top">
    <GlowAccent asset="bridge" className={s.heroGlowAsset} parallax={false} />
    <div className={s.heroCopy}>
      <h1><img className={s.heroTitleLogo} src={adQuantumLogo} alt="AdQuantum" /></h1>
      <p>We make creatives for top publishers<br />all over the world</p>
    </div>
    <div ref={railRef} className={s.heroRail} role="region" aria-label="Game creative previews" tabIndex={0}>
      <div className={s.heroTrack}>
        {loop.map((src, i) => <img src={src} alt="" draggable={false} key={`${src}-${i}`} />)}
      </div>
    </div>
    <a className={s.gradientButton} href="https://www.adquantum.com/" target="_blank" rel="noreferrer">
      <span className={s.heroCtaDesktop}>adquantum.design</span>
      <span className={s.heroCtaMobile}>visit our site</span>
    </a>
    <span className={s.heroLogoMobile}><Logo /></span>
  </section>
}
