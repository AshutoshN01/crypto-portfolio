DASHBOARD_MODULES
=================

Detailed design for enhanced dashboard modules: Portfolio Health Score, AI Insights Widget, Portfolio Goals Widget, Market Sentiment Widget.

1) Portfolio Health Score
-------------------------
Purpose
- One-number health index summarizing portfolio quality, risk, diversification, and liquidity.

Formula (composite index)
- Score = 100 * (W_diversification * S_diversity + W_risk * S_risk + W_liquidity * S_liq + W_performance * S_perf + W_cost * S_cost)
  - Default weights (tunable): W_diversification 0.30, W_risk 0.25, W_liquidity 0.15, W_performance 0.20, W_cost 0.10

Sub-scores (0..1 normalized)
- S_diversity: measures concentration (1 - Herfindahl–Hirschman Index normalized)
- S_risk: based on asset volatility (lower volatility → higher score), currency blend risk, correlation matrix
- S_liq: weighted average of asset liquidity (on-chain volume or exchange volume normalized)
- S_perf: recent performance (30/90/365-day blended returns; penalize negative drawdowns)
- S_cost: fees, transaction inefficiencies, tax cost estimations

Calculation logic
- Jobs compute HHI and volatilities from market data time-series and transaction history nightly and on-demand.
- Use z-score normalization and clamp results between 0 and 1 before weighting.

UI Design
- Compact card on dashboard top-left showing numeric score (0–100), color-coded band (red/orange/green), small radar or mini-bar showing sub-scores on hover, tooltip with breakdown and suggestions for improvement (e.g., "Consider diversifying beyond BTC/ETH").

2) AI Insights Widget
----------------------
Purpose
- Provide concise, actionable insights about portfolio performance, anomalies, and opportunities using heuristics and ML models.

Data sources
- Portfolio transactions & holdings
- Market historical price series
- News sentiment signals
- On-chain indicators (optional)

Example insights
- "Your portfolio allocation to Solana increased 12% last week; consider rebalancing to target allocation X%."
- "Realized P&L for BTC pairs is +18% YTD; unrealized losses are concentrated in altcoins (top 3)."
- "News sentiment for [asset] turned negative; consider enabling an alert for 5% drop in 24h."

Layout
- Card with header "AI Insights"; list of 3–5 ranked insights; each insight has concise sentence, impact score (low/medium/high), quick actions (snooze, create alert, view details).

Future AI integration strategy
- Phase A: heuristic rule-engine with templated insights (safe, explainable).
- Phase B: lightweight ML models (classification/regression) trained on anonymized aggregated telemetry for pattern detection.
- Phase C: LLM-powered natural language explanations with guardrails and queryable context window (on-device or server-side with caching and QA).

Privacy & Safety
- Insights should avoid giving financial advice wording; use "insight" not "advice" and include explanations and source signals.

3) Portfolio Goals Widget
-------------------------
Purpose
- Track user goals (savings, target allocation) and visualize progress.

Tracking logic
- Each goal ties to a portfolio or global balance.
- currentValue computed from latest valuation job; progress = currentValue/targetValue.
- Milestones trigger notifications and optional rebalancing suggestions.

Progress visualization
- Circular progress ring for single goal; stacked progress bars for multiple goals; percentage, ETA (based on average monthly growth), and milestone markers (25/50/75/100).

Notifications
- Notify at milestone thresholds
- Configurable reminders before deadline

Milestones
- Allow user-defined milestones with optional auto-actions (e.g., rebalance when target reached).

4) Market Sentiment Widget
--------------------------
Purpose
- Provide at-a-glance market mood and signals to contextualize portfolio performance.

Components
- Fear & Greed Index: fetch from public sources (alternative: compute from volatility + volume metrics)
- Market Trend Signals: 7/30/90-day trend direction (bullish/neutral/bearish) per top market cap buckets
- Sentiment Indicators: aggregated news sentiment for portfolio assets; delta over 24h

UI
- Compact card showing: F&G gauge, trend sparkline, top 3 sentiment movers with delta chips, quick link to market page.

Data cadence
- Real-time for price-derived signals (every 1–5m), hourly for news-sentiment aggregates, daily for F&G external pulls.

End of DASHBOARD_MODULES
