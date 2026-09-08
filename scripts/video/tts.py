#!/usr/bin/env python3
"""Interviewer questions -> q1..q11.mp3. eleven_v3 (most natural) with a conversational voice; falls back to multilingual_v2."""
import json, subprocess, sys, urllib.request, urllib.error
from pathlib import Path
W = Path(__file__).parent
KEY = subprocess.run([str(Path.home()/'.claude/hooks/secrets-helper.sh'),'get','elevenlabs','api-key'],capture_output=True,text=True).stdout.strip()
VOICE = 'cgSgspJ2msm6clMCkdW9'   # Jessica — expressive, conversational, American
Q_TTS = [
 "So, the owner watching this. How are people finding your shop right now?",
 "Before the how. Why do you do this?",
 "Okay. So what happens when you take a shop on?",
 "So what happens to a site when nobody's looking after it?",
 "Okay, so who keeps it current?",
 "Say they're in. What actually happens next?",
 "Who is this for? And who isn't it for?",
 "The one everybody asks. How much of their time does this take?",
 "You're local. What does that mean for them?",
 "How do they know you'll stay reliable for them?",
 "What do other owners say afterward?",
 "What does it cost? People want the number.",
 "Last one. What should they do next?",
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
