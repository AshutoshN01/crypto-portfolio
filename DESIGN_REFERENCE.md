DESIGN_REFERENCE
================

Product analyses and lessons for the Crypto Portfolio Platform

Overview
--------
This document analyzes seven reference products — Apple, Stripe, Linear, Vercel, Coinbase, Raycast, Notion — across UI and UX dimensions and extracts specific lessons to apply.

1) Apple
---------
- Typography: Large type scale, generous leading, system font for trust and speed.
- Spacing: Generous whitespace, consistent baselines, predictable rhythm.
- Navigation: Simple top-level nav on web; clear hierarchy.
- Cards: Minimal, ample padding, subtle depth.
- Animations: Fluid, physics-driven, subtle parallax, consistent easing.
- Visual Hierarchy: Strong typographic contrast and precise alignment.
- Dashboard Structure: Clean, few controls, focus on clarity.
- Interaction Design: Immediate feedback, clear affordances.
- Loading States: Skeletons with subtle shimmer.
- Empty States: Helpful, action-driven with CTA.

Apply: Use system fonts, generous spacing for trust, subtle physics-based motion.

2) Stripe
---------
- Typography: Clear, modern, scale for documentation and UI.
- Spacing: Large gutters, clear section delineation.
- Navigation: Focused left rail for app; simple top controls.
- Cards: Functional with strong microcopy.
- Animations: Micro-interactions for form controls, button feedback.
- Visual Hierarchy: Emphasis on data clarity and CTA prominence.
- Dashboard Structure: Dense data surfaces with clear separation.
- Interaction Design: Low friction flows, inline validation.
- Loading States: Progressive loading with skeleton + real data placeholders.
- Empty States: Contextual help and docs links.

Apply: Prioritize data clarity, inline validation, comfortable defaults for forms.

3) Linear
---------
- Typography: Minimal, utilitarian; strong typographic rhythm in lists.
- Spacing: Compact but consistent.
- Navigation: Keyboard-centric, command palette.
- Cards: Compact list cards with actionable affordances.
- Animations: Fast, functional; route transitions are snappy.
- Visual Hierarchy: Dense information with clear focus states.
- Dashboard Structure: Task-first, list-centric.
- Interaction Design: Keyboard-first, quick actions.
- Loading States: Fast skeletons and optimistic UI.
- Empty States: Lightweight guidance to take action.

Apply: Support keyboard shortcuts, fast route transitions, and compact data lists for power users.

4) Vercel
---------
- Typography: Clean, tight scale; large CTAs on marketing pages.
- Spacing: Generous on marketing, dense on dashboard.
- Navigation: Minimal top-level nav, clear product signposts.
- Cards: Lightweight with strong CTA emphasis.
- Animations: Smooth entrance animations, subtle reveals on scroll.
- Visual Hierarchy: Marketing vs dashboard clarity.
- Dashboard Structure: Actionable items and quick status checks.
- Interaction Design: Fast feedback on deploys and logs.
- Loading States: Real-time updates with toasts.
- Empty States: Guided getting-started flows.

Apply: Provide clear status and ephemeral feedback; marketing-grade hero designs for landing.

5) Coinbase
-----------
- Typography: Robust scale, readable numerics.
- Spacing: Balanced between data density and readability.
- Navigation: Left rail with nested items, mobile bottom nav.
- Cards: Market cards with clear price delta chips.
- Animations: Price tickers, small motion on live data.
- Visual Hierarchy: Numeric emphasis, color-coded deltas.
- Dashboard Structure: Portfolio-first with market feed.
- Interaction Design: Quick buy/sell flows, confirmations.
- Loading States: Tickers paused state; skeletons for heavy data.
- Empty States: Prompt to add funds or add holdings.

Apply: Numeric readability, live price updates, strong delta color system.

6) Raycast
----------
- Typography: Compact, legible small text.
- Spacing: Compact lists optimized for quick scanning.
- Navigation: Command palette and keyboard-centric navigation.
- Cards: Minimal list items with rich keyboard affordances.
- Animations: Instant, very low-latency interactions.
- Visual Hierarchy: Focus on single-line clarity and speed.
- Dashboard Structure: Tool-integrated quick actions.
- Interaction Design: Keyboard-first composability.
- Loading States: Instant feedback; spinners minimal.
- Empty States: Actionable guidance to add integrations.

Apply: Add command palette for power users and quick actions on dashboard.

7) Notion
---------
- Typography: Modular, comfortable for long-form and data.
- Spacing: Flexible blocks and generous whitespace.
- Navigation: Left sidebar heavy, hierarchical.
- Cards: Blocks that can be composed; high flexibility.
- Animations: Gentle block transitions, drag handles.
- Visual Hierarchy: Clear headings, block types.
- Dashboard Structure: Workspace-centric, user-configurable.
- Interaction Design: Drag and drop, inline editing.
- Loading States: Placeholders for blocks; inline saving indicators.
- Empty States: Templates and starter content.

Apply: Allow configurable widgets and drag/arrange behavior for advanced users.

Cross-product lessons & how to apply
-----------------------------------
- Trust and clarity are primary: use system fonts, high contrast, and whitespace.
- Speed matters: snappy transitions, optimistic updates, keyboard shortcuts.
- Progressive disclosure: surface key metrics, hide deep controls behind drill-downs.
- Data-first design: make numbers legible, provide contextual tooltips and drill-ins.
- Onboarding & empty states: provide starter content and templates for first-time users.

Conclusions for Crypto Portfolio Platform
----------------------------------------
- Typography: adopt system font (Inter) with clear numeric styles for values.
- Spacing: balanced; marketing pages use generous spacing, dashboards use denser layout with retention of breathing room.
- Navigation: left rail for app, top utility bar, bottom nav fallback on mobile; provide quick actions and command palette.
- Cards: consistent, readable cards emphasizing numeric data and sparklines.
- Animations: subtle, purposeful, respect reduced motion.
- Loading & Empty States: skeletons, helpful CTAs, and optimistic flows for transactions and watchlists.
