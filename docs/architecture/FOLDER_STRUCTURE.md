# Folder Structure

## Top-Level `src/`

```
src/
  App.tsx                 -- Root component, renders <AppRoutes />
  main.tsx                -- Entry point, mounts React app
  index.css               -- Global styles, CSS custom properties, fonts
  global.d.ts             -- TypeScript module declarations (.jsx, .css)
  app/                    -- Reserved for app-level config (currently empty)
  assets/                 -- Static assets (images, icons)
  components/             -- Legacy shared components (being migrated to shared/)
  features/               -- Domain feature modules
  layouts/                -- Legacy layout copies (being migrated to shared/)
  pages/                  -- Legacy .jsx pages (being migrated to features/)
  routes/                 -- Route modules (modularized route definitions)
  shared/                 -- Shared library (components, hooks, constants, styles)
```

---

## Features (`src/features/`)

Each business domain has its own folder. 45 features exist as of this writing.

### Standard Feature Structure

```
src/features/<feature-name>/
  components/     -- Feature-specific React components
  constants/      -- Form fields, table columns, enum values
  hooks/          -- Custom React hooks for feature logic
  pages/          -- Page components (one per route)
  services/       -- API service functions (stubs during migration)
  types/          -- TypeScript interfaces and type definitions
  utils/          -- Pure utility functions
```

### Feature Inventory

```
src/features/
  auth/               -- Authentication (login, forgot/reset password)
  branch/             -- Branch management (CRUD)
  calendar/           -- Calendar view
  call-reason/        -- Call reason configuration
  call-status/        -- Call status configuration
  campaigns/          -- Campaign management
  checkout-note/      -- Checkout note configuration
  companies/          -- Company management
  daily-activity/     -- Daily activity tracking
  dashboard/          -- Dashboard with KPIs, charts, widgets
  deal-additional-fields/   -- Deal additional fields config
  deal-stages/        -- Deal stages configuration
  deal-types/         -- Deal types configuration
  deals/              -- Deal management
  department/         -- Department management
  designation/        -- Designation management
  email-template/     -- Email template management
  enquiries/          -- Lead/enquiry management
  facebook-view-leads/      -- Facebook leads viewer
  followup-required/  -- Follow-up required view
  general-settings/   -- General settings
  integrations/       -- Third-party integrations
  lead-additional/    -- Lead additional fields config
  lead-generation-api/      -- Lead generation API config
  lead-purpose/       -- Lead purpose config
  lead-source/        -- Lead source config
  lead-status/        -- Lead status config
  lead-types/         -- Lead types config
  mail-config/        -- Mail configuration
  meeting-outcome/    -- Meeting outcome config
  notification-settings/    -- Notification settings
  password/           -- Password management
  payment-plans/      -- Payment plans
  profile/            -- User profile
  reports/            -- Reports with sub-pages
  roles/              -- Role management
  sales-pipeline/     -- Sales pipeline view
  settings/           -- Application settings
  setup/              -- Initial setup wizard
  spotlight/          -- Spotlight view
  staff-performance/  -- Staff performance
  task-categories/    -- Task categories config
  tasks/              -- Task management
  whatsapp-template/  -- WhatsApp template management
  work-mode/          -- Work mode configuration
```

---

## Shared (`src/shared/`)

Reusable code consumed by all features.

```
src/shared/
  assets/              -- Shared static assets (currently empty)
  components/
    crud/              -- Reusable CRUD components
      AdminDeleteModal.tsx
      AdminFormDrawer.tsx
      AdminPagination.tsx
      AdminTable.tsx
      AdminToolbar.tsx
    drawers/           -- Business-specific drawers
      AddCampaignDrawer.tsx
      AddDealDrawer.tsx
      AddDealTaskDrawer.tsx
      AddLeadDrawer.tsx (+ .css)
    layout/            -- Application shell components
      DashboardLayout.tsx (+ .css)
      PageContainer.tsx (+ .css)
      PageHeader.tsx (+ .css)
      Sidebar.tsx (+ .css)
      TopNav.tsx (+ .css)
    SettingsTabs.tsx   -- Tab navigation for settings pages
  constants/           -- Shared constant values
    actionLabels.ts
    labels.ts
    navigation.ts
    pagination.ts
    sidebar.ts
    statuses.ts
  hooks/               -- Shared React hooks
    useClickOutside.ts
    useCrudData.ts
    useSearchFilter.ts
    useTablePagination.ts
    useTableSelection.ts
    useTableSorting.ts
  layouts/             -- Reserved (empty)
  services/            -- Reserved for shared services (empty)
  styles/              -- Shared CSS files (15 files)
    badges.css, buttons.css, drawers.css, dropdowns.css,
    filters.css, forms.css, modals.css, pagination.css,
    settings-layout.css, sidebar-layout.css, stat-cards.css,
    status-badges.css, tables.css, tabs.css, toolbars.css
  types/               -- Reserved for shared types (empty)
  utils/               -- Reserved for shared utilities (empty)
```

---

## Routes (`src/routes/`)

Modular route definitions by business domain.

```
src/routes/
  index.tsx               -- Router assembly (BrowserRouter + Routes + catch-all)
  ProtectedRoute.tsx      -- Auth guard component
  authRoutes.tsx          -- /login, /forgot-password, /reset-password
  dashboardRoutes.tsx     -- /dashboard, /spotlight, /calendar, /daily-activity, /setup, /staff-performance
  leadRoutes.tsx          -- /leads, /enquiries, /campaigns, /followup-required, /sales-pipeline, /companies, /facebook/*
  settingsRoutes.tsx      -- /settings, /settings/lead-settings/*, /user/* config routes
  adminRoutes.tsx         -- /account, /account/* (roles, department, branch, etc.)
  salesRoutes.tsx         -- /user/deals, /user/deal-types, /user/deal-stages, /user/additional-fields-deal
  reportsRoutes.tsx       -- /reports/*
  taskRoutes.tsx          -- /user/tasks/*
```

---

## Legacy Areas

These are being migrated to the `features/` + `shared/` structure.

### `src/pages/` — Legacy Pages (~78 `.jsx` files)

Older page components that predate the feature-based architecture. Each corresponds to a feature route. Some duplicates exist:
- `Branch.jsx` (legacy) vs `BranchPage.tsx` in `features/branch/pages/`
- 25 associated `.css` files

### `src/components/` — Legacy Components (~27 files)

Older shared components being migrated to `src/shared/components/`:
- `Sidebar.jsx` → `shared/components/layout/Sidebar.tsx`
- `TopNav.jsx` → `shared/components/layout/TopNav.tsx`
- `AddLeadDrawer.jsx` → `shared/components/drawers/AddLeadDrawer.tsx`
- `report-pages/` (17 files) — used by Reports feature
- `widgets/` (14 files) — used by Dashboard feature

### `src/layouts/` — Legacy Layouts

- `DashboardLayout.jsx` + `.css` (legacy copy, now in `shared/components/layout/`)
