# Migration Guide

## Current State

The codebase has a **dual-layer architecture** — a legacy layer and a new feature-based layer coexist:

| Area | Legacy (`.jsx`) | New (`.tsx`) |
|------|-----------------|---------------|
| Pages | `src/pages/` — 78 files | `src/features/*/pages/` — growing |
| Components | `src/components/` — 27 files | `src/shared/components/` — established |
| Layout | `src/layouts/` — 2 files | `src/shared/components/layout/` — established |
| Styles | Co-located `.css` | Co-located `.css` |
| Routing | Was in `App.tsx` (monolithic) | `src/routes/` — modularized |

### Migration Priority

1. **High** — Route modularization (done)
2. **High** — Constants extraction (in progress for some features)
3. **Medium** — JSX → TSX page migration
4. **Medium** — Legacy component cleanup
5. **Low** — Legacy file deletion

---

## Strategy 1: JSX → TSX Migration

### When to Migrate

- A feature has a `.jsx` page in `src/pages/` but a `features/<name>/` folder already exists
- The feature's page component is being modified for a bug fix or enhancement

### Migration Steps

1. **Create the feature folder** if it doesn't exist:

```
src/features/<feature-name>/
  components/    (empty, if not needed)
  constants/     (if needed)
  hooks/         (if needed)
  pages/
    <Feature>Page.tsx
```

2. **Convert the page** from `.jsx` to `.tsx`:
   - Add TypeScript types for props and state
   - Remove `React` import (React 19 JSX transform doesn't need it)
   - Wrap with a named function component
   - Add `export default`

3. **Extract constants** to `constants/index.ts`:
   - Form field definitions → `FormField[]`
   - Table column definitions → `Column[]`
   - Hardcoded strings → exported constants

4. **Update routing** (if route module imports the old page):
   - The route modules in `src/routes/` import from `features/<name>/pages/<Feature>Page`
   - Update the import path

### Example Migration

**Before** (`src/pages/Branch.jsx`):
```jsx
import React from 'react';
import { useCrudData } from '../shared/hooks/useCrudData';
// ... inline formFields and columns

const Branch = () => { ... };
export default Branch;
```

**After** (`src/features/branch/pages/BranchPage.tsx`):
```tsx
import { useState } from 'react';
import { useCrudData } from '../../../shared/hooks/useCrudData';
import { formFields, columns } from '../constants';
import AdminTable from '../../../shared/components/crud/AdminTable';
import './BranchPage.css';

const BranchPage = () => { ... };
export default BranchPage;
```

---

## Strategy 2: Legacy Cleanup

### Remove Duplicate Files

After migrating a feature, the legacy file remains at `src/pages/<Feature>.jsx`. Clean up in this order:

1. ✅ Verify the new feature page is imported by its route module
2. ✅ Verify build passes (`npm run build`)
3. ✅ Verify the legacy file is NOT imported anywhere

```bash
# Check for any remaining imports of the legacy file
rg "from.*pages/<Feature>" src/
```

4. Delete the legacy `.jsx` and `.css` from `src/pages/` and `src/components/`
5. Update any relative imports that pointed to the legacy file

### Cleanup Checklist

- [ ] `src/pages/<Feature>.jsx` — Delete if feature exists in `features/`
- [ ] `src/pages/<Feature>.css` — Delete if styles are co-located with new feature
- [ ] `src/components/<Component>.jsx` — Migrate to `shared/components/`
- [ ] `src/components/<Component>.css` — Move to `shared/components/<Component>.css`
- [ ] `src/layouts/<Layout>.jsx` — Delete if migrated to `shared/components/layout/`

---

## Strategy 3: Constants Extraction

### What to Extract

Move these out of page components and into `constants/index.ts`:

1. **Form field definitions** — Array of field configs for `AdminFormDrawer`
2. **Table column definitions** — Column keys and labels for `AdminTable`
3. **Enum-like objects** — Status maps, option lists, category lists
4. **Hardcoded strings** — Labels, messages, titles

### Pattern

**Before** (in page component):
```tsx
const formFields = [
  { name: 'name', label: 'Branch Name', type: 'text', required: true },
  { name: 'code', label: 'Branch Code', type: 'text' },
];

const columns = [
  { key: 'name', label: 'Branch Name' },
  { key: 'code', label: 'Code' },
  { key: 'status', label: 'Status' },
];
```

**After** (`constants/index.ts`):
```tsx
import type { FormField } from '../../../shared/components/crud/AdminFormDrawer';

export const formFields: FormField[] = [
  { name: 'name', label: 'Branch Name', type: 'text', required: true, placeholder: 'Enter branch name' },
  { name: 'code', label: 'Branch Code', type: 'text', placeholder: 'Enter branch code' },
];

export const columns = [
  { key: 'name', label: 'Branch Name' },
  { key: 'code', label: 'Code' },
  { key: 'status', label: 'Status' },
];
```

**Then in page:**
```tsx
import { formFields, columns } from '../constants';
```

### Benefits

- Cleaner page components (single import instead of inline definitions)
- Type-safe field definitions (shared `FormField` type)
- Easier to test and maintain constants in isolation
- Constants can be reused across multiple views

---

## Strategy 4: Route Modularization

### Status: Complete

The routing architecture has already been migrated from a monolithic `App.tsx` to modular route files:

- **Before**: All 50+ route definitions, 55 page imports, and `ProtectedRoute` inline in `App.tsx` (134 lines)
- **After**: `App.tsx` is 3 lines. Routes are split into 9 domain-based files under `src/routes/`

### Pattern Used

Each route module:
- Exports a JSX fragment of `<Route>` elements
- Imports only the page components it needs
- Keeps page imports close to where they're used

### If Adding New Routes

See [How to Add Routes](../workflows/DEVELOPER_ONBOARDING.md#how-to-add-routes) in the Developer Onboarding guide.
