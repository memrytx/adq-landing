import { Check } from './Decor'
import s from '../App.module.css'
export type Plan = { title:string; description?:string; features:string[]; price:string; note?:string }
export function PlanCards({ plans,light=false,compact=false }: { plans:Plan[]; light?:boolean; compact?:boolean }) {
  return <div className={`${s.planGrid} ${light ? s.planGridLight : ''} ${compact ? s.planGridCompact : ''}`}>{plans.map((plan,index) => <article className={s.planCard} key={plan.title}><span className={s.planIndex}>{String(index+1).padStart(2,'0')}</span><h3>{plan.title}</h3>{plan.description && <p className={s.planDescription}>{plan.description}</p>}<p className={s.includes}>Includes:</p><ul>{plan.features.map(f => <li key={f}><Check/>{f}</li>)}</ul><div className={s.planPrice}><strong>{plan.price}</strong>{plan.note && <span>{plan.note}</span>}</div></article>)}</div>
}
