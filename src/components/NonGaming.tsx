import { AudienceBanner } from './AudienceBanner'
import { assetUrl } from '../assetUrl'
import { PackageCarousel, type PackagePlan } from './PackageCarousel'
import { VideoButton } from './VideoPlayer'
import s from '../App.module.css'

const ugc: PackagePlan[] = [
  { title: 'BASIC', features: ['4 videos', '1 talent', '1 concept', '3 variations', '2 rounds of edits', '10 working days', '3 free banners'], price: '$3,000', note: '$750 per asset' },
  { title: 'STANDART', features: ['8 videos', '2 talents', '2 concepts', '6 variations', '2 rounds of edits', '13 working days', '5 free banners'], price: '$5,000', note: '$625 per asset' },
  { title: 'PLUS', features: ['16 videos', '4 talents', '4 concepts', '12 variations', '2 rounds of edits', '15 working days', '7 free banners'], price: '$7,000', note: '$438 per asset' },
  { title: 'SCALE', features: ['32 videos', '8 talents', '8 concepts', '24 variations', '2 rounds of edits', '15 working days', '10 free banners'], price: '$10,000', note: '$312 per asset' },
]
const mix = ugc.map((x, i) => ({ ...x, price: ['$3,400', '$6,400', '$9,000', '$11,200'][i], note: `From $${[375,350,325,300][i]} per asset` }))

function CreativeRow({ title, images, tiers, videos }: { title: string; images: string[]; tiers: [string,string][]; videos:string[] }) { return <section className={s.creativeRow}><h3>{title}</h3><div className={s.tierColumn}>{tiers.map(([name,price]) => <article key={name}><strong>{name}</strong><span>✓ 10 variations<br />✓ 10 variations<br />✓ 10 working days</span><b>{price}</b></article>)}</div><div className={s.creativeImages}>{images.map((src,i) => <span key={src}><img src={src} alt="" /><VideoButton url={videos[i]} label={`Watch ${title} example ${i + 1}`} /></span>)}</div></section> }

export function NonGaming() {
  return <section className={s.nonGaming} id="non-gaming"><AudienceBanner type="non-gaming" /><div className={s.content}>
    <div className={s.ugcHero}><img src={assetUrl('assets/design/ugc-burger.png')} alt="UGC creative" /><VideoButton url="https://www.youtube.com/watch?v=_NeBAHdmlLA" label="Watch UGC creative" /></div>
    <h3 className={s.blockTitle}>UGC Net New Packages</h3><PackageCarousel items={ugc} />
    <CreativeRow title="AIGC creatives" images={[assetUrl('assets/design/ai-princess.png'), assetUrl('assets/design/ai-chat.png')]} videos={['https://drive.google.com/file/d/10qxnSKEwPQcQ_WGpdIvL8m6122DVSsFz/view','https://drive.google.com/file/d/1I133-EQl5WF2PwMqyKnuEG4EzyqOqpd2/view']} tiers={[["100 creatives","$2,500"],["200 creatives","$4,500"]]} />
    <CreativeRow title="Video AI" images={[assetUrl('assets/design/ai-baby.png'), assetUrl('assets/design/ai-family.png')]} videos={['https://drive.google.com/file/d/1BvMhRpw3nVEFsrXzZtEE0t6MGfGs8IRM/view?usp=sharing','https://drive.google.com/file/d/1tXfPMPDhgvITeGOIiqXjhP6gmZV2k9N5/view?usp=sharing']} tiers={[["50 creatives","$2,500"],["100 creatives","$4,500"]]} />
    <h3 className={s.blockTitle}>Mix type UGC/AI/2D/3D <small>Create your own pack</small></h3><PackageCarousel items={mix} />
    <section className={s.mixPackages} id="mix-packages">
      <h3 className={s.blockTitle}>Mix Packages</h3>
      <PackageCarousel className={s.mixGrid} items={[
        { title: 'FAST TRACK', features: ['10 videos UGC', '1 talent', '2 concept', '5 variations', '1 rounds of edits', '10 working days'], pricePrefix: 'From', price: '$4,500', note: '$550 per asset' },
        { title: 'READY SOLUTION', features: ['Analyze the market and your product', '2 solutions to choose:\nMix of UGC, AI & banners', '2 rounds of edits', '20 working days'], pricePrefix: 'From', price: '$5,500', note: '' },
      ]} />
    </section>
  </div></section>
}
