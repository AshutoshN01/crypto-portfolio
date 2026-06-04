DESIGN_SYSTEM_V2
================

Version: 2 — Comprehensive design system for Crypto Portfolio Platform

Overview
--------
This document defines the complete visual system: typography, spacing, radii, shadows, gradients, animations, glass rules, card rules, responsive guidelines, and accessibility constraints. It is dark-first and tuned for a premium, minimal, high-trust fintech product.

1) Typography System
--------------------
Font family
- Primary: Inter (Inter var) — preferred for UI text; fallbacks: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial
- Display / Headings: Inter Variable with heavier weights; use condensed fonts sparingly for display only.

Styles (desktop baseline; scale down for mobile with proportionate line-height)

- Display XL
  - font-family: Inter, system-ui
  - font-size: 48px
  - weight: 700
  - line-height: 56px
  - usage: Landing hero headings, modal hero

- Display Large
  - font-size: 40px
  - weight: 700
  - line-height: 48px
  - usage: Section hero, marketing headers

- Display Medium
  - font-size: 32px
  - weight: 600
  - line-height: 40px
  - usage: Dashboard page titles

- Heading Large
  - font-size: 24px
  - weight: 600
  - line-height: 32px
  - usage: Card titles, section headings

- Heading Medium
  - font-size: 20px
  - weight: 600
  - line-height: 28px
  - usage: Widget headings, form section headings

- Heading Small
  - font-size: 16px
  - weight: 600
  - line-height: 24px
  - usage: Table headers, small card titles

- Body Large
  - font-size: 16px
  - weight: 400
  - line-height: 24px
  - usage: Primary body copy, form labels

- Body Medium
  - font-size: 14px
  - weight: 400
  - line-height: 20px
  - usage: Secondary copy, helper text

- Body Small
  - font-size: 12px
  - weight: 400
  - line-height: 16px
  - usage: Timestamps, microcopy

- Caption
  - font-size: 11px
  - weight: 500
  - line-height: 14px
  - usage: Badges, inline captions

Usage examples
- Hero: Display XL
- Dashboard header: Display Medium
- Card title: Heading Large
- KPI number: Heading Large with weight 700 and tracking -0.01em
- Body text: Body Large

2) Spacing System
------------------
Atomic spacing scale (px): 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120, 160

Guidelines
- Use multiples of 8 for grid-based layout; 4 is the smallest micro-gap.
- Containers: horizontal padding 24 (desktop), 16 (tablet), 12 (mobile).
- Vertical rhythm: prefer 16/24 for body spacing; gap between stacked cards 24.
- Grid columns: 12-column 16px gutter baseline using 24px outer gutters on desktop.
- Use 32/40 for distinct section spacing (hero → features); 64+ reserved for marketing and major sections.

3) Border Radius System
-----------------------
- XS: 4px — micro-controls (buttons compact)
- SM: 6px — small pills, inputs
- MD: 12px — cards, modals
- LG: 18px — large containers, hero panels
- XL: 24px — floating widgets
- 2XL: 32px — special callouts
- 3XL: 48px — full rounded hero containers (rare)

4) Shadow System
-----------------
Design principle: shadows are subtle with tinted glows for premium depth. Use only 1–2 elevation layers per screen.

- Card Shadow
  - CSS: 0 6px 18px rgba(0,0,0,0.55), 0 1px 0 rgba(255,122,195,0.02)
  - usage: surface cards (slight lift)

- Floating Widget Shadow
  - CSS: 0 12px 40px rgba(0,0,0,0.6), 0 2px 4px rgba(166,140,255,0.04)

- Glass Shadow
  - CSS: 0 8px 30px rgba(15,17,21,0.5)

- Modal Shadow
  - CSS: 0 20px 80px rgba(0,0,0,0.7)

- Premium Glow Shadow
  - CSS (accent): 0 4px 30px rgba(255,122,195,0.12), 0 0 40px rgba(166,140,255,0.06)
  - usage: active primary call-to-action, selected nav

5) Gradient System
------------------
Use gradients sparingly: hero backgrounds, CTA buttons, and subtle card accents.

