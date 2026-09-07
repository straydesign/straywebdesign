#!/usr/bin/env python3
"""Hero video: zoom 15 %, cut the gaps, interviewer questions (ElevenLabs, Zoom-treated), burnt captions.

Inputs, all beside this script (none are committed): raw.mov (the Photo Booth recording,
2026-09-07 "Movie on 9-7-26 at 2.38 PM.mov"), q1..q8.mp3 (ElevenLabs "Matilda", the QS texts
below), words.json (whisper-cli -ml 1 -sow), hanken-500.ttf (Hanken Grotesk SemiBold),
fix.json (caption text fixes). Needs ffmpeg, whisper-cli + ggml-small.en, Pillow.
  python3 build-hero.py plan    # prints the cut list and every caption cue
  python3 build-hero.py render  # writes master.mp4 + poster.jpg
ffmpeg here has no libass/drawtext, so captions are a 10 fps PNG strip sequence overlaid.
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

QS = [
 "So tell me about this shop. Before the site, how were people finding them?",
 "So what actually happens when you take a shop like that on?",
 "And what happens to a site like this after a few months?",
 "So who keeps it current?",
 "What do people usually ask you before they say yes?",
 "You're the local guy for these shops. What does that actually mean for them?",
 "What do owners say afterward?",
 "If someone's watching this and they've never had a site, what should they do?",
]
# answers in source seconds (from the silence map), internal pauses to tighten
ANS = [(22.0,76.0),(84.4,162.9),(175.5,253.3),(276.0,307.3),(321.4,423.2),(432.9,475.3),(492.8,518.3),(530.9,546.2)]
CUTS = [(117.3,120.9),(192.6,196.0),(238.6,242.0),(507.2,511.8)]
PAD_IN, PAD_OUT, KEEP, Q_LEAD, Q_TAIL = 0.30, 0.35, 0.9, 0.25, 0.30

# ---------- 1. audio prep ----------
tom = W/'tom48.wav'
if not tom.exists():
    m = measure_i(W/'raw.mov', 'highpass=f=70,')
    ln = (f"loudnorm=I=-16:TP=-1.5:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:"
          f"measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true")
    run(['ffmpeg','-y','-v','error','-i',str(W/'raw.mov'),'-af',f'highpass=f=70,{ln}','-ar','48000','-ac','1',str(tom)])
    print('tom48.wav: measured', m['input_i'], 'LUFS ->', measure_i(tom)['input_i'])

ZOOM = ('aformat=channel_layouts=mono,highpass=f=160,lowpass=f=6800,'
        'acompressor=threshold=-20dB:ratio=3:attack=8:release=150:makeup=3,aecho=0.75:0.22:14:0.10')
qdur = []
for i in range(8):
    wav = W/f'q{i+1}.wav'
    if not wav.exists():
        op = W/f'q{i+1}.opus'
        run(['ffmpeg','-y','-v','error','-i',str(W/f'q{i+1}.mp3'),'-af',ZOOM,'-c:a','libopus','-b:a','12k','-application','voip','-ar','48000',str(op)])
        gain = -19.0 - float(measure_i(op)['input_i'])
        run(['ffmpeg','-y','-v','error','-i',str(op),'-af',f'volume={gain:.2f}dB,afade=t=in:d=0.03','-ar','48000','-ac','1',str(wav)])
    qdur.append(probe_dur(wav))
print('question durations', [round(d,2) for d in qdur])

# ---------- 2. timeline ----------
segs = []
for k,(a0,a1) in enumerate(ANS):
    a0p, a1p = snap(a0-PAD_IN), snap(a1+PAD_OUT)
    L = snap(Q_LEAD + qdur[k] + Q_TAIL)
    segs.append(dict(kind='listen', s0=snap(a0p-L), s1=a0p, q=k))
    pieces, cur = [], a0p
    for c0,c1 in CUTS:
        if a0p < c0 < a1p:
            pieces.append((cur, snap(c0+KEEP/2))); cur = snap(c1-KEEP/2)
    pieces.append((cur, a1p))
    for s0,s1 in pieces: segs.append(dict(kind='talk', s0=s0, s1=s1))
t = 0.0
for s in segs:
    s['dur'] = round(s['s1']-s['s0'], 6); s['o0'] = t; t = round(t + s['dur'], 6)
TOTAL = t
def to_out(src):
    for s in segs:
        if s['kind']=='talk' and s['s0'] <= src <= s['s1']: return s['o0'] + (src - s['s0']), s
    return None, None
print(f'{len(segs)} segments, output {TOTAL:.1f}s')

# ---------- 3. cues ----------
FIX = json.loads((W/'fix.json').read_text()) if (W/'fix.json').exists() else {}
FILLERS = {'um','umm','uh','uhh','hmm','mm','er'}
# per-segment whisper: timestamps stay honest when the clip has no long silence
segdir = W/'segs'; segdir.mkdir(exist_ok=True)
cl = []
for i,s in enumerate(segs):
    if s['kind'] != 'talk': continue
    base = segdir/f"seg{i:02d}_{s['s0']:.2f}_{s['s1']:.2f}"
    if not Path(str(base)+'.json').exists():
        run(['ffmpeg','-y','-v','error','-ss',f"{s['s0']:.4f}",'-t',f"{s['dur']:.4f}",'-i',str(tom),'-ar','16000','-ac','1',str(base)+'.wav'])
        run(['whisper-cli','-m',os.path.expanduser('~/.cache/whisper-cpp/ggml-small.en.bin'),'-f',str(base)+'.wav','-l','en','-t','8','-ml','1','-sow','-oj','-of',str(base)],capture_output=True)
    for w in json.load(open(Path(str(base)+'.json')))['transcription']:
        txt = w['text'].strip()
        if not txt or txt.startswith('[') or txt.strip('.,!?').lower() in FILLERS: continue
        f, e = w['offsets']['from']/1000, w['offsets']['to']/1000
        e = min(e, s['dur']); f = min(f, e)
        if e - f > 1.2: f = e - 0.4
        cl.append((s['o0']+f, s['o0']+e, txt, s['o0']))
cues = []
cur = []
def flush():
    if not cur: return
    text = ' '.join(w[2] for w in cur)
    for a,b in FIX.items(): text = text.replace(a,b)
    cues.append(dict(t0=cur[0][0], t1=cur[-1][1]+0.25, text=text, style='t'))
    cur.clear()
for w in cl:
    if cur:
        text = ' '.join(x[2] for x in cur)
        gap_lim = 1.3 if len(text) < 24 else 0.7
        if (w[3] != cur[0][3] or w[0]-cur[-1][1] > gap_lim or len(text)+len(w[2]) > 64
            or (re.search(r'[.?!]$', text) and len(text) > 22) or w[0]-cur[0][0] > 4.5):
            flush()
    cur.append(w)
flush()
for s in segs:
    if s['kind']=='listen':
        cues.append(dict(t0=s['o0']+Q_LEAD, t1=s['o0']+Q_LEAD+qdur[s['q']]+0.35, text=QS[s['q']], style='q'))
cues.sort(key=lambda c: c['t0'])
for a,b in zip(cues, cues[1:]):
    a['t1'] = min(a['t1'], b['t0']-0.04)
    a['t1'] = max(a['t1'], a['t0']+0.6)
json.dump(dict(total=TOTAL, segs=segs, cues=cues), open(W/'plan.json','w'), indent=1)
if sys.argv[1:] == ['plan']:
    for c in cues: print(f"{c['t0']:7.2f} {c['style']} {c['text']}")
    sys.exit()

# ---------- 4. caption frames ----------
from PIL import Image, ImageDraw, ImageFont
FONT = ImageFont.truetype(str(W/'hanken-500.ttf'), 38)   # file named 500 is the SemiBold cut
VW, SH, LH, PX, PY, BOTTOM = 1280, 230, 47, 22, 13, 40
cap = W/'cap'; cap.mkdir(exist_ok=True)
for f in cap.glob('*.png'): f.unlink()
blank = Image.new('RGBA',(VW,SH),(0,0,0,0)); blank.save(cap/'blank.png')
def wrap(text, maxpx=1060):
    d = ImageDraw.Draw(blank); lines, line = [], ''
    for word in text.split():
        cand = (line+' '+word).strip()
        if d.textlength(cand, font=FONT) <= maxpx: line = cand
        else: lines.append(line); line = word
    lines.append(line); return lines
for i,c in enumerate(cues):
    lines = wrap(c['text'])
    if len(lines) > 2: lines = wrap(c['text'], 1180)
    img = Image.new('RGBA',(VW,SH),(0,0,0,0)); d = ImageDraw.Draw(img)
    ws = [d.textlength(l, font=FONT) for l in lines]
    bw, bh = max(ws)+2*PX, len(lines)*LH+2*PY-4
    x0, y1 = (VW-bw)/2, SH-BOTTOM; y0 = y1-bh
    d.rounded_rectangle([x0,y0,x0+bw,y1], radius=14, fill=(12,13,16,200))
    col = (255,255,255,255) if c['style']=='t' else (191,219,254,255)
    for j,l in enumerate(lines): d.text(((VW-ws[j])/2, y0+PY+j*LH-2), l, font=FONT, fill=col)
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
fc = [f"[0:v]split={N}" + ''.join(f'[v{i}]' for i in range(N)) + ';',
      f"[1:a]asplit={N}" + ''.join(f'[a{i}]' for i in range(N)) + ';']
for i,s in enumerate(segs):
    fc.append(f"[v{i}]trim=start={s['s0']:.4f}:end={s['s1']:.4f},setpts=PTS-STARTPTS[vs{i}];")
    fc.append(f"[a{i}]atrim=start={s['s0']:.4f}:end={s['s1']:.4f},asetpts=PTS-STARTPTS,afade=t=in:d=0.02,afade=t=out:st={s['dur']-0.02:.4f}:d=0.02[at{i}];")
    if s['kind']=='listen':
        fc.append(f"[{2+s['q']}:a]adelay={int(Q_LEAD*1000)}:all=1[q{i}];[at{i}][q{i}]amix=inputs=2:duration=first:normalize=0[as{i}];")
    else:
        fc.append(f"[at{i}]anull[as{i}];")
fc.append(''.join(f'[vs{i}][as{i}]' for i in range(N)) + f"concat=n={N}:v=1:a=1[vc][ac];")
fc.append(f"[vc]fps={FPS},crop=1408:792:106:144,scale=1280:720:flags=lanczos[vz];")
fc.append(f"[vz][10:v]overlay=0:{720-SH}:eof_action=pass:format=auto,fade=t=in:d=0.25,fade=t=out:st={TOTAL-0.6:.3f}:d=0.6,format=yuv420p[vout];")
fc.append(f"[ac]afade=t=out:st={TOTAL-0.6:.3f}:d=0.6,alimiter=limit=0.95:level=false[aout]")
(W/'graph.txt').write_text('\n'.join(fc))
cmd = ['ffmpeg','-y','-hide_banner','-loglevel','warning','-stats','-i',str(W/'raw.mov'),'-i',str(tom)]
for i in range(8): cmd += ['-i', str(W/f'q{i+1}.wav')]
cmd += ['-framerate',str(CFPS),'-i',str(cap/'c%05d.png'),'-filter_complex_script',str(W/'graph.txt'),
        '-map','[vout]','-map','[aout]','-c:v','libx264','-preset','slow','-crf','24','-profile:v','high','-g','60',
        '-c:a','aac','-b:a','96k','-ac','1','-movflags','+faststart','-t',f'{TOTAL:.3f}',str(W/'master.mp4')]
run(cmd)
run(['ffmpeg','-y','-v','error','-ss','440','-i',str(W/'raw.mov'),'-frames:v','1','-vf','crop=1408:792:106:144,scale=1280:720:flags=lanczos','-q:v','3',str(W/'poster.jpg')])
print('done', probe_dur(W/'master.mp4'), 's', os.path.getsize(W/'master.mp4')//1024, 'KB')
