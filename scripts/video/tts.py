#!/usr/bin/env python3
"""Interviewer questions -> q1..q8.mp3. eleven_v3 (most natural) with a conversational voice; falls back to multilingual_v2."""
import json, subprocess, sys, urllib.request, urllib.error
from pathlib import Path
W = Path(__file__).parent
KEY = subprocess.run([str(Path.home()/'.claude/hooks/secrets-helper.sh'),'get','elevenlabs','api-key'],capture_output=True,text=True).stdout.strip()
VOICE = 'cgSgspJ2msm6clMCkdW9'   # Jessica — expressive, conversational, American
Q_TTS = [
 "So, tell me about this shop. Before the site, how were people finding them?",
 "Okay, so what actually happens when you take a shop like that on?",
 "And what happens to a site like this after a few months?",
 "So who keeps it current?",
 "What do people usually ask you before they say yes?",
 "You're the local guy for these shops. What does that actually mean for them?",
 "What do owners say afterward?",
 "If someone's watching this and they've never had a site... what should they do?",
]
def tts(text, model, settings):
    req = urllib.request.Request(
        f'https://api.elevenlabs.io/v1/text-to-speech/{VOICE}?output_format=mp3_44100_128',
        data=json.dumps(dict(text=text, model_id=model, voice_settings=settings)).encode(),
        headers={'xi-api-key': KEY, 'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=120) as r: return r.read()
used = None
for i, text in enumerate(Q_TTS):
    out = W/f'q{i+1}.mp3'
    if out.exists(): continue
    tries = [('eleven_v3', dict(stability=0.5, similarity_boost=0.75)),
             ('eleven_multilingual_v2', dict(stability=0.32, similarity_boost=0.7, style=0.55, use_speaker_boost=True))]
    if used: tries = [t for t in tries if t[0] == used]
    for model, st in tries:
        try:
            out.write_bytes(tts(text, model, st)); used = model
            print(f'q{i+1} {model} {out.stat().st_size//1024} KB'); break
        except urllib.error.HTTPError as e:
            print(f'q{i+1} {model} HTTP {e.code}: {e.read()[:200]!r}', file=sys.stderr)
    else: sys.exit(f'q{i+1} failed')
print('model used:', used)
