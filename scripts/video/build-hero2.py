#!/usr/bin/env python3
"""Hero video, take two (2026-09-08): one spoken piece recorded in Auto-Presenter.

Source `raw2.mp4` is the app's 1080x1920 composite (slide on top, face below).
We crop the face to 16:9, keep only the ranges in KEEPS (gaps, restarts and the
slide-switch waits cut out), play Tom at SPEED with pitch kept, alternate a
slight punch-in so the jump cuts read as edits, burn captions from whisper,
and print the chapter times for VSL.chapters.

    python3 build-hero2.py plan     # cues + chapters only
    python3 build-hero2.py          # render master2.mp4 + poster2.jpg
"""
import json, subprocess, sys, os, math, re
from pathlib import Path
W = Path(__file__).parent
FPS = 30
def snap(t): return round(t * FPS) / FPS
def run(cmd, **kw): return subprocess.run(cmd, check=True, **kw)
def probe_dur(p):
    return float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',str(p)],capture_output=True,text=True).stdout.strip())
def measure_i(p, pre=''):
    r = subprocess.run(['ffmpeg','-hide_banner','-nostats','-i',str(p),'-af',f'{pre}loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json','-f','null','-'],capture_output=True,text=True)
    blob = r.stderr[r.stderr.rfind('{'):]
    return json.loads(blob[:blob.find('}')+1])

PLAN = json.loads((W/'plan2.json').read_text())   # written by cut2.py from the transcript
KEEPS = [tuple(k) for k in PLAN['keeps']]         # source seconds, in order
PARAS = PLAN['paras']                              # [{'i':1,'label':..,'src':start_seconds}, ...]
FIX = PLAN.get('fix', {})
SPEED = 1.25
RAW = W/'raw2.mp4'
# face window of the composite (portrait): 6:5, headroom above the hair, mic top
# at the bottom. Scaled to 864x720 and set on a blurred, darkened 16:9 of itself.
CROP_W, CROP_H, CROP_X, CROP_Y = 1080, 900, 0, PLAN.get('crop_y', 900)
FG_W, FG_H, FG_X = 864, 720, 208
PUNCH = 0.92   # odd segments are cropped tighter by this factor
BG = "scale=1280:1067:flags=bilinear,crop=1280:720,gblur=sigma=28,eq=brightness=-0.18:saturation=0.85"


# ---------- 1. audio prep ----------
tom = W/'tom2-48k.wav'
if not tom.exists():
    m = measure_i(RAW, 'highpass=f=70,')
    ln = (f"loudnorm=I=-16:TP=-1.5:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:"
          f"measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true")
    run(['ffmpeg','-y','-v','error','-i',str(RAW),'-vn','-af',f'highpass=f=70,{ln}','-ar','48000','-ac','1',str(tom)])
    print('tom2-48k.wav: measured', m['input_i'], 'LUFS ->', measure_i(tom)['input_i'])

# ---------- 2. timeline ----------
segs = []
t = 0.0
for s0, s1 in KEEPS:
    s0, s1 = snap(s0), snap(s1)
    d = round(s1 - s0, 6)
    segs.append(dict(s0=s0, s1=s1, dur=d, odur=round(d/SPEED, 6), o0=t))
    t = round(t + d/SPEED, 6)
TOTAL = t
def to_out(src):
    for s in segs:
        if s['s0'] <= src <= s['s1']: return s['o0'] + (src - s['s0'])/SPEED
    # inside a cut: snap to the next kept segment
    for s in segs:
        if s['s0'] > src: return s['o0']
    return TOTAL
print(f'{len(segs)} segments, source {sum(s["dur"] for s in segs):.1f}s -> output {TOTAL:.1f}s')

