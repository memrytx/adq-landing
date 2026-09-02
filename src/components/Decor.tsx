import s from '../App.module.css'
export function Orb({ className = '' }: { className?: string }) { return <span className={`${s.orb} ${className}`} aria-hidden="true" /> }
export function Check() { return <span className={s.check} aria-hidden="true">✓</span> }
export function Arrow({ direction='right' }: { direction?: 'left'|'right'|'down' }) { return <span aria-hidden="true">{direction === 'left' ? '←' : direction === 'down' ? '↓' : '→'}</span> }
