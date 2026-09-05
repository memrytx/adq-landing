import type { ReactNode } from 'react'
import { assetUrl } from '../assetUrl'
import { AudienceBanner } from './AudienceBanner'
import { VideoButton } from './VideoPlayer'
import s from '../App.module.css'
import adventurePuddleLight from '../../../../exports/2.png'
import bloomPuddle from '../../../../exports/3.png'

const links = {
  reel: 'https://www.youtube.com/watch?v=qW9hnwUOEow',
  cinematic: 'https://www.youtube.com/watch?v=NOmh2Am8XmM',
  videos: 'https://drive.google.com/file/d/1oM3mcLqTJGwFXPOM6qxchoNtGyy7T4SA/view?usp=sharing',
  runner: 'https://drive.google.com/file/d/1hpkj-CH8z8R57Fe00peGffSxIOBtHXdL/view?usp=sharing',
  ground: 'https://drive.google.com/file/d/1DUyQMZNHiyJcAo2tfSUE8qapZwbLBRzE/view?usp=sharing',
  bloom: 'https://drive.google.com/file/d/1gj5CdYCA79oqIJ0ix0VoQQe0NL-cWEC0/view?usp=sharing',
}

type DetailIcon = 'collaboration' | 'creative' | 'result' | 'challenge' | 'solution' | 'impact'

const detailIconClass: Record<DetailIcon, string> = {
  collaboration: s.iconCollaboration,
  creative: s.iconCreative,
  result: s.iconResult,
  challenge: s.iconChallenge,
  solution: s.iconSolution,
  impact: s.iconImpact,
}

function PricePair({ left, right }: { left: [string, string]; right: [string, string] }) {
  return <div className={s.pricePair}>
    <div><span>{left[0]}</span><small>starting from</small><strong>{left[1]}</strong></div>
    <div><span>{right[0]}</span><small>starting from</small><strong>{right[1]}</strong></div>
  </div>
}

function VideoOffer({ id, reverse = false, title, image, video, children, prices }: {
  id?: string
  reverse?: boolean
  title: string
  image: string
  video: string
  children: ReactNode
  prices: [[string, string], [string, string]]
}) {
  return <article className={`${s.videoOffer} ${reverse ? s.reverse : ''}`} id={id}>
    <div className={s.offerHeading}><div><span className={s.pill}>Plan</span><h3>{title}</h3></div></div>
    <div className={s.offerLayout}>
      <div className={s.offerText}>{children}</div>
      <div className={s.offerMedia}>
        <div className={s.offerVisual}><img src={image} alt="" /><VideoButton url={video} label={`Watch ${title}`} /></div>
        {id === 'gaming-videos' && <span className={s.offerPackageNote}>package starts at <strong>3 ads</strong></span>}
        <PricePair left={prices[0]} right={prices[1]} />
      </div>
    </div>
  </article>
}

function DetailList({ children }: { children: ReactNode }) {
  return <div className={s.detailList}>{children}</div>
}

function Detail({ icon, title, children, result = false }: {
  icon: DetailIcon
  title: string
  children: ReactNode
  result?: boolean
}) {
  return <div className={result ? s.detailResult : ''}>
    <span className={`${s.detailIcon} ${detailIconClass[icon]}`} aria-hidden="true" />
    <p><strong>{title}</strong>{children}</p>
  </div>
}

function Accent({ children }: { children: ReactNode }) {
  return <em className={s.detailAccent}>{children}</em>
}

function CaseArt({ art, glow, alt, variant }: { art: string; glow: string; alt: string; variant: 'adventure' | 'bloom' }) {
  return <div className={`${s.blobMedia} ${variant === 'adventure' ? s.blobAdventure : s.blobBloom}`}>
    <img className={s.caseArtGlow} src={glow} alt="" aria-hidden="true" />
    <img className={s.caseArtPicture} src={art} alt={alt} />
  </div>
}

