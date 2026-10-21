import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const ffmpeg=process.env.FFMPEG_PATH || 'ffmpeg';
const dimensions=file=>{const b=fs.readFileSync(file);return [b.readUInt32BE(16),b.readUInt32BE(20)]};
function encode(source,target,maxWidth,lossless=false){
 const [w,h]=dimensions(source);const width=Math.min(w,maxWidth);const height=Math.round(h*width/w);
 fs.mkdirSync(path.dirname(target),{recursive:true});
 const temporary=target.replace(/\.webp$/,'.tmp.webp');
 execFileSync(ffmpeg,['-hide_banner','-loglevel','error','-y','-i',source,'-vf',`scale=${width}:${height}:flags=lanczos`,'-frames:v','1','-c:v','libwebp','-quality','90','-compression_level','6',...(lossless?['-lossless','1']:[]),temporary],{stdio:'pipe'});
 fs.renameSync(temporary,target);
 return {width,height};
}
const internal=['exported/im1','exported/im2','exported/im3','exported/im4','exported/light_1','exported/light_2','exported/video-glow','exported/video-glow_2','exported/flag_1','vertical_glow','figma-adventure-source','figma-bloom-source',...Array.from({length:11},(_,i)=>`exported/frames/frame_${i+1}`)];
for(const name of internal){
 const input=path.join(root,'src/assets',name+'.png');
 const [w,h]=dimensions(input);
 const limit=name.includes('source')?2560:name.includes('frames/')?1600:1280;
 encode(input,input.replace(/\.png$/,'.webp'),Math.min(limit,Math.round(limit*w/h)),fs.statSync(input).size < 100_000);
}
for (const name of ['im3', 'im4', 'light_1', 'light_2', 'video-glow', 'video-glow_2']) {
 const input=path.join(root,'src/assets/exported',name+'.png');
 const [w,h]=dimensions(input);
 encode(input,path.join(root,'src/assets/exported/optimized-mobile',name+'.webp'),Math.min(900,Math.round(900*w/h)));
}
if(process.argv.includes('--decorations-only')) process.exit(0);
const components=['Hero','Gaming','NonGaming','PlayableAds'].map(n=>fs.readFileSync(path.join(root,`src/components/${n}.tsx`),'utf8')).join('\n');
const design=new Set([...components.matchAll(/assets\/design\/([^'"`]+\.png)/g)].map(m=>m[1]).filter(n=>!n.includes('${')));
for(const m of components.matchAll(/['"](hero-[^'"]+\.png)['"]/g))design.add(m[1]);
for(const variant of ['adventure','bloom'])for(const suffix of ['','_light'])design.add(`case-${variant}-art_mobile${suffix}.png`);
const publicPaths=[...[...design].map(n=>'assets/design/'+n),...fs.readdirSync(path.join(root,'public/assets/playable-previews')).filter(n=>n.endsWith('.png')).map(n=>'assets/playable-previews/'+n)];
const manifest={};let before=0,after=0;
for(const key of publicPaths){
 const input=path.join(root,'public',key);const target=key.replace('assets/','assets/optimized/').replace(/\.png$/,'.webp');
 const isPortrait=/hero-|ai-|plan-phone|playable-previews/.test(key);
 const {width,height}=encode(input,path.join(root,'public',target),isPortrait?1000:1920,key.includes('_light'));
 const small=target.replace(/\.webp$/,'-640.webp');const smallDimensions=encode(input,path.join(root,'public',small),640,key.includes('_light'));
 manifest[key]={src:target,width,height,small,smallWidth:smallDimensions.width};before+=fs.statSync(input).size;after+=fs.statSync(path.join(root,'public',target)).size;
}
fs.writeFileSync(path.join(root,'src/data/optimizedImages.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(`Generated ${internal.length} decoration assets and ${publicPaths.length} responsive preview pairs. Preview originals: ${(before/1e6).toFixed(2)} MB; full WebP variants: ${(after/1e6).toFixed(2)} MB.`);
