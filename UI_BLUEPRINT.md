UI_BLUEPRINT
============

High-fidelity visual blueprint for pages and layouts (non-implementation). Focus: hierarchy, component placement, content flow, and interactions on mobile & desktop.

1) Landing Page
----------------
Sections
- Hero: large Display XL heading, subtext, CTA (Get started), subtle hero gradient and mesh.
- Features: three-column feature cards with icons and short copy.
- Statistics: market/global stats row with stat cards.
- Portfolio Preview: mock dashboard card with CTA to sign up.
- Market Preview: top coins carousel with live prices.
- How It Works: 3-step flow with illustrations.
- Security: short items with badges and trust signals.
- Testimonials + FAQ + Newsletter + Footer.

Component placement & hierarchy
- Hero at top full-width, CTA primary; features follow; reserve negative space for breath.

User journey
- Landing → Sign up modal or redirect to Register → Quick onboarding.

2) Dashboard
-------------
Sections
- Left: collapsible `Sidebar` (nav)
- Top: `Topbar` with search and user menu
- Main: grid of cards: (1) Portfolio Value Card (prominent), (2) Portfolio Health Score, (3) Asset Allocation Chart, (4) Portfolio Growth Chart, (5) Recent Transactions, (6) Watchlist, (7) News

Component placement
- Portfolio Value top-left, growth chart wide across top row.

Interaction flow
- Click asset → Asset Details page; hover on card → quick actions; keyboard shortcut to open CommandPalette.

3) Portfolio Page
-----------------
Sections
- Header with portfolio selector, actions (export, share)
- Holdings table (search + filters), right-hand summary panel with allocation pie, goals widget, quick actions.

User flows
- Add transaction modal opens over content; optimistic update applied to holdings and transactions table.

4) Asset Details Page
---------------------
Sections
- Top: asset header (name, symbol, price, 24h change)
- Main: large interactive chart (range selector), market stats, supply info
- Right: user holdings summary, trade/txn buttons, related news

Interactions
- Time-range switch updates chart and analytics; add-to-watchlist inline action.

5) Watchlist
------------
Layout
- List of assets with price, 24h delta, sparkline, quick create-alert button. Supports reorder and grouping.

6) Analytics
------------
Sections
- Portfolio growth over time, attribution analysis, monthly returns heatmap, risk metrics, comparison controls.

7) News
-------
Layout
- Filterable list with category chips, article cards with sentiment badge, ability to bookmark and share.

8) Settings
-----------
Sections
- Account, Security (password, 2FA), Api & Integrations, Notification preferences, Theme & Display, Privacy

Responsive considerations
-----------------------
- Mobile
  - Single-column, bottom navigation for quick access, sidebar collapses to drawer, charts simplified to sparklines.
- Tablet
  - Two-column main layout; stack charts vertically where space is constrained.
- Desktop
  - Multi-column grid; persistent left nav; content width capped for readability (~1200px).
- Ultra Wide
  - Allow additional secondary panels (activity feed, expanded charts) and more dashboard widgets per row.

Accessibility & interactions
---------------------------
- Ensure keyboard focus order flows: Sidebar → Topbar → Main content.
- Provide accessible table controls (aria-sort, keyboard pagination).
- Charts: provide accessible data table fallback and aria-describedby summaries.

Micro interactions
------------------
- Hover states on cards, small lift and glow.
- Toasts for successful saves and errors.
- Inline validation messages on forms.

End of UI_BLUEPRINT
