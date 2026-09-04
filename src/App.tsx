import { useEffect, type CSSProperties } from 'react'
import { About } from './components/About'
import { Closing } from './components/Closing'
import { Gaming } from './components/Gaming'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { NonGaming } from './components/NonGaming'
import { PlayableAds } from './components/PlayableAds'
import s from './App.module.css'
import videoGlow from '../../../exports/video-glow.png'
import verticalVideoGlow from '../../../exports/video-glow_2.png'
import lightOne from '../../../exports/light_1.png'
import lightTwo from '../../../exports/light_2.png'
import flag from '../../../exports/flag_1.png'
import frameOne from '../../../exports/frames/frame_1.png'
import frameTwo from '../../../exports/frames/frame_2.png'
import frameThree from '../../../exports/frames/frame_3.png'
import frameFour from '../../../exports/frames/frame_4.png'
import frameFive from '../../../exports/frames/frame_5.png'
import frameSix from '../../../exports/frames/frame_6.png'
import frameSeven from '../../../exports/frames/frame_7.png'
import frameEight from '../../../exports/frames/frame_8.png'
import frameNine from '../../../exports/frames/frame_9.png'
import frameTen from '../../../exports/frames/frame_10.png'
import frameEleven from '../../../exports/frames/frame_11.png'

export default function App() {
  useEffect(() => {
    const root = document.documentElement
    let frame = 0

    const updatePointer = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 30
        const y = (event.clientY / window.innerHeight - 0.5) * 20
        root.style.setProperty('--parallax-x', `${x.toFixed(2)}px`)
        root.style.setProperty('--parallax-y', `${y.toFixed(2)}px`)
        root.style.setProperty('--parallax-x-reverse', `${(-x * 0.58).toFixed(2)}px`)
        root.style.setProperty('--parallax-y-reverse', `${(-y * 0.58).toFixed(2)}px`)
      })
    }

    const updateScroll = () => {
      const distance = window.matchMedia('(max-width: 900px)').matches ? 6 : 12
      root.style.setProperty('--scroll-glow', `${(Math.sin(window.scrollY / 620) * distance).toFixed(2)}px`)
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
    const revealTarget = () => document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ block: 'start' })
    const frame = requestAnimationFrame(revealTarget)
    const timer = window.setTimeout(revealTarget, 450)
    window.addEventListener('load', revealTarget, { once: true })
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
      window.removeEventListener('load', revealTarget)
    }
  }, [])

  const glowAssets = {
    '--video-glow': `url("${videoGlow}")`,
    '--video-glow-vertical': `url("${verticalVideoGlow}")`,
    '--light-1': `url("${lightOne}")`,
    '--light-2': `url("${lightTwo}")`,
    '--price-flag': `url("${flag}")`,
    '--frame-1': `url("${frameOne}")`,
    '--frame-2': `url("${frameTwo}")`,
    '--frame-3': `url("${frameThree}")`,
    '--frame-4': `url("${frameFour}")`,
    '--frame-5': `url("${frameFive}")`,
    '--frame-6': `url("${frameSix}")`,
    '--frame-7': `url("${frameSeven}")`,
    '--frame-8': `url("${frameEight}")`,
    '--frame-9': `url("${frameNine}")`,
    '--frame-10': `url("${frameTen}")`,
    '--frame-11': `url("${frameEleven}")`,
  } as CSSProperties

  return <div className={s.page} style={glowAssets}><Header /><main><Hero /><About /><Gaming /><PlayableAds /><NonGaming /><Closing /></main></div>
}
