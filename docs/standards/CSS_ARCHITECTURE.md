# CSS Architecture

## Overview

The project uses **global CSS with co-located stylesheets**. There are no CSS Modules, CSS-in-JS libraries, or CSS pre-processors. Each component or page has a corresponding `.css` file in the same directory.

---

## CSS Organization

### Layer Hierarchy

```
1. Global Reset & Variables     src/index.css
2. Shared Component Styles      src/shared/styles/*.css
3. Layout Styles                src/shared/components/layout/*.css
4. Feature Page Styles          src/features/*/pages/*.css
5. Feature Component Styles     src/features/*/components/*.css
6. Drawer Styles                src/shared/components/drawers/*.css
7. Legacy Styles                src/pages/*.css, src/components/*.css
```

### Layer Details

#### 1. Global (`src/index.css`)

This is the only file loaded in `main.tsx`. It contains:

- **CSS Reset** — Box-sizing, margin/padding normalization
- **Font-face** — Google Sans font family
- **CSS Custom Properties** — Design tokens as CSS variables
- **Utility Classes** — Reusable atomic helpers

```css
:root {
  --primary: #4F46E5;
  --primary-hover: #4338CA;
  --bg: #F9FAFB;
  --card-bg: #FFFFFF;
  --text: #111827;
  --text-secondary: #6B7280;
  --border: #E5E7EB;
  --success: #10B981;
  --warning: #F59E0B;
  --danger: #EF4444;
  --radius: 8px;
  --shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

#### 2. Shared Styles (`src/shared/styles/`)

Reusable component styles consumed across features:

| File | Purpose |
|------|---------|
| `badges.css` | Status badges, count badges |
| `buttons.css` | Button variants (primary, secondary, danger, ghost) |
| `drawers.css` | Slide-out drawer animations and layout |
| `dropdowns.css` | Dropdown menus and action dropdowns |
| `filters.css` | Filter bar and filter controls |
| `forms.css` | Input fields, selects, checkboxes, form layouts |
| `modals.css` | Modal dialog overlays and animations |
| `pagination.css` | Pagination control styling |
| `settings-layout.css` | Settings page layout structure |
| `sidebar-layout.css` | Sidebar navigation styling |
| `stat-cards.css` | KPI stat card styling |
| `status-badges.css` | Colored status indicators |
| `tables.css` | Data table styling |
| `tabs.css` | Tab navigation styling |
| `toolbars.css` | Action toolbar styling |

#### 3. Layout Styles (`src/shared/components/layout/*.css`)

Styles for the application shell:

| File | Purpose |
|------|---------|
| `DashboardLayout.css` | Main layout grid: sidebar + content |
| `Sidebar.css` | Left navigation sidebar |
| `TopNav.css` | Top bar navigation |
| `PageContainer.css` | Content width wrapper |
| `PageHeader.css` | Page title and description |

#### 4. Feature Styles (`src/features/*/pages/*.css`)

Each feature page has a co-located CSS file for its specific styling needs. These files primarily contain layout and arrangement rules for the page.

#### 5. Drawer Styles (`src/shared/components/drawers/*.css`)

Business drawer components with dedicated stylesheets.

---

## CSS Class Naming

```
kebab-case
```

### Patterns

| Pattern | Example |
|---------|---------|
| Page wrapper | `.account-page` |
| Layout container | `.account-layout` |
| Content area | `.account-content` |
| Table container | `.table-container` |
| Search bar | `.search-bar` |
| Action buttons | `.action-buttons` |
| Status badge | `.status-badge`, `.status-badge--active` |

---

## Co-location Rule

Every TypeScript/JSX file that defines UI styling should have a co-located CSS file:

```
BranchPage.tsx          +  BranchPage.css
AdminTable.tsx          +  AdminTable.css
DashboardLayout.tsx     +  DashboardLayout.css
AddLeadDrawer.tsx       +  AddLeadDrawer.css
```

The CSS file is imported at the top of the component file:

```tsx
import './BranchPage.css';
```

---

## CSS Custom Properties

Design tokens are defined as CSS custom properties on `:root` in `index.css`. Use these instead of hardcoded values:

```css
/* ✅ Correct */
.my-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

/* ❌ Incorrect */
.my-card {
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

---

## Reusable CSS Patterns

### Page Layout Pattern

```css
.account-page {
  padding: 24px;
}

.account-layout {
  display: flex;
  gap: 24px;
}

.account-content {
  flex: 1;
}
```

### Table Container Pattern

```css
.table-container {
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}
```

### Status Badge Pattern

```css
.status-badge {
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge--active {
  background: #D1FAE5;
  color: #065F46;
}

.status-badge--inactive {
  background: #FEE2E2;
  color: #991B1B;
}
```

---

## Rules

- **No CSS Modules** — All class names are global. Use descriptive class names to minimize collisions
- **No CSS-in-JS** — All styles are in `.css` files
- **No pre-processors** — Plain CSS only (no Sass, Less, PostCSS plugins)
- **No inline styles** — Except for truly dynamic values (e.g., width as percentage)
- **No `!important`** — Unless overriding a shared style where you cannot modify the source
- **No `@import` in CSS files** — CSS is imported in JS/TS files via `import './file.css'`
- **Feature CSS should NOT override shared CSS** — If you need to override, add a more specific class or update the shared style
