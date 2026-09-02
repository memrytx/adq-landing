import { useEffect } from 'react'
import { About } from './components/About'
import { Closing } from './components/Closing'
import { Footer } from './components/Footer'
import { Gaming } from './components/Gaming'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { NonGaming } from './components/NonGaming'
import { PlayableAds } from './components/PlayableAds'
import s from './App.module.css'

export default function App() {
  useEffect(() => {
    const root = document.documentElement
    let frame = 0

    const updatePointer = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 78
        const y = (event.clientY / window.innerHeight - 0.5) * 52
        root.style.setProperty('--parallax-x', `${x.toFixed(2)}px`)
        root.style.setProperty('--parallax-y', `${y.toFixed(2)}px`)
        root.style.setProperty('--parallax-x-reverse', `${(-x * 0.58).toFixed(2)}px`)
        root.style.setProperty('--parallax-y-reverse', `${(-y * 0.58).toFixed(2)}px`)
      })
    }

    const updateScroll = () => {
      root.style.setProperty('--scroll-glow', `${(Math.sin(window.scrollY / 520) * 34).toFixed(2)}px`)
    }

    window.addEventListener('pointermove', updatePointer, { passive: true })
    window.addEventListener('scroll', updateScroll, { passive: true })
    updateScroll()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', updatePointer)
      window.removeEventListener('scroll', updateScroll)
    }
  }, [])

  useEffect(() => {
    if (!window.location.hash) return
    const target = document.getElementById(window.location.hash.slice(1))
    if (!target) return
    requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }))
  }, [])

  return <div className={s.page}><div className={s.glowField} aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <span key={index} />)}</div><Header /><main><Hero /><About /><Gaming /><PlayableAds /><NonGaming /><Closing /></main><Footer /></div>
}
