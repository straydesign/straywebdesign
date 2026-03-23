# Showcase Tier — Portfolio & Agency Sites Only

The full SV-tier experience. Only for straywebdesign.co, straydesign.co, and select high-budget clients.

## Components

### HeroScene (React Three Fiber)
Full 3D hero with extruded logo, shader background, and environment lighting.
- Dynamic import with `ssr: false` fallback
- StrayLogo3D: SVG path extruded with metallic material
- ShaderBackground: Animated gradient mesh with cursor reactivity
- Float wrapper for subtle orbit animation
- WebGL fallback: CSS gradient background

### ShaderBackground
GLSL shader creating animated gradient mesh that responds to cursor position.
- Simplex noise-based color fields
- Navy → electric blue → purple palette
- `mousePosition` prop for cursor reactivity
- Pure GPU computation

### ChatWidget (Claude-Powered)
Floating chat button that opens a conversation with Claude Haiku.
- Streaming SSE responses
- Rate-limited (10 req/min per IP)
- Pre-loaded with business context via system prompt
- Message history, typing indicator
- No PII storage

### AuditTool
Visitor enters URL, gets real-time Lighthouse scores with animated gauges.
- PageSpeed Insights API integration
- Skeleton loading states
- CountUp + LighthouseGauge for score display
- Core Web Vitals breakdown (FCP, LCP, CLS, TBT)
- Haptic feedback on score reveal
- CTA to book consultation

### Sound Design
Micro-sounds on key interactions. Muted by default, opt-in via SoundToggle.
- Web Audio API synthesis (no audio files)
- `playClick()`, `playChatOpen()`, `playSuccess()`, `playHover()`
- SoundToggle component in footer

### Haptic Feedback
`navigator.vibrate()` on mobile for CTA taps and score reveals.
- Integrated into MagneticButton (10ms pulse)
- AuditTool score reveal (pattern: 50-30-50ms)

## Dependencies

```
@react-three/fiber @react-three/drei @react-three/postprocessing three @types/three
@anthropic-ai/sdk
```

## Rules

1. **3D must have fallback** — CSS gradient when WebGL unavailable
2. **Chat widget** must be rate-limited and never store PII
3. **Sound is opt-in only** — muted by default
4. **Haptics are mobile-only** — check `'vibrate' in navigator`
5. **All R3F components** must be dynamically imported
6. **Shader background** must not exceed 60fps target on mid-range devices