# ---------- 3. captions ----------
FILLERS = {'um','umm','uh','uhh','hmm','mm','er'}
segdir = W/'segs2'; segdir.mkdir(exist_ok=True)
cl = []
for i, s in enumerate(segs):
    base = segdir/f"seg{i:02d}_{s['s0']:.2f}_{s['s1']:.2f}"
    if not Path(str(base)+'.json').exists():
        run(['ffmpeg','-y','-v','error','-ss',f"{s['s0']:.4f}",'-t',f"{s['dur']:.4f}",'-i',str(tom),'-ar','16000','-ac','1',str(base)+'.wav'])
        run(['whisper-cli','-m',os.path.expanduser('~/.cache/whisper-cpp/ggml-small.en.bin'),'-f',str(base)+'.wav','-l','en','-t','8','-ml','1','-sow','-oj','-of',str(base)],capture_output=True)
    for w in json.load(open(Path(str(base)+'.json')))['transcription']:
        txt = w['text'].strip()
        if not txt or txt[0] in '[(' or txt[-1] in '])' or txt.strip('.,!?').lower() in FILLERS: continue
        f, e = w['offsets']['from']/1000, w['offsets']['to']/1000
        e = min(e, s['dur']); f = min(f, e); e /= SPEED; f /= SPEED
        if e - f > 1.2: f = e - 0.4
        cl.append((s['o0']+f, s['o0']+e, txt, i))
cues, cur = [], []
def flush():
    if not cur: return
    text = ' '.join(w[2] for w in cur)
    for a, b in FIX.items(): text = text.replace(a, b)
    if not cues or re.search(r'[.?!]$', cues[-1]['text']): text = text[:1].upper() + text[1:]
    cues.append(dict(t0=cur[0][0], t1=cur[-1][1]+0.25, text=text))
    cur.clear()
for w in cl:
    if cur:
        text = ' '.join(x[2] for x in cur)
        gap_lim = 1.3 if len(text) < 24 else 0.7
        if (w[0]-cur[-1][1] > gap_lim or len(text)+len(w[2]) > 64
            or (re.search(r'[.?!]$', text) and len(text) > 22) or w[0]-cur[0][0] > 4.5):
            flush()
    cur.append(w)
flush()
for a, b in zip(cues, cues[1:]):
    a['t1'] = min(a['t1'], b['t0']-0.04)
    a['t1'] = max(a['t1'], a['t0']+0.6)
chapters = [dict(t=round(to_out(p['src']), 1), label=p['label']) for p in PARAS]
json.dump(dict(total=TOTAL, segs=segs, cues=cues, chapters=chapters), open(W/'plan2-out.json','w'), indent=1)
if sys.argv[1:] == ['plan']:
    for c in cues: print(f"{c['t0']:7.2f} {c['text']}")
    print('\nchapters for lib/constants.ts VSL.chapters:')
    for c in chapters: print(f"    {{ t: {c['t']}, label: '{c['label']}' }},")
    sys.exit()

# ---------- 4. caption frames ----------
from PIL import Image, ImageDraw, ImageFont
FONT = ImageFont.truetype(str(W/'hanken-500.ttf'), 38)
VW, SH, LH, PX, PY, BOTTOM = 1280, 230, 47, 22, 13, 40
cap = W/'cap2'; cap.mkdir(exist_ok=True)
for f in cap.glob('*.png'): f.unlink()
blank = Image.new('RGBA',(VW,SH),(0,0,0,0)); blank.save(cap/'blank.png')
def wrap(text, maxpx=820):
    d = ImageDraw.Draw(blank); lines, line = [], ''
    for word in text.split():
        cand = (line+' '+word).strip()
        if d.textlength(cand, font=FONT) <= maxpx: line = cand
        else: lines.append(line); line = word
    lines.append(line); return lines
for i, c in enumerate(cues):
    lines = wrap(c['text'])
    if len(lines) > 2: lines = wrap(c['text'], 1000)
    img = Image.new('RGBA',(VW,SH),(0,0,0,0)); d = ImageDraw.Draw(img)
    ws = [d.textlength(l, font=FONT) for l in lines]
    bw, bh = max(ws)+2*PX, len(lines)*LH+2*PY-4
    x0, y1 = (VW-bw)/2, SH-BOTTOM; y0 = y1-bh
    d.rounded_rectangle([x0,y0,x0+bw,y1], radius=14, fill=(12,13,16,200))
    for j, l in enumerate(lines): d.text(((VW-ws[j])/2, y0+PY+j*LH-2), l, font=FONT, fill=(255,255,255,255))
    img.save(cap/f'cue{i:03d}.png')
