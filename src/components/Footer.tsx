import { Logo } from './Logo'
import s from '../App.module.css'

const briefForm = 'https://docs.google.com/forms/d/e/1FAIpQLSdYg-UXaKzZgiHlbRNLTvO6iCa06-CepMGOQ3uXXDjfm7hX_w/viewform'

export function Footer() {
  const year = new Date().getFullYear()

  return <footer className={s.footer}>
    <div className={s.footerInner}>
      <div className={s.footerBrand}>
        <Logo />
        <p>Creative production for gaming<br />and non-gaming companies.</p>
      </div>

      <nav className={s.footerNav} aria-label="Footer navigation">
        <a href="#gaming">Gaming</a>
        <a href="#playable-ads">Playable Ads</a>
        <a href="#non-gaming">Non-Gaming</a>
        <a href="#contact">How to start</a>
      </nav>

      <div className={s.footerAction}>
        <span>Have a project in mind?</span>
        <a href={briefForm} target="_blank" rel="noreferrer">Start a project</a>
      </div>
    </div>

    <div className={s.footerBottom}>
      <span>© {year} AQDesign. All rights reserved.</span>
      <div><a href="https://www.adquantum.com/" target="_blank" rel="noreferrer">AdQuantum</a><a href="#top">Back to top ↑</a></div>
    </div>
  </footer>
}