- Primary Gradients
  - linear-gradient(135deg, #FF7AC3 0%, #A68CFF 100%)

- Secondary Gradients
  - linear-gradient(90deg, #B8FF72 0%, #52FF91 100%)

- Hero Gradients
  - radial-gradient(closest-side at 10% 20%, rgba(166,140,255,0.12), transparent 40%), linear-gradient(180deg,#050505,#0F1115)

- Card Gradients
  - subtle top-to-bottom tint: linear-gradient(180deg, rgba(255,255,255,0.02), transparent)

- Button Gradients
  - primary: linear-gradient(180deg,#FF7AC3,#A68CFF)
  - ghost: transparent with accent border and faint inner glow

- Background Mesh Gradients
  - very subtle mesh: large soft radial blobs with <6% opacity used behind hero

6) Animation System
-------------------
Principles: fast, subtle, meaningful. Honor reduced-motion user settings.

Easing tokens
- ease-quick: cubic-bezier(.2,.9,.3,1)
- ease-standard: cubic-bezier(.2,.8,.2,1)
- ease-smooth: cubic-bezier(.22,.9,.36,1)

Durations and motions
- Hover Animation
  - duration: 160ms
  - easing: ease-quick
  - style: small translateY(-4px) + scale(1.01) + shadow intensify

- Card Hover
  - duration: 220ms
  - easing: ease-standard
  - style: translateY(-6px), soft glow, raise z-index

- Button Hover
  - duration: 140ms
  - easing: ease-quick
  - style: scale(1.02), gradient shift, shadow accent

- Page Transition
  - duration: 320ms
  - easing: ease-smooth
  - style: fade + slight vertical offset + micro delay on large pages

- Modal Transition
  - duration: 240ms
  - easing: ease-smooth
  - style: scale from 0.98 to 1 + fade in overlay

- Drawer Animation
  - duration: 220ms
  - easing: ease-standard
  - style: slide from side + content dim

- Loading Animation
  - duration: loop 1400ms
  - style: subtle pulsation on skeletons and spinners

- Skeleton Animation
  - duration: 1200ms
  - easing: linear
  - style: left-to-right shimmering gradient

- Route Transition
  - duration: 280ms
  - easing: ease-smooth
  - style: crossfade with directional slide based on nav hierarchy

- Scroll Reveal
  - duration: 480ms
  - easing: ease-smooth
  - style: opacity + translateY(12px) stagger 40ms

- Micro-interactions
  - durations: 120–200ms
  - style: tactile feedback (press down, subtle bounce)

Reduced motion
- If prefers-reduced-motion, all transforms become instant fades; remove parallax and complex easing.

7) Glassmorphism Rules
----------------------
Use glass sparingly to create premium layered surfaces.

- Blur levels
  - low: blur(6px)
  - medium: blur(12px)
  - high: blur(20px)

- Opacity levels
  - subtle: rgba(255,255,255,0.02)
  - medium: rgba(255,255,255,0.04)
  - strong: rgba(255,255,255,0.06)

- Border rules
  - thin border of rgba(255,255,255,0.04) with 1px backdrop-filter: blur(6px)

- Usage rules
  - Use for top-level hero panels, floating widgets, and ephemeral overlays.
  - Avoid using glass for dense data tables or low-contrast text areas.

8) Card Design Rules
--------------------
Cards are the primary information container. They must be consistent and readable.

- Portfolio Cards
  - MD radius, card shadow, KPI on left, sparkline on right, small action menu top-right.

- Analytics Cards
  - LG radius, top title and date filter, chart area occupies 70% height, key metrics row below.

- Market Cards
  - compact, SM radius, badge for price change (green/red), small 24px icon.

- News Cards
  - MD radius, image thumbnail left, summary right, tag row bottom.

- Widgets
  - consistent padding (16–20), header row with action button, body with chart or list, footer optional.

- Stat Cards
  - emphasize numeric value (Heading Large), delta chip, small line chart under.

- Chart Containers
  - background: card gradient + subtle inner shadow, rounded corners, full bleed chart with padding.

9) Responsive Design Rules
-------------------------
- Breakpoints (min-width)
  - Mobile: 0–639px
  - Tablet: 640–1023px
  - Desktop: 1024–1439px
  - Ultra-wide: 1440px+

Guidelines
- Mobile-first. Collapsible side nav becomes bottom nav on very small devices.
- Use a single-column stack on mobile, two/three columns on tablet, up to 4–5 columns on ultra-wide depending on dashboard density.

10) Accessibility Rules
----------------------
- Color contrast: text large/pass AA; body text pass AA (4.5:1) on backgrounds; accent text must pass minimum 3:1 for small text where possible.
- Keyboard navigation: all interactive elements focusable; visible focus ring using accent with 3px outline offset.
- Screen reader: ARIA labels for live regions (notifications), charts provide textual summaries and data tables.
- Reduced motion: respect `prefers-reduced-motion`.
- Form controls: use labels, error messaging, and role attributes.

Tokens (example JSON for integration)
```
{
  "color": {"bg":"#050505","surface":"#14161C","primary":"#FF7AC3","accent":"#B8FF72","text":"#FFFFFF","muted":"#A0A6B3"},
  "radius": {"sm":"6px","md":"12px","lg":"18px"},
  "shadow": {"card":"0 6px 18px rgba(0,0,0,0.55)"},
  "space": [4,8,12,16,20,24,32,40,48,64,80,96,120,160]
}
```

End of DESIGN_SYSTEM_V2
