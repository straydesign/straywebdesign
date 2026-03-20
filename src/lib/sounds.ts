let audioContext: AudioContext | null = null;
let soundEnabled = false;

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function toggleSound(): boolean {
  soundEnabled = !soundEnabled;
  if (soundEnabled && !audioContext) {
    audioContext = new AudioContext();
  }
  return soundEnabled;
}

function getContext(): AudioContext | null {
  if (!soundEnabled) return null;
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

function playTone(
  frequency: number,
  duration: number,
  volume: number = 0.05,
  type: OscillatorType = 'sine'
) {
  const ctx = getContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

  gainNode.gain.setValueAtTime(volume, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
}

export function playClick() {
  playTone(800, 0.08, 0.03);
}

export function playChatOpen() {
  playTone(523, 0.1, 0.04);
  setTimeout(() => playTone(659, 0.1, 0.04), 60);
}

export function playSuccess() {
  playTone(523, 0.15, 0.04);
  setTimeout(() => playTone(659, 0.12, 0.04), 100);
  setTimeout(() => playTone(784, 0.2, 0.04), 200);
}

export function playHover() {
  playTone(1200, 0.04, 0.015, 'sine');
}