CFPS = 10
n = int(math.ceil(TOTAL*CFPS))+2
ci = 0
for fr in range(n):
    tt = fr/CFPS
    while ci < len(cues) and cues[ci]['t1'] < tt: ci += 1
    src = cap/f'cue{ci:03d}.png' if ci < len(cues) and cues[ci]['t0'] <= tt else cap/'blank.png'
    os.link(src, cap/f'c{fr:05d}.png')
print('caption frames', n)

# ---------- 5. assemble ----------
N = len(segs)
fc = [f"[0:v]fps={FPS},split={N}" + ''.join(f'[v{i}]' for i in range(N)) + ';',
      f"[1:a]asplit={N}" + ''.join(f'[a{i}]' for i in range(N)) + ';']
for i, s in enumerate(segs):
    if i % 2 == 0: cw, ch, cx, cy = CROP_W, CROP_H, CROP_X, CROP_Y
    else:
        cw = int(round(CROP_W*PUNCH/2))*2; ch = int(round(cw*FG_H/FG_W/2))*2
        cx = CROP_X + (CROP_W-cw)//2; cy = CROP_Y + int((CROP_H-ch)*0.4)
    fc.append(f"[v{i}]trim=start={s['s0']:.4f}:end={s['s1']:.4f},setpts=(PTS-STARTPTS)/{SPEED},"
              f"crop={cw}:{ch}:{cx}:{cy},split[f{i}][b{i}];[f{i}]scale={FG_W}:{FG_H}:flags=lanczos[fg{i}];"
              f"[b{i}]{BG}[bg{i}];[bg{i}][fg{i}]overlay={FG_X}:0,setsar=1[vs{i}];")
    fc.append(f"[a{i}]atrim=start={s['s0']:.4f}:end={s['s1']:.4f},asetpts=PTS-STARTPTS,atempo={SPEED},"
              f"afade=t=in:d=0.02,afade=t=out:st={s['odur']-0.02:.4f}:d=0.02[as{i}];")
fc.append(''.join(f'[vs{i}][as{i}]' for i in range(N)) + f"concat=n={N}:v=1:a=1[vc][ac];")
fc.append(f"[vc][2:v]overlay=0:{720-SH}:eof_action=pass:format=auto,fade=t=in:d=0.25,fade=t=out:st={TOTAL-0.6:.3f}:d=0.6,format=yuv420p[vout];")
fc.append(f"[ac]afade=t=out:st={TOTAL-0.6:.3f}:d=0.6,alimiter=limit=0.95:level=false[aout]")
(W/'graph2.txt').write_text('\n'.join(fc))
cmd = ['ffmpeg','-y','-hide_banner','-loglevel','warning','-stats','-i',str(RAW),'-i',str(tom),
       '-framerate',str(CFPS),'-i',str(cap/'c%05d.png'),'-filter_complex_script',str(W/'graph2.txt'),
       '-map','[vout]','-map','[aout]','-c:v','libx264','-preset','slow','-crf','24','-profile:v','high','-g','60',
       '-c:a','aac','-b:a','96k','-ac','1','-movflags','+faststart','-t',f'{TOTAL:.3f}',str(W/'master2.mp4')]
run(cmd)
pt = PLAN.get('poster_src', KEEPS[0][0]+2)
run(['ffmpeg','-y','-v','error','-ss',f'{pt}','-i',str(RAW),'-frames:v','1','-filter_complex',
     f'[0:v]crop={CROP_W}:{CROP_H}:{CROP_X}:{CROP_Y},split[f][b];[f]scale={FG_W}:{FG_H}:flags=lanczos[fg];[b]{BG}[bg];[bg][fg]overlay={FG_X}:0[out]',
     '-map','[out]','-q:v','3',str(W/'poster2.jpg')])
print('done', probe_dur(W/'master2.mp4'), 's', os.path.getsize(W/'master2.mp4')//1024, 'KB')
