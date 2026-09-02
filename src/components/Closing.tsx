import { Logo } from './Logo'
import { GlowAccent } from './GlowAccent'
import s from '../App.module.css'

const rows=[
['3D','FBX, OBJ, C4D, BLEND','Reference videos of the assets; Pivot at (0,0,0); Correct model scale'],['2D','PNG, PSD, AI','Reference videos of the assets; Editable PSD or AI source files'],['VFX','PNG Sequence, spine','PNG with transparent background; 72 DPI resolution'],['Audio','MP3, WAV, FLAC, ORG','Compressed music and sounds; Sounds as separate files'],['Animations','Spline / PNG Sequence','Minimal number of frames in the sequence'],['Brand book','Link, PDF','Logo usage guidelines, fonts, color palette'],['Build','APK, Unity Project','Test build with unlocked content'],['Access','Open access to your application or game','Test account with full access to the app/game'],['Images','PNG, JPEG, PSD, AI, CDR','Editable source files and transparent PNGs'],['Guidlines','Link, PDF, TXT','Guid “do’s & don’ts”'],['Videos','AEP, MP4, WAV','Screencasts, packshots, source files'],['Sequentions','PNG, spine','Source animation files; Original frame rate'],['Scripts','DOC, DOCX, TXT','Any format'],['Textures','PNG, JPEG, PSD, AI, CDR','Original texture files in the highest available resolution']]
const form='https://docs.google.com/forms/d/e/1FAIpQLSdYg-UXaKzZgiHlbRNLTvO6iCa06-CepMGOQ3uXXDjfm7hX_w/viewform'

export function Closing(){return <section className={s.closing} id="contact">
  <GlowAccent asset="bridge" className={s.closingGlowAsset} /><div className={s.closingTitle}><Logo/><h2>BUILD YOUR WINNING<br/>CREATIVES WITH US</h2></div>
  <div className={s.content}><h3 className={s.processTitle}>How to get started</h3><div className={s.process}><span>Choose Your<br/>Package</span><i/><span>Complete<br/>the Brief</span><a href={form} target="_blank" rel="noreferrer">LETS GO!</a><i/><span>Sign<br/>the contract</span><i/><span>Share<br/>Your Assets</span></div>
  <h3 className={s.blockTitle}>Required Assets</h3><div className={s.requirements}><div className={s.requirementsHead}><span/><span>Preferable</span><span>Helpful To Have</span></div>{rows.map(row=><div className={s.requirementRow} key={row[0]}><strong>{row[0]}</strong><span>{row[1]}</span><span>{row[2]}</span></div>)}</div>
  <aside className={s.important}><h3>IMPORTANT</h3><ul><li>Asset names in English</li><li>Before production starts, it would be helpful to receive as many project assets as possible — ideally 80–100% of the game’s or application’s assets</li><li>All characters should include their rig and animations</li><li>All models and characters must have materials</li><li>If your files are already organized, please keep the existing folder structure</li><li>Folder structure example</li></ul></aside></div>
</section>}
