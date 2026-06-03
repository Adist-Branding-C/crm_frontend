# Frontend Architecture

## Overview

This CRM frontend is built on **React 19** with **TypeScript 6** and **Vite 8**. The architecture follows a **feature-based domain model** where business capabilities are encapsulated in self-contained modules under `src/features/`. A shared library under `src/shared/` provides reusable UI components, hooks, constants, and styles consumed by features.

### Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Language | TypeScript 6 |
| Build Tool | Vite 8 |
| Routing | react-router-dom v7 |
| Icons | lucide-react |
| Charts | recharts v3 |
| Linting | ESLint v10 |
| Styling | Global CSS (co-located) |

---

## Feature-Based Architecture

Every business domain is modeled as a **feature module** under `src/features/<feature-name>/`. Features own their pages, components, hooks, constants, types, services, and utils.

### Feature Module Structure

```
src/features/branch/
  components/     -- feature-specific UI components
  constants/      -- form field definitions, table column configs, enum-like objects
  hooks/          -- feature-specific React hooks
  pages/          -- page-level components (1 per route)
  services/       -- API service functions
  types/          -- TypeScript interfaces and types
  utils/          -- pure utility functions
```

### Feature Categories

Features fall into three tiers based on complexity:

**Tier 1 — Full CRUD (7+ folders)**
Complete implementation with all sub-folders. Examples: `branch`, `companies`, `deals`, `enquiries`, `roles`, `settings`, `staff-performance`.

**Tier 2 — Mid-Tier (3-5 folders)**
Includes pages, constants, types, and optionally components/hooks. Examples: `calendar`, `campaigns`, `reports`, `spotlight`, `tasks`.

**Tier 3 — Minimal (1-2 folders)**
Simple configuration pages with only constants and a page component. Examples: `call-reason`, `call-status`, `deal-stages`, `meeting-outcome`, `task-categories`.

### Feature Independence

Features should:
- Import only from `src/shared/` or external libraries
- NOT import directly from other features
- Export only what other features need (typically just page components)
- Own their routing entries (page components are imported by route modules)

---

## Shared Layer (`src/shared/`)

The shared layer provides reusable building blocks consumed by all features.

### Shared Components (`src/shared/components/`)

**CRUD Components** — A reusable admin CRUD system:
- `AdminTable` — Generic data table with actions dropdown
- `AdminToolbar` — Search input + Add button
- `AdminPagination` — Page navigation controls
- `AdminFormDrawer` — Slide-out form drawer with dynamic fields
- `AdminDeleteModal` — Confirmation modal for delete

**Layout Components** — Application shell:
- `DashboardLayout` — Main app shell: Sidebar + TopNav + `<Outlet />`
- `PageHeader` — Title, description, optional action buttons
- `PageContainer` — Content width wrapper
- `Sidebar` — Left navigation sidebar
- `TopNav` — Top bar with search, notifications, user menu

**Drawer Components** — Business-specific drawers:
- `AddCampaignDrawer`, `AddDealDrawer`, `AddDealTaskDrawer`, `AddLeadDrawer`

### Shared Hooks (`src/shared/hooks/`)

- `useCrudData` — Full CRUD state management (data, search, pagination, form, delete)
- `useClickOutside` — Detect clicks outside a ref
- `useSearchFilter` — Generic search/filter on data arrays
- `useTablePagination` — Pagination state and logic
- `useTableSelection` — Multi-row selection state
- `useTableSorting` — Column sorting state and logic

### Shared Constants (`src/shared/constants/`)

- `actionLabels` — "Edit", "Delete", "Save", "Update", etc.
- `labels` — "Show", "entries", "Sl No", "Actions", "No data available"
- `navigation` — Add options, notifications, search categories
- `pagination` — `DEFAULT_ROWS_PER_PAGE`, `ROWS_OPTIONS`
- `sidebar` — Sidebar menu item definitions
- `statuses` — `STATUS_ACTIVE`, `STATUS_INACTIVE`, `STATUS_PENDING`

### Shared Styles (`src/shared/styles/`)

15 CSS files covering: badges, buttons, drawers, dropdowns, filters, forms, modals, pagination, settings-layout, sidebar-layout, stat-cards, status-badges, tables, tabs, toolbars.

---

## Routing Architecture

Routes are modularized into domain-based files under `src/routes/`. Each file exports a fragment of `<Route>` elements.

