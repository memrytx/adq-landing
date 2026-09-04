import { useCallback, useEffect, useState } from 'react'
import { playables } from '../data/playables'
import { openPlayableDirectly, shouldOpenPlayableDirectly } from '../playableLaunch'
import { assetUrl } from '../assetUrl'
import { AudienceBanner } from './AudienceBanner'
import { GlowAccent } from './GlowAccent'
import { PackageCarousel, type PackagePlan } from './PackageCarousel'
import s from '../App.module.css'
import phoneFrame from '../../../../exports/frames/playable-phone-frame.png'

type PlanTone = 'blue' | 'pink' | 'mixed'
type PlayablePlan = {
  title: string
  description: string
  price: string
  features: string[]
  playableId: string
  tone: PlanTone
  preview?: string
}

const planSlides: PlayablePlan[] = [
  { title: 'BASIC', description: 'Simple animations, no complex mechanics — just using the assets provided by the client', price: '$700', features: ['Up to 2 clicks', 'Delivered within 5 business days'], playableId: 'ism-97-04', tone: 'blue', preview: assetUrl('assets/design/plan-phone.png') },
  { title: 'ENHANCED', description: 'Includes several animations, multiple storyline variations, and visual effects', price: '$1,500', features: ['Up to 3 clicks', 'Delivered within 5 business days'], playableId: 'iop-434-25', tone: 'pink' },
  { title: 'ADVANCED', description: 'Complex animations and effects, with multiple storyline variations', price: '$2,000', features: ['Up to 3 clicks', 'Delivered within 5 business days'], playableId: 'anb-25-20t', tone: 'pink' },
  { title: 'INTERACTIVE', description: 'Extensive animations and a game-like scenario that requires careful balancing', price: '$2,500', features: ['Up to 6 clicks', 'Delivered within 10 business days'], playableId: 'anbm-03-57', tone: 'blue' },
  { title: 'PREMIUM 3D', description: 'Complex 3D physics, extensive game logic to manage collision handling, and visual effects', price: '$2,500', features: ['Up to 8 clicks', 'Delivered within 10 business days'], playableId: 'ac-20-15', tone: 'mixed' },
]

const packages: PackagePlan[] = [
  { title: 'BASIC', features: ['2 playables', '1 concept', '2 variations', '5 working days'], price: '$800', note: '$400 per asset' },
  { title: 'STANDART', features: ['3 playables', '1 game mechanic', '3 concepts', '10 working days'], price: '$2,000', note: '$667 per asset' },
  { title: 'PLUS', features: ['5 playables', '1 game mechanic', '3 concepts', '14 business days', '1 free variation'], price: '$3,000', note: '$600 per asset' },
]

function toneClass(tone: PlanTone) {
  return tone === 'pink' ? s.tonePink : tone === 'mixed' ? s.toneMixed : s.toneBlue
}

function playableById(id: string) {
  return playables.find((playable) => playable.id === id) ?? playables[0]
}

function PlanSlide({ plan, className = '', onDemo }: { plan: PlayablePlan; className?: string; onDemo: () => void }) {
  const item = playableById(plan.playableId)
  return <article className={`${s.planSlide} ${toneClass(plan.tone)} ${className}`}>
    <div className={s.planPhone}><img className={s.phoneScreen} src={plan.preview ?? item.preview} alt={`${item.title} playable`} /><img className={s.phoneFrame} src={phoneFrame} alt="" aria-hidden="true" /></div>
    <div className={s.planCopy}>
      <h4>{plan.title}</h4>
      <p>{plan.description}</p>
      <div className={s.planPriceFlag}><small>Costs start at</small><strong>{plan.price}</strong></div>
      <ul>{plan.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul>
      <button className={s.demo} type="button" onClick={onDemo}>Demo</button>
    </div>
  </article>
}

export function PlayableAds() {
  const [active, setActive] = useState(0)
  const [previous, setPrevious] = useState<number | null>(null)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [animating, setAnimating] = useState(false)
  const [open, setOpen] = useState(false)
  const plan = planSlides[active]
  const item = playableById(plan.playableId)

  const goTo = useCallback((next: number, nextDirection: 1 | -1) => {
    if (animating || next === active) return
    setPrevious(active)
    setDirection(nextDirection)
    setActive(next)
    setAnimating(true)
  }, [active, animating])

  const move = useCallback((step: number) => {
    const next = (active + step + planSlides.length) % planSlides.length
    goTo(next, step > 0 ? 1 : -1)
  }, [active, goTo])

  const openDemo = (index = active) => {
    setPrevious(null)
    setAnimating(false)
    setActive(index)
    const selectedPlayable = playableById(planSlides[index].playableId)
    if (shouldOpenPlayableDirectly()) {
      openPlayableDirectly(selectedPlayable.file)
      return
    }
    setOpen(true)
  }

  useEffect(() => {
    if (!animating) return
    const timer = window.setTimeout(() => {
      setPrevious(null)
      setAnimating(false)
    }, 720)
    return () => window.clearTimeout(timer)
  }, [animating])

  useEffect(() => {
    if (open || animating) return
    const timer = window.setTimeout(() => move(1), 5200)
    return () => window.clearTimeout(timer)
  }, [animating, move, open])

  return <section className={s.playables} id="playable-ads">
    <AudienceBanner type="playable" />
    <div className={s.content}>
      <section className={s.plansShowcase}>
        <GlowAccent asset="sweep" className={s.planTitleGlow} parallax={false} />
        <GlowAccent asset="sweep" className={s.planPanelGlow} reverse parallax={false} />
        <h3 className={s.blockTitle}>Plans</h3>
        <div className={s.playablePlan} id="playable-plans">
          <button className={s.planArrow} type="button" onClick={() => move(-1)} aria-label="Previous playable plan">‹</button>
          <div className={s.planStage}>
            {previous !== null && <PlanSlide plan={planSlides[previous]} onDemo={() => openDemo(previous)} className={direction === 1 ? s.slideExitLeft : s.slideExitRight} />}
            <PlanSlide plan={plan} onDemo={() => openDemo(active)} className={previous !== null ? direction === 1 ? s.slideEnterRight : s.slideEnterLeft : ''} />
          </div>
          <button className={s.planArrow} type="button" onClick={() => move(1)} aria-label="Next playable plan">›</button>
        </div>
        <div className={s.dots}>{planSlides.map((slide, index) => <button type="button" onClick={() => goTo(index, index > active ? 1 : -1)} className={active === index ? s.dotActive : ''} aria-label={`Show ${slide.title}`} key={slide.title} />)}</div>
      </section>

      <div className={s.fastHead}><h3 className={s.blockTitle}>Fast track</h3><button className={s.playDemo} type="button" onClick={() => openDemo()}>Play demo</button></div>
      <div className={s.fastTrack}><div className={s.fastPhone}><img className={s.phoneScreen} src={assetUrl('assets/design/hero-game.png')} alt="" /><img className={s.phoneFrame} src={phoneFrame} alt="" aria-hidden="true" /></div><PackageCarousel items={packages} /></div>

    </div>

    {open && <div className={s.modal} role="dialog" aria-modal="true"><button className={s.modalClose} type="button" onClick={() => setOpen(false)} aria-label="Close">×</button><iframe src={item.file} title={item.title} allow="autoplay; fullscreen" /></div>}
  </section>
}
