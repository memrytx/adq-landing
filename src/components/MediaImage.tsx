import type { ImgHTMLAttributes } from 'react'
import variants from '../data/optimizedImages.json'
import { assetUrl } from '../assetUrl'

type Props = ImgHTMLAttributes<HTMLImageElement>

/** Responsive local previews; unknown images retain their original URL. */
export function MediaImage({ src = '', sizes = '(max-width: 767px) 100vw, 80vw', loading = 'lazy', decoding = 'async', ...props }: Props) {
  const key = src.startsWith(import.meta.env.BASE_URL) ? src.slice(import.meta.env.BASE_URL.length) : src
  const image = variants[key as keyof typeof variants]
  if (!image) return <img src={src} loading={loading} decoding={decoding} {...props} />
  return <img
    src={assetUrl(image.src)}
    srcSet={image.smallWidth < image.width ? `${assetUrl(image.small)} ${image.smallWidth}w, ${assetUrl(image.src)} ${image.width}w` : undefined}
    sizes={sizes} width={image.width} height={image.height}
    loading={loading} decoding={decoding} {...props}
  />
}
