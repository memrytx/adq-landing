import { useEffect, useRef } from 'react'

/** Native touch scrolling on narrow screens; CSS owns the desktop marquee. */
export function useHeroCarousel(cardCount: number) {
  const railRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rail = railRef.current
    const track = rail?.firstElementChild as HTMLElement | null
    if (!rail || !track) return

    const narrow = window.matchMedia('(max-width: 1300px)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let cycle = 0
    let position = 0
    let writtenPosition = 0
    let previousTime = 0
    let frame = 0
    let inView = true

    const writePosition = () => {
      rail.scrollLeft = position
      writtenPosition = rail.scrollLeft
    }
    const measure = () => {
      if (!narrow.matches) {
        cycle = 0
        position = 0
        writePosition()
        return
      }
      const first = track.children[0] as HTMLElement
      const repeat = track.children[cardCount] as HTMLElement
      const start = track.children[3] as HTMLElement
      const nextCycle = repeat.offsetLeft - first.offsetLeft
      // Keep the runner / Angry Birds opening composition from the reference.
      position = cycle ? position * nextCycle / cycle : start.offsetLeft - first.offsetLeft
      cycle = nextCycle
      writePosition()
    }
    const onScroll = () => {
      // Ignore our own rounded scroll writes; preserve fractional animation speed.
      if (Math.abs(rail.scrollLeft - writtenPosition) > 1) {
        position = rail.scrollLeft
        writtenPosition = position
      }
    }
    const tick = (time: number) => {
      const elapsed = Math.min(time - previousTime, 50)
      previousTime = time
      if (cycle && inView && !reducedMotion.matches && !document.hidden) {
        position = (position + elapsed * 0.03) % cycle
        writePosition()
      }
      frame = requestAnimationFrame(tick)
    }

    const visibility = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting })
    visibility.observe(rail)
    const observer = new ResizeObserver(measure)
    observer.observe(rail)
    narrow.addEventListener('change', measure)
    rail.addEventListener('scroll', onScroll, { passive: true })
    measure()
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      visibility.disconnect()
      narrow.removeEventListener('change', measure)
      rail.removeEventListener('scroll', onScroll)
    }
  }, [cardCount])

  return railRef
}
