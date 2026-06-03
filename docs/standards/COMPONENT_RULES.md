# Component Rules

## What is Allowed Inside TSX

TSX files may only contain:

1. **Component definitions** — Function components that return JSX
2. **Imports** — Module imports at the top of the file
3. **Type definitions** — Inline prop types (prefer separate file for complex types)
4. **Constants** — Small, component-scoped constant values

### Example — Correct

```tsx
import { useState } from 'react';
import AdminTable from '../../../shared/components/crud/AdminTable';
import { useCrudData } from '../../../shared/hooks/useCrudData';
import './BranchPage.css';

const BranchPage = () => {
  const crud = useCrudData(branchData);
  // ... component logic
  return ( /* JSX */ );
};

export default BranchPage;
```

### Example — Incorrect

```tsx
// ❌ Business logic outside component
function calculateTax(amount: number) { ... }

// ❌ Data fetching outside component
const data = fetch('/api/data');

// ❌ Type definitions mixed with component (use types/ folder)
interface ComplexType { ... }

const Page = () => { ... };
```

---

## Business Logic Separation

Business logic must NOT live inside TSX files. Follow this hierarchy:

| Logic Type | Location | Allowed in TSX? |
|-----------|----------|----------------|
| State management | Custom hooks (`hooks/`) | No — call the hook |
| API calls | Service functions (`services/`) | No — call from hook |
| Data transformation | Utility functions (`utils/`) | No — import and call |
| Form validation | Constants (`constants/formFields`) | No — define in constants |
| Event handlers | In-component | Yes — thin, delegates to hooks |
| Rendering logic | In-component | Yes — keep minimal |

### Standard Page Component Pattern

```tsx
import { useState } from 'react';
import { useCrudData } from '../../../shared/hooks/useCrudData';
import AdminTable from '../../../shared/components/crud/AdminTable';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { formFields, columns } from '../constants';
import './BranchPage.css';

const BranchPage = () => {
  // 1. State and hooks (delegate business logic)
  const crud = useCrudData(branchData);
  const [formData, setFormData] = useState({ name: '' });

  // 2. Thin event handlers (delegate to hook)
  const handleAdd = () => {
    crud.handleAddClick();
    setFormData({ name: '' });
  };

  // 3. Render UI (compose from shared components)
  return (
    <div className="account-page">
      <PageHeader title="Branches" />
      <AdminTable data={crud.paginatedData} columns={columns} ... />
    </div>
  );
};

export default BranchPage;
```

---

## Hooks Usage

### Rules

1. **Call hooks at top level only** — Never inside conditions, loops, or callbacks
2. **Prefix with `use`** — Every custom hook must start with `use`
3. **One hook per concern** — A hook should manage one piece of state or behavior
4. **Deconstruct return values** — Prefer object destructuring for clarity:

```typescript
const { data, searchQuery, setSearchQuery, paginatedData, ... } = useCrudData(items);
```

5. **No JSX in hooks** — Hooks return state and handlers, never JSX
6. **Feature hooks** — Live in `features/<feature>/hooks/`
7. **Shared hooks** — Live in `shared/hooks/`

### Hook Responsibilities

| Hook | Responsibility |
|------|---------------|
| `useCrudData` | Full CRUD: data storage, search, pagination, form open/close, edit/delete state |
| `useSearchFilter` | Filter an array based on a search query |
| `useTablePagination` | Compute paginated subset of data |
| `useTableSelection` | Track selected rows |
| `useTableSorting` | Sort data by column |
| `useClickOutside` | Detect clicks outside a DOM element |

---

## Reusable Component Rules

### When to Create a Reusable Component

- A UI pattern appears in 2+ features
- The component has well-defined props and no feature-specific business logic
- The component does not import from feature modules

### Shared Component Guidelines

1. **Props-driven** — All data and callbacks come through props
2. **No hardcoded business strings** — Text labels come from props or shared constants
3. **No feature imports** — Shared components cannot import from `features/`
4. **No side effects** — No API calls, no localStorage access
5. **Co-located CSS** — Each shared component file has a co-located `.css` file in the same directory

### Shared Component Examples

```tsx
// AdminTable.tsx — Fully props-driven
interface AdminTableProps {
  data: unknown[];
  columns: Column[];
  startIndex: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: unknown) => void;
  onDelete: (item: unknown) => void;
}
```

---

## Memo / useCallback Rules

- **Do NOT** pre-optimize with `useMemo` or `useCallback`
- Only add `useMemo`/`useCallback` when a performance problem is **measured**
- Memoization is not needed for:
  - Simple computations (filtering < 1000 items)
  - Event handlers passed to a few components
  - Components that render infrequently
- Memoization is considered when:
  - A computation iterates over 5000+ items
  - A component re-renders frequently (e.g., animation loop)
  - A heavy subtree re-renders unnecessarily

### Current Project Usage

- No `useMemo` or `useCallback` usage in the codebase currently
- The shared `useCrudData` hook uses `useState` only (no memoization wrappers)
- Performance is managed through component structure, not memoization
