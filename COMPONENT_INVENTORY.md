COMPONENT_INVENTORY
===================

Complete component inventory with purpose, props, state, dependencies, and usage examples. Components are design- and API-agnostic; implement in TypeScript in Phase 2.

1) Layout Components
- `AppShell`
  - Purpose: top-level layout with Sidebar, Topbar, Content area.
  - Props: `children`, `sidebarCollapsed`, `onToggleSidebar`.
  - State: none (controlled)
  - Dependencies: `Sidebar`, `Topbar`
  - Usage: wraps pages to provide consistent layout.

- `Sidebar`
  - Purpose: primary navigation, collapsible.
  - Props: `items`, `activeKey`, `onNavigate`.
  - State: collapsed (internal or controlled)
  - Dependencies: `IconButton`, `NavItem`

- `Topbar`
  - Purpose: global actions, user menu, quick search.
  - Props: `onSearch`, `onNotificationsClick`.
  - State: searchQuery

2) UI Primitives
- `Button`
  - Purpose: primary interaction.
  - Props: `variant`, `size`, `onClick`, `loading`, `disabled`.
  - State: none
  - Dependencies: design tokens

- `IconButton`
  - Purpose: icon-only action.
  - Props: `icon`, `onClick`, `ariaLabel`

- `Input`, `Select`, `TextArea`, `Switch`, `Checkbox`
  - Purpose: form primitives
  - Props: usual control props; support `register` for react-hook-form.

- `Card`
  - Purpose: surface container
  - Props: `title`, `actions`, `footer`, `children`, `size`

3) Dashboard Components
- `PortfolioCard`
  - Purpose: show portfolio value, P&L, small sparkline
  - Props: `portfolioId`, `value`, `change`, `sparklineData`
  - Dependencies: `ChartSparkline`, `KPI`

- `WatchlistWidget`
  - Purpose: list of watched assets with quick actions
  - Props: `items`, `onAdd`, `onRemove`, `onAlert`

- `AlertWidget`
  - Purpose: show active alerts and recent triggers
  - Props: `alerts`, `onDismiss`

4) Analytics Components
- `KPI`
  - Purpose: display key metric, delta, and mini-chart
  - Props: `value`, `delta`, `trendData`, `trendPeriod`

- `PerformanceChart`
  - Purpose: full-size portfolio growth chart
  - Props: `series`, `onHover`, `onRangeChange`
  - Dependencies: `Recharts` wrappers

5) Charts
- `LineChartWrapper`, `AreaChartWrapper`, `BarChartWrapper`, `PieChartWrapper`
  - Purpose: standardize chart props, legends, tooltips, responsive behavior
  - Props: `data`, `height`, `colors`, `options`

6) Forms
- `Form`, `FormField`, `FormActions`
  - Purpose: consistent form layout with react-hook-form integration
  - Props: `onSubmit`, `defaultValues`, `validationSchema`

7) Tables
- `DataTable`
  - Purpose: paginated, sortable, virtualized table with column definitions
  - Props: `columns`, `data`, `rowKey`, `onSort`, `onRowClick`, `pageSize`

8) Modals & Drawers
- `Modal`
  - Props: `isOpen`, `onClose`, `title`, `size`
- `Drawer`
  - Props: `isOpen`, `side`, `onClose`

9) Notifications
- `Toast` service + `ToastContainer`
  - Purpose: ephemeral feedback
  - Props: `position`, `timeout`

- `NotificationPanel`
  - Purpose: full notification inbox

10) Widgets & Cards
- `NewsCard`, `MarketCard`, `TransactionRow`, `HoldingRow`

11) Loading & Error
- `Skeleton`, `Spinner`, `EmptyState`, `ErrorBoundary`

12) Specialized
- `CommandPalette`
  - Purpose: keyboard-first quick actions (search, navigate, create)
  - Props: `items`, `onSelect`

13) Integration components
- `ProviderConnectors` (WalletConnect, etc.)

Implementation notes
- Keep components small and focused; prefer composition.
- All components accept `className` and `data-testid` for testing.
- Use design tokens and theme context for colors/spacing.

End of COMPONENT_INVENTORY