export function Gaming() {
  return <section className={s.gaming} id="gaming">
    <AudienceBanner type="gaming" />
    <div className={s.wideMedia}><img src={assetUrl('assets/design/showreel-goblin.png')} alt="3D gaming showreel" /><VideoButton url={links.reel} label="Watch gaming showreel" /></div>
    <div className={s.content}>
      <VideoOffer id="gaming-cinematic" title="2D / 3D Cinematic" image={assetUrl('assets/design/video-pocket-champs.png')} video={links.cinematic} prices={[["2D Cinematic:", "$1,800"], ["3D Cinematic:", "$2,600"]]}>
        <h4>Includes:</h4><ul className={s.offerList}><li>Concepts</li><li>Resizes</li><li>Single language + optional</li><li>2 rounds of corrections</li><li>Add-ons — per request</li></ul><h4>Delivery time:</h4><p>5 weeks</p>
      </VideoOffer>

      <VideoOffer id="gaming-videos" reverse title="2D / 3D Videos" image={assetUrl('assets/design/video-tower.png')} video={links.videos} prices={[["2D Video:", "$1,500"], ["3D Video:", "$2,000"]]}>
        <h4>Includes:</h4><ul className={s.offerList}><li>Concepts</li><li>Resizes</li><li>Single language</li><li>2 rounds of corrections</li><li>Add-ons — per request</li></ul><h4>Delivery time:</h4><p>5 weeks</p>
      </VideoOffer>

      <article className={s.caseIntro} id="adventure-case">
        <div className={s.caseCopy}>
          <span className={s.pill}>Case</span><h3>Adventure Bay-Farm<br />Games</h3><small>Created for Gamegos</small>
          <DetailList>
            <Detail icon="collaboration" title="Collaboration Period">December 2025 — Present</Detail>
            <Detail icon="creative" title="Creative Output">First Creative Pack:<br />3 high-quality ads</Detail>
            <Detail icon="result" title="Result" result>Delivering <Accent>high-quality creatives</Accent> on time. Impeccable client feedback upon completion of the package. Renewal of the service agreement.</Detail>
          </DetailList>
        </div>
        <CaseArt variant="adventure" art={assetUrl('assets/design/case-adventure-art.png')} glow={adventurePuddleLight} alt="Adventure Bay Farm Games" />
      </article>

      <article className={s.caseVideo} id="adventure-story">
        <div className={s.splitPosters}>
          <span><img src={assetUrl('assets/design/case-runner.png')} alt="" /><VideoButton url={links.runner} label="Watch Adventure Bay runner video" /></span>
          <span><img src={assetUrl('assets/design/case-ground.png')} alt="" /><VideoButton url={links.ground} label="Watch Adventure Bay ground video" /></span>
        </div>
        <DetailList>
          <Detail icon="challenge" title="Challenge:">Production launched during the <Accent>holiday season</Accent> (Christmas &amp; New Year), a period notorious for slower workflows.</Detail>
          <Detail icon="solution" title="Solution:">Despite this, we delivered a <Accent>high-quality 1-minute 3D creative</Accent> in just 4 weeks.</Detail>
          <Detail icon="impact" title="Impact:">The ad met all quality benchmarks and contributed to <Accent>scaling ad spend</Accent>.</Detail>
        </DetailList>
      </article>

      <article className={`${s.caseIntro} ${s.bloomIntro}`} id="bloom-case">
        <div className={s.caseCopy}>
          <span className={s.pill}>Case</span><h3>Bloom city match</h3><small>Created for ROVIO</small>
          <DetailList>
            <Detail icon="collaboration" title="Collaboration Period">May 2025 — Present</Detail>
            <Detail icon="creative" title="Creative Output">First Creative Pack:<br />3 high-quality ads</Detail>
            <Detail icon="result" title="Result" result>Delivering <Accent>high-quality creatives</Accent> on time. Impeccable client feedback upon completion of the package. Renewal of the service agreement. Conclusion of a long-term cooperation agreement.</Detail>
          </DetailList>
        </div>
        <CaseArt variant="bloom" art={bloomPuddle} glow={assetUrl('assets/design/case-bloom-glow.png')} alt="Bloom City Match" />
      </article>

      <article className={`${s.caseVideo} ${s.bloomVideo}`} id="bloom-story">
        <div className={s.singlePoster}><img src={assetUrl('assets/design/bloom-video.png')} alt="Bloom City Match case" /><VideoButton url={links.bloom} label="Watch Bloom City Match case" /></div>
        <div className={s.bloomMeta}>
          <a className={s.gradientButton} href="https://adquantum.design/cases/bloom-city-match/" target="_blank" rel="noreferrer"><span className={s.caseCtaDesktop}>Full case study</span><span className={s.caseCtaMobile}>View case study</span></a>
          <DetailList>
            <Detail icon="challenge" title="Challenge:">Following Rovio Entertainment’s brief, we needed to create two new product locations, an intro, and implement <Accent>realistic physics-based animations</Accent>.</Detail>
            <Detail icon="solution" title="Solution:">We built the animation rigs from scratch, developed <Accent>high-quality textures</Accent> and character animations, and delivered the entire scope <Accent>within three weeks</Accent>.</Detail>
            <Detail icon="impact" title="Impact:">The project generated <Accent>solid results</Accent> and resulted in continued collaboration.</Detail>
          </DetailList>
        </div>
      </article>
    </div>
  </section>
}