### Route Module Layout

```
src/routes/
  index.tsx               -- Master assembler: BrowserRouter + Routes + catch-all
  ProtectedRoute.tsx      -- Auth guard component
  authRoutes.tsx          -- /login, /forgot-password, /reset-password
  dashboardRoutes.tsx     -- Dashboard, spotlight, calendar, etc.
  leadRoutes.tsx          -- Leads, enquiries, campaigns, etc.
  settingsRoutes.tsx      -- Settings, lead-settings, user config
  adminRoutes.tsx         -- Account management
  salesRoutes.tsx         -- Deals, deal config
  reportsRoutes.tsx       -- /reports/*
  taskRoutes.tsx          -- /user/tasks/*
```

### Route Assembly

`index.tsx` uses `react-router-dom` v7 to assemble:

```
<BrowserRouter>
  <Routes>
    {authRoutes}                          -- unprotected auth pages
    <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
      {dashboardRoutes}                   -- all protected routes
      {leadRoutes}
      {settingsRoutes}
      {adminRoutes}
      {salesRoutes}
      {reportsRoutes}
      {taskRoutes}
    </Route>
    <Route path="*" element={<Navigate to="/login" />} />  -- catch-all
  </Routes>
</BrowserRouter>
```

### Auth Protection

- `ProtectedRoute` checks `localStorage.getItem('crm_token')`
- Unauthenticated users redirect to `/login`
- Protected routes render inside `DashboardLayout` which provides `<Outlet />`

---

## Constants / Types / Hooks / Components Separation

Each feature enforces separation of concerns through its sub-folder structure:

| Layer | Responsibility | Rules |
|-------|---------------|-------|
| `pages/` | Page components | Assembles UI from shared + feature components. One file per route. |
| `components/` | Feature-specific UI | Pure presentational or connected to feature hooks. No business logic. |
| `hooks/` | State logic + side effects | Custom hooks that encapsulate useState, useEffect, API calls. |
| `constants/` | Static configuration | Form fields, table columns, enum maps, route paths. No logic. |
| `types/` | TypeScript definitions | Interfaces, types, enums. No runtime code. |
| `services/` | API communication | Functions that call backend endpoints. Return promises. |
| `utils/` | Pure helpers | Non-React utility functions. No hooks, no JSX. |

---

## Reusable CRUD Architecture

The standard CRUD pattern for admin/configuration features:

1. **Define constants** (`constants/index.ts`):
   - `formFields: FormField[]` — field definitions for the form drawer
   - `columns` — table column configuration

2. **Use shared hook** in page component:
   - `useCrudData(mockData)` — manages search, pagination, form state, delete

3. **Compose page** from shared components:
   ```
   <PageHeader />
   <SettingsTabs />
   <AdminToolbar />
   <AdminTable />
   <AdminPagination />
   <AdminFormDrawer />
   <AdminDeleteModal />
   ```

### Data Flow

```
Page Component
  |-- useCrudData() hook manages all state
  |-- AdminToolbar -> dispatches search/add
  |-- AdminTable -> displays filtered+paged data
  |-- AdminPagination -> controls page/rows
  |-- AdminFormDrawer -> create/edit form
  |-- AdminDeleteModal -> delete confirmation
```

---

## CSS Architecture

CSS is **global and co-located** with components. There are no CSS Modules or CSS-in-JS solutions.

### CSS Organization

| Layer | Location | Purpose |
|-------|----------|---------|
| Global | `src/index.css` | Reset, font-face, CSS custom properties, utility classes |
| Shared | `src/shared/styles/*.css` | Reusable component styles (tables, forms, buttons, etc.) |
| Layout | `src/shared/components/layout/*.css` | Dashboard shell, sidebar, topnav |
| Feature | `src/features/*/pages/*.css` | Feature-specific page styles (co-located) |
| Legacy | `src/pages/*.css`, `src/components/*.css` | Pre-migration styles |

### CSS Custom Properties (in `index.css`)

- Color palette: `--primary`, `--primary-hover`, `--bg`, `--card-bg`, `--text`, etc.
- Typography: Google Sans font-family
- Spacing and sizing variables

### Conventions

- Each `.tsx` page has a co-located `.css` file in the same directory
- Class names use kebab-case
- No CSS Modules — all class names are global
- No inline styles except for dynamic values
- `!important` is avoided unless overriding a shared style
