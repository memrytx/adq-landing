import type { ReactNode } from 'react'
import { publisherIcons } from '../data/playables'
import s from '../App.module.css'
export function SectionTitle({ id,children,dark=false }: { id:string; children:ReactNode; dark?:boolean }) {
  return <div className={`${s.sectionTitle} ${dark ? s.sectionTitleDark : ''}`} id={id}><h2>{children}</h2><div className={s.publisherRail} aria-hidden="true">{[...publisherIcons,...publisherIcons].map((item,index) => <img src={item.icon} alt="" key={`${item.id}-${index}`}/>)}</div></div>
}
