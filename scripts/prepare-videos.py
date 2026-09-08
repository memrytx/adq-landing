"""Encode downloaded originals as local H.264/AAC MP4s. Requires ffmpeg/ffprobe.

Usage: python scripts/prepare-videos.py PATH_TO_ORIGINALS
Original filenames are listed in video-sources.json, with the .mp4 extension.
"""
import concurrent.futures
import json
import pathlib
import subprocess
import sys

repo = pathlib.Path(__file__).resolve().parent.parent
originals = pathlib.Path(sys.argv[1]).resolve()
target = repo / 'public' / 'assets' / 'videos'
target.mkdir(parents=True, exist_ok=True)
sources = json.loads((repo / 'scripts' / 'video-sources.json').read_text())

def prepare(item):
    output = target / (item['name'] + '.mp4')
    if not output.exists():
        subprocess.run([
            'ffmpeg', '-nostdin', '-n', '-v', 'error', '-i', str(originals / output.name),
            '-map', '0:v:0', '-map', '0:a:0?', '-map_metadata', '-1',
            '-c:v', 'libx264', '-preset', 'fast', '-crf', '23', '-threads', '2',
            '-pix_fmt', 'yuv420p', '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2',
            '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', str(output),
        ], check=True)
    probe = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration,size:stream=codec_type,codec_name,width,height', '-of', 'json', str(output)], capture_output=True, text=True, check=True)
    data = json.loads(probe.stdout)
    assert any(s.get('codec_name') == 'h264' for s in data['streams']), output
    print(json.dumps({'name': item['name'], **data}), flush=True)

with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
    list(pool.map(prepare, sources))
