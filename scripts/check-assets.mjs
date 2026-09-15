import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const errors = [];
let checked = 0;
function check(file, label) {
  const relative = path.relative(root, file);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    errors.push(`${label}: dependency outside the repository`);
    return;
  }
  // Windows accepts incorrect filename case; GitHub Pages builds on Linux.
  let current = root;
  for (const part of relative.split(path.sep)) {
    if (!fs.existsSync(current) || !fs.statSync(current).isDirectory() || !fs.readdirSync(current).includes(part)) {
      errors.push(`${label}: missing file or incorrect filename case (${relative})`);
      return;
    }
    current = path.join(current, part);
  }
  checked++;
}
function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes:true}).flatMap(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}
for (const file of walk(path.join(root, 'src')).filter(file => /\.(tsx?|css)$/.test(file))) {
  const source = fs.readFileSync(file, 'utf8');
  const label = path.relative(root, file);
  for (const match of source.matchAll(/(?:\bfrom\s*|\bimport\s*|\bimport\(\s*)['"](\.[^'"]+)['"]/g)) {
    const target = path.resolve(path.dirname(file), match[1]);
    const candidates = [target, ...['.ts', '.tsx', '.js', '/index.ts', '/index.tsx'].map(ext => target + ext)];
    check(candidates.find(file => fs.existsSync(file) && fs.statSync(file).isFile()) ?? target, `${label}: ${match[1]}`);
  }
  for (const match of source.matchAll(/url\(\s*['"]?(\.[^)'"\s]+)['"]?\s*\)/g)) {
    check(path.resolve(path.dirname(file), match[1]), `${label}: ${match[1]}`);
  }
  for (const match of source.matchAll(/url\(\s*['"]?(\/assets\/[^)'"\s]+)['"]?\s*\)/g)) {
    check(path.join(root, 'public', match[1]), `${label}: ${match[1]}`);
  }
  for (const match of source.matchAll(/assetUrl\(\s*['"]([^'"]+)['"]\s*\)/g)) {
    check(path.resolve(root, 'public', match[1].split(/[?#]/)[0]), `${label}: ${match[1]}`);
  }
}
// These are the two dynamic filename collections used by the landing page.
const hero = fs.readFileSync(path.join(root, 'src/components/Hero.tsx'), 'utf8');
for (const [, name] of hero.matchAll(/['"](hero-[^'"]+\.png)['"]/g)) check(path.join(root, 'public/assets/design', name), name);
const playables = fs.readFileSync(path.join(root, 'src/data/playables.ts'), 'utf8');
for (const [, id] of playables.matchAll(/\bplayable\('([^']+)'/g)) {
  for (const name of [`playables/${id}.html`, `assets/playable-previews/${id}.png`, `assets/playable-icons/${id}.png`]) check(path.join(root, 'public', name), name);
}
check(path.join(root, 'public/playable.html'), 'playable launcher');
for (const variant of ['adventure', 'bloom']) {
  for (const suffix of ['', '_light']) {
    const name = `case-${variant}-art_mobile${suffix}.png`;
    check(path.join(root, 'public/assets/design', name), name);
  }
}
const logoSizes = JSON.parse(fs.readFileSync(path.join(root, 'src/assets/exported/company-logo-sizes.json'), 'utf8'));
for (const folder of ['ForGamingCompanies', 'ForNoneGamingApps', 'PlayableAds']) {
  const directory = path.join(root, 'src/assets/exported', folder);
  const names = fs.existsSync(directory) ? fs.readdirSync(directory).filter(name => name.endsWith('.png')) : [];
  if (!names.length) errors.push(`${folder}: company logo collection is empty`);
  for (const name of names) {
    check(path.join(directory, name), `${folder}/${name}`);
    if (!logoSizes[`${folder}/${name}`]?.every(value => Number.isFinite(value) && value > 0)) {
      errors.push(`${folder}/${name}: missing or invalid logo dimensions`);
    }
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`Asset check passed: ${checked} local references, including filename case and repository boundaries.`);
