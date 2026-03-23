# Stray Web Design — Interaction Tier System

Every client site gets a tier-appropriate set of interactions. No site ships without the Foundation tier. Premium and Showcase tiers are layered on top based on project scope.

## The Three Tiers

| Tier | When to Use | Components |
|------|-------------|------------|
| **Foundation** | Every site, always | AnimateIn, MagneticButton, GrainOverlay, CountUp, CustomCursor, SmoothScroll (Lenis), GradientText, WordReveal |
| **Premium** | High-value clients, competitive markets | TiltCard, ParallaxWindow, HorizontalScroll, PinnedComparison, PageTransitions, PersonalizedText |
| **Showcase** | Portfolio/agency sites, SV-tier clients | 3D Hero (R3F), ShaderBackground, AI Chat (Claude), AuditTool, Sound Design, Haptics |

## Quick Start

1. Read [01-foundation-tier.md](01-foundation-tier.md) — required on every build
2. Check [04-performance-budget.md](04-performance-budget.md) — know the limits
3. Check [05-accessibility.md](05-accessibility.md) — non-negotiable
4. Reference [07-component-api.md](07-component-api.md) for props/usage
5. Run [06-implementation-checklist.md](06-implementation-checklist.md) before deploy

## Files

- `01-foundation-tier.md` — Required interactions for every site
- `02-premium-tier.md` — Advanced interactions for high-value clients
- `03-showcase-tier.md` — Cutting-edge interactions for portfolio/agency sites
- `04-performance-budget.md` — Bundle targets, lazy loading, Core Web Vitals budgets
- `05-accessibility.md` — prefers-reduced-motion, keyboard nav, WCAG 2.1 AA
- `06-implementation-checklist.md` — Pre-deploy quality gate per tier
- `07-component-api.md` — Props and usage for every reusable component
