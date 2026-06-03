# Naming Conventions

## Folder Naming

| Pattern | Example | Rule |
|---------|---------|------|
| Feature folders | `src/features/branch/`, `src/features/lead-purpose/` | kebab-case, singular nouns |
| Sub-folders | `components/`, `constants/`, `hooks/`, `pages/`, `services/`, `types/`, `utils/` | lowercase, plural nouns |
| Shared sub-folders | `crud/`, `layout/`, `drawers/` | kebab-case, plural |
| Legacy folders | `src/pages/`, `src/components/` | lowercase, plural |

### Feature Folder Examples

```
src/features/branch/              -- Simple CRUD feature
src/features/facebook-view-leads/ -- Multi-word kebab-case
src/features/lead-generation-api/ -- Compound feature name
src/features/deal-additional-fields/ -- Descriptive feature
```

---

## File Naming

| File Type | Pattern | Examples |
|-----------|---------|---------|
| Page components | PascalCase + `Page` suffix | `BranchPage.tsx`, `LoginPage.tsx`, `DashboardPage.tsx` |
| React components | PascalCase | `AdminTable.tsx`, `PageHeader.tsx`, `SettingsTabs.tsx` |
| Custom hooks | camelCase + `use` prefix | `useCrudData.ts`, `useClickOutside.ts`, `useTablePagination.ts` |
| Constants | camelCase (kebab-case for directory) | `actionLabels.ts`, `navigation.ts`, `pagination.ts`, `auth.constants.ts` |
| Services | camelCase | `auth.service.ts`, `loginService` (exported function) |
| Types | PascalCase per file | Interface names inside match file |
| Utils | camelCase | Pure function files |
| CSS | kebab-case matching component | `BranchPage.css`, `AdminTable.css`, `dashboard-layout.css` |
| Config files | kebab-case | `vite.config.ts`, `tsconfig.json`, `eslint.config.js` |

### File Extension Rules

| Extension | When to Use |
|-----------|-------------|
| `.tsx` | React components (contains JSX) |
| `.ts` | Non-JSX modules (hooks, constants, services, types, utils) |
| `.jsx` | Legacy files only (being migrated to .tsx) |
| `.css` | Stylesheets (co-located with component) |

---

## Component Naming

### Page Components

```
<Domain>Page
```

- Example: `BranchPage`, `LoginPage`, `SettingsPage`, `LeadPurposePage`
- Each route gets exactly one page component
- Located in `features/<feature>/pages/<FeaturePage>.tsx`

### Shared Components

```
<Category><Purpose>
```

- Example: `AdminTable`, `AdminFormDrawer`, `PageHeader`, `DashboardLayout`
- Located in `shared/components/<category>/`

### Feature Components

```
<Feature><SpecificPurpose>
```

- Example: Feature-specific components nested under `features/<feature>/components/`

---

## Hook Naming

```
use<Domain>State
```

- `useCrudData` — Full CRUD state management
- `useClickOutside` — Click outside detection
- `useSearchFilter` — Search/filter logic
- `useTablePagination` — Pagination state
- `useTableSelection` — Row selection
- `useTableSorting` — Column sorting

### Hook Rules

- All hooks must start with `use` prefix
- Hooks may only be called at the top level of a component or another hook
- Feature hooks live in `features/<feature>/hooks/`
- Shared hooks live in `shared/hooks/`

---

## Constant Naming

### Enum-like Constants

```
UPPER_SNAKE_CASE
```

```typescript
export const AUTH_ROUTES = {
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
};

export const AUTH_STORAGE_KEYS = {
  TOKEN: 'crm_token',
  USER: 'crm_user',
};

export const STATUS_ACTIVE = 'Active';
export const STATUS_INACTIVE = 'Inactive';
export const STATUS_PENDING = 'Pending';
```

### Configuration Constants

```
camelCase
```

```typescript
export const formFields: FormField[] = [ ... ];
export const columns = [ ... ];
export const DEFAULT_ROWS_PER_PAGE = 10;
export const ROWS_OPTIONS = [10, 20, 50, 100];
```

---

## Type/Interface Naming

### Interfaces

```
PascalCase — noun or noun phrase describing the entity
```

```typescript
interface BranchItem {
  id: number;
  name: string;
  createdBy: string;
  status: string;
}
```

### Type Aliases

```
PascalCase
```

```typescript
type FormField = {
  name: string;
  label: string;
  type: 'text' | 'select' | ...;
  required?: boolean;
  placeholder?: string;
};
```

### Props Types

```
<ComponentName>Props
```

```typescript
interface AdminTableProps {
  data: unknown[];
  columns: Column[];
  onEdit: (item: unknown) => void;
  // ...
}
```

---

## Identifier Naming

| Identifier | Convention | Example |
|-----------|-----------|---------|
| Variables | camelCase | `const filteredData = ...` |
| Functions | camelCase | `function handleSave(...)` |
| Parameters | camelCase | `(item: BranchItem)` |
| Classes | PascalCase | N/A (no classes used) |
| CSS classes | kebab-case | `.table-container`, `.account-page`, `.account-layout` |
| CSS IDs | camelCase | Avoid IDs; use classes |
| React state | camelCase | `const [isOpen, setIsOpen] = ...` |
| React refs | camelCase + Ref suffix | `const containerRef = useRef(null)` |
| Event handlers | camelCase + handle prefix | `handleAddClick`, `handleSave`, `handleDeleteClick` |
| Boolean vars | is/has/should prefix | `isAuthenticated`, `hasPermission`, `shouldShow` |
| Destructured state | camelCase | `searchQuery`, `currentPage`, `filteredData` |

---

## CSS Naming

```
kebab-case
```

- `.account-page` — Page-level wrapper
- `.account-layout` — Layout container
- `.account-content` — Content area
- `.table-container` — Table wrapper
- `.settings-tabs` — Tab navigation
- `.page-header` — Page header
- `.search-bar` — Search input container

---

## Import Order Convention

```
1. React / library imports
2. Third-party imports (react-router-dom, lucide-react, recharts)
3. Shared component imports (from src/shared/)
4. Shared hook imports (from src/shared/hooks/)
5. Feature component imports (from current or sibling features)
6. Local imports (constants, types within the same feature)
7. CSS imports
```

```typescript
import { useState } from 'react';
import { Route } from 'react-router-dom';
import AdminTable from '../../../shared/components/crud/AdminTable';
import { useCrudData } from '../../../shared/hooks/useCrudData';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { formFields, columns } from '../constants';
import './BranchPage.css';
```
