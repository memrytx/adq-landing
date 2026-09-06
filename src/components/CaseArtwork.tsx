import { useId } from 'react'
import { caseArtwork } from '../assets/caseArtwork'
import s from '../App.module.css'

export function CaseArtwork({ variant, label }: { variant: keyof typeof caseArtwork; label: string }) {
  const id = useId().replace(/:/g, '')
  const art = caseArtwork[variant]
  return <svg className={s.caseArtPicture} viewBox={art.viewBox} role="img" aria-label={label}>
    <defs>
      <clipPath id={`${id}-clip`}><path d={art.path} /></clipPath>
      <linearGradient id={`${id}-edge`} x1="0" y1="0.5" x2="1" y2="0.5" gradientTransform={`matrix(${art.gradient.join(' ')})`}>
        <stop stopColor="#47d1ff" />
        <stop offset="0.41346" stopColor="#4775ff" />
        <stop offset="1" stopColor="#ff47fc" />
      </linearGradient>
      <linearGradient id={`${id}-light`} x1="0" y1="0.5" x2="1" y2="0.5" gradientTransform={`matrix(${art.glow.gradient.join(' ')})`}>
        <stop stopColor="#1b76dd" />
        <stop offset="1" stopColor="#f600ff" />
      </linearGradient>
      <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
        <feGaussianBlur stdDeviation="47" />
      </filter>
    </defs>
    <path d={art.glow.path} transform={`matrix(${art.glow.transform.join(' ')})`} fill={`url(#${id}-light)`} filter={`url(#${id}-blur)`} />
    <g transform={`matrix(${art.transform.join(' ')})`}>
      <g clipPath={`url(#${id}-clip)`}>
        <image href={art.image} width="1" height="1" preserveAspectRatio="none" transform={`matrix(${art.imageTransform.join(' ')})`} />
      </g>
      <path d={art.path} fill="none" stroke={`url(#${id}-edge)`} strokeWidth="3" />
    </g>
  </svg>
}
