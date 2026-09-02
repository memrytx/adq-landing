import { assetUrl } from '../assetUrl'

export type Playable = { id: string; title: string; studio: string; file: string; preview: string; icon: string; installs: string }
const playable = (id: string, title: string, studio: string, installs: string): Playable => ({ id, title, studio, installs, file: assetUrl(`playable.html?id=${encodeURIComponent(id)}`), preview: assetUrl(`assets/playable-previews/${id}.png`), icon: assetUrl(`assets/playable-icons/${id}.png`) })
export const playables: Playable[] = [
  playable('ac-15-19','Idle Lumber Empire','AppQuantum','100M+'),
  playable('anb-42-10','Angry Birds 2','Rovio','100M+'),
  playable('anb-25-20t','Angry Birds 2','Rovio','100M+'),
  playable('anbm-03-57','Angry Birds Match','Rovio','10M+'),
  playable('iop-434-25','Idle Outpost','Rockbite Games','10M+'),
  playable('ism-97-04','Idle Sword Master','Pixel Spirits','500K+'),
  playable('ivg-131-4','Icy Village','Unimob','1M+'),
  playable('jum-1-45','Raft Survival','Treastone','100M+'),
  playable('lim-404-23','Idle Lumber Empire','AppQuantum','100M+'),
  playable('ac-20-15','Idle Lumber Empire','AppQuantum','100M+'),
  playable('anb-31-3','Angry Birds 2','Rovio','100M+'),
  playable('ism-40-4','Idle Sword Master','Pixel Spirits','500K+'),
  playable('ypo-153-13','Yandex Travel','Yandex','5M+'),
]
export const publisherIcons = playables.slice(0,10)
