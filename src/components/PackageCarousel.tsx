import { useRef, useState } from 'react'
import s from '../App.module.css'

export type PackagePlan = {
  title: string
  features: string[]
  price: string
  note: string
  pricePrefix?: string
}

function PackageCard({ item }: { item: PackagePlan }) {
  return <article className={s.packageCard}>
    <h4>{item.title}</h4>
    <b>Includes:</b>
    <ul>{item.features.map((feature) => <li key={feature}><span className={s.checkmark} aria-hidden="true">✓</span>{feature}</li>)}</ul>
    {item.pricePrefix && <span className={s.pricePrefix}>{item.pricePrefix}</span>}
    <strong>{item.price}</strong>
    <small>{item.note}</small>
  </article>
}

export function PackageCarousel({ items, className = '' }: { items: PackagePlan[]; className?: string }) {
  const rail = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const updateActive = () => {
    const node = rail.current
    if (!node) return
    const cards = node.querySelectorAll<HTMLElement>(`.${s.packageCard}`)
    if (!cards.length) return

    let closest = 0
    let distance = Number.POSITIVE_INFINITY
    cards.forEach((card, index) => {
      const nextDistance = Math.abs(card.offsetLeft - node.scrollLeft - node.offsetLeft)
      if (nextDistance < distance) {
        distance = nextDistance
        closest = index
      }
    })
    setActive(closest)
  }

  const goTo = (index: number) => {
    const node = rail.current
    const card = node?.querySelectorAll<HTMLElement>(`.${s.packageCard}`)[index]
    if (!node || !card) return
    node.scrollTo({ left: card.offsetLeft - node.offsetLeft, behavior: 'smooth' })
    setActive(index)
  }

  return <div className={`${s.packageViewport} ${className}`}>
    <div className={s.packageGrid} ref={rail} onScroll={updateActive}>
      {items.map((item) => <PackageCard item={item} key={item.title} />)}
    </div>
    {items.length > 1 && <div className={s.mobileDots} aria-label="Package pages">
      {items.map((item, index) => <button type="button" className={active === index ? s.mobileDotActive : ''} onClick={() => goTo(index)} aria-label={`Show ${item.title}`} key={item.title} />)}
    </div>}
  </div>
}
