import { useCallback, useEffect, useRef, useState, type CSSProperties, type TouchEvent } from 'react'
import { playables } from '../data/playables'
import { openPlayableDirectly, shouldOpenPlayableDirectly } from '../playableLaunch'
import { assetUrl } from '../assetUrl'
import { AudienceBanner } from './AudienceBanner'
import { GlowAccent } from './GlowAccent'
import { PackageCarousel, type PackagePlan } from './PackageCarousel'
import s from '../App.module.css'
import phoneFrame from '../assets/exported/frames/playable-phone-frame.png'

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

function PlanSlide({ plan, className = '', style, onDemo }: { plan: PlayablePlan; className?: string; style?: CSSProperties; onDemo: () => void }) {
  const item = playableById(plan.playableId)
  return <article className={`${s.planSlide} ${toneClass(plan.tone)} ${className}`} style={style}>
    <div className={s.planPhone}><img key={plan.playableId} className={`${s.phoneScreen} ${plan.preview ? s.phoneScreenCentered : ''}`} src={plan.preview ?? item.preview} alt={`${item.title} playable`} /><img className={s.phoneFrame} src={phoneFrame} alt="" aria-hidden="true" /></div>
    <div className={s.planCopy}>
      <h4>{plan.title}</h4>
      <p>{plan.description}</p>
      <div className={s.planPriceFlag}><small>Costs start at</small><strong>{plan.price}</strong></div>
      <ul>{plan.features.map((feature) => <li key={feature}><span className={s.checkmark} aria-hidden="true">✓</span>{feature}</li>)}</ul>
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
  const [touching, setTouching] = useState(false)
  const [dragPosition, setDragPosition] = useState<number | null>(null)
  const gesture = useRef<{ x: number; y: number; origin: number; position: number; distance: number; axis: 'x' | 'y' | null } | null>(null)
  const suppressClickUntil = useRef(0)
  const indicatedIndex = ((Math.round(dragPosition ?? active) % planSlides.length) + planSlides.length) % planSlides.length
  const plan = planSlides[active]
  const item = playableById(plan.playableId)

  const goTo = useCallback((next: number, nextDirection: 1 | -1) => {
    if (animating || touching || dragPosition !== null || next === active) return
    setPrevious(active)
    setDirection(nextDirection)
    setActive(next)
    setAnimating(true)
  }, [active, animating, touching, dragPosition])

  const move = useCallback((step: number) => {
    const next = (active + step + planSlides.length) % planSlides.length
    goTo(next, step > 0 ? 1 : -1)
  }, [active, goTo])

  const cancelGesture = () => {
    if (gesture.current?.axis === 'x') {
      const nearest = Math.round(gesture.current.position)
      setActive(((nearest % planSlides.length) + planSlides.length) % planSlides.length)
      setDragPosition(nearest)
      suppressClickUntil.current = performance.now() + 500
    }
    gesture.current = null
    setTouching(false)
  }

  const startGesture = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) { cancelGesture(); return }
    const touch = event.touches[0]
    setPrevious(null)
    setAnimating(false)
    setDragPosition(null)
    gesture.current = {
      x: touch.clientX, y: touch.clientY, origin: active, position: active,
      distance: Math.max(80, event.currentTarget.getBoundingClientRect().width / 3), axis: null,
    }
    setTouching(true)
  }

  const trackGesture = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) { cancelGesture(); return }
    const start = gesture.current
    if (!start || start.axis === 'y') return
    const dx = event.touches[0].clientX - start.x
    const dy = event.touches[0].clientY - start.y
    if (!start.axis && Math.max(Math.abs(dx), Math.abs(dy)) > 8)
      start.axis = Math.abs(dx) > Math.abs(dy) * 1.25 ? 'x' : 'y'
    if (start.axis === 'x') {
      start.position = start.origin - dx / start.distance
      setDragPosition(start.position)
      suppressClickUntil.current = performance.now() + 500
    }
  }

  const endGesture = (event: TouchEvent<HTMLDivElement>) => {
    const start = gesture.current
    const touch = event.changedTouches[0]
    if (start?.axis === 'x' && touch)
      start.position = start.origin - (touch.clientX - start.x) / start.distance
    cancelGesture()
  }

  useEffect(() => {
    if (touching || dragPosition === null) return
    const timer = window.setTimeout(() => setDragPosition(null), 180)
    return () => window.clearTimeout(timer)
  }, [touching, dragPosition])

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
    if (open || animating || touching || dragPosition !== null) return
    const timer = window.setTimeout(() => move(1), 5200)
    return () => window.clearTimeout(timer)
  }, [animating, move, open, touching, dragPosition])

  return <section className={s.playables} id="playable-ads">
    <AudienceBanner type="playable" />
    <div className={s.content}>
      <section className={s.plansShowcase}>
        <GlowAccent asset="sweep" className={s.planTitleGlow} parallax={false} />
        <GlowAccent asset="sweep" className={s.planPanelGlow} reverse parallax={false} />
        <h3 className={s.blockTitle}>Plans</h3>
        <div className={s.playablePlan} id="playable-plans"
            onTouchStart={startGesture} onTouchMove={trackGesture}
            onTouchEnd={endGesture} onTouchCancel={cancelGesture}
            onClickCapture={(event) => {
              // A swipe beginning on Demo must not also launch a playable.
              if (performance.now() < suppressClickUntil.current) {
                event.preventDefault()
                event.stopPropagation()
              }
            }}>
          <button className={s.planArrow} type="button" onClick={() => move(-1)} aria-label="Previous playable plan">‹</button>
          <div className={s.planStage}>
            {dragPosition !== null ? planSlides.map((slide, index) => {
              const offset = ((index - dragPosition + 2.5) % planSlides.length + planSlides.length) % planSlides.length - 2.5
              return <PlanSlide key={slide.title} plan={slide} onDemo={() => openDemo(index)}
                style={{ transform: `translateX(${offset * 100}%)`, transition: touching ? 'none' : 'transform 180ms ease-out', visibility: Math.abs(offset) < 1.5 ? 'visible' : 'hidden' }} />
            }) : <>
            {previous !== null && <PlanSlide key={planSlides[previous].title} plan={planSlides[previous]} onDemo={() => openDemo(previous)} className={direction === 1 ? s.slideExitLeft : s.slideExitRight} />}
            <PlanSlide key={plan.title} plan={plan} onDemo={() => openDemo(active)} className={previous !== null ? direction === 1 ? s.slideEnterRight : s.slideEnterLeft : ''} />
            </>}
          </div>
          <button className={s.planArrow} type="button" onClick={() => move(1)} aria-label="Next playable plan">›</button>
        </div>
        <div className={s.dots}>{planSlides.map((slide, index) => <button type="button" onClick={() => goTo(index, index > active ? 1 : -1)} className={indicatedIndex === index ? s.dotActive : ''} aria-current={indicatedIndex === index ? 'true' : undefined} aria-label={`Show ${slide.title}`} key={slide.title} />)}</div>
      </section>

      <div className={s.fastHead}><h3 className={s.blockTitle}>Fast track</h3><button className={`${s.playDemo} ${s.playDemoMobile}`} type="button" onClick={() => openDemo()}>Play demo</button></div>
      <div className={s.fastTrack}><div className={s.fastPhone}><img className={s.phoneScreen} src={assetUrl('assets/design/hero-game.png')} alt="" /><img className={s.phoneFrame} src={phoneFrame} alt="" aria-hidden="true" /><button className={`${s.playDemo} ${s.playDemoDesktop}`} type="button" onClick={() => openDemo()}>Play demo</button></div><PackageCarousel items={packages} /></div>

    </div>

    {open && <div className={s.modal} role="dialog" aria-modal="true"><button className={s.modalClose} type="button" onClick={() => setOpen(false)} aria-label="Close">×</button><iframe src={item.file} title={item.title} allow="autoplay; fullscreen" /></div>}
  </section>
}
