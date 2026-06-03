# Developer Onboarding

## Prerequisites

- Node.js 18+
- npm 9+

## How to Start the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

The dev server starts at `http://localhost:5173` by default.

---

## Architecture Understanding

### High-Level Overview

```
main.tsx
  └── App.tsx
        └── <AppRoutes /> (from src/routes/index.tsx)
              ├── Auth routes (login, forgot/reset password)
              ├── Protected routes
              │     └── <DashboardLayout /> (Sidebar + TopNav + <Outlet />)
              │           ├── Dashboard pages
              │           ├── Lead/Enquiry pages
              │           ├── Settings pages
              │           ├── Account admin pages
              │           ├── Sales/Deal pages
              │           ├── Reports pages
              │           └── Tasks pages
              └── Catch-all redirect (→ /login)
```

### Key Concepts

1. **Feature-Based Architecture** — Each business domain is a self-contained module under `src/features/`
2. **Shared Library** — Reusable components, hooks, constants, and styles live in `src/shared/`
3. **Route Modularization** — Route definitions are split by domain into `src/routes/`
4. **Global CSS** — All styles are co-located `.css` files, no CSS Modules

### Important Files

| File | Purpose |
|------|---------|
| `src/main.tsx` | React entry point, mounts `<App />` to DOM |
| `src/App.tsx` | Root component, renders `<AppRoutes />` |
| `src/routes/index.tsx` | Router assembly (BrowserRouter + Routes) |
| `src/routes/ProtectedRoute.tsx` | Auth guard (checks `crm_token` in localStorage) |
| `src/index.css` | Global styles, CSS variables, font definitions |
| `src/shared/hooks/useCrudData.ts` | Central CRUD state management hook |

### Design Decisions

| Decision | Rationale |
|----------|-----------|
| No state management library | All state is local (useState/useCrudData). No Redux/Zustand needed for current complexity. |
| Global CSS (no CSS modules) | Simplicity. Co-located files keep styles close to components. Naming conventions prevent collisions. |
| localStorage-based auth | Simple token check. No JWT library needed for the frontend. |
| Mock data (no live API) | Services are stubs. All data is hardcoded for now. API integration is future work. |
| Modular routes | Prevents App.tsx from becoming a monolith. Each domain owns its route file. |

---

## How to Create a New Feature

### Step 1: Create the feature folder structure

```bash
# Minimal feature (constants + page)
mkdir -p src/features/my-feature/constants
mkdir -p src/features/my-feature/pages

# Full CRUD feature
mkdir -p src/features/my-feature/{components,constants,hooks,pages,services,types,utils}
```

### Step 2: Define constants

```typescript
// src/features/my-feature/constants/index.ts
import type { FormField } from '../../../shared/components/crud/AdminFormDrawer';

export const formFields: FormField[] = [
  { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Enter name' },
];

export const columns = [
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' },
];
```

### Step 3: Create the page component

```tsx
// src/features/my-feature/pages/MyFeaturePage.tsx
import { useState } from 'react';
import { useCrudData } from '../../../shared/hooks/useCrudData';
import AdminToolbar from '../../../shared/components/crud/AdminToolbar';
import AdminTable from '../../../shared/components/crud/AdminTable';
import AdminPagination from '../../../shared/components/crud/AdminPagination';
import AdminFormDrawer from '../../../shared/components/crud/AdminFormDrawer';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { formFields, columns } from '../constants';
import './MyFeaturePage.css';

interface MyItem { id: number; name: string; status: string; }

const mockData: MyItem[] = [
  { id: 1, name: 'Example', status: 'Active' },
];

const MyFeaturePage = () => {
  const crud = useCrudData(mockData);
  const [formData, setFormData] = useState({ name: '' });

  const handleAdd = () => { crud.handleAddClick(); setFormData({ name: '' }); };
  const handleEdit = (item: MyItem) => { crud.handleEditClick(item); setFormData({ name: item.name }); };
  const handleSave = () => { crud.handleSave(formData); };

  return (
    <div className="account-page">
      <PageHeader title="My Feature" description="Manage my feature items" />
      <div className="table-container">
        <AdminToolbar searchQuery={crud.searchQuery} onSearchChange={crud.setSearchQuery}
          onAdd={handleAdd} addLabel="Add Item" />
        <AdminTable data={crud.paginatedData} columns={columns} startIndex={crud.startIndex}
          dropdownOpen={crud.dropdownOpen} onToggleDropdown={crud.setDropdownOpen}
          onEdit={handleEdit} onDelete={crud.handleDeleteClick} />
        <AdminPagination currentPage={crud.currentPage} totalPages={crud.totalPages}
          startIndex={crud.startIndex} rowsPerPage={crud.rowsPerPage}
          totalItems={crud.filteredData.length} onPageChange={crud.setCurrentPage}
          onRowsPerPageChange={crud.handleRowsPerPageChange} />
      </div>
      <AdminFormDrawer isOpen={crud.showForm} title="Item" fields={formFields}
        formData={formData} onChange={setFormData} onSave={handleSave}
        onClose={crud.handleCloseForm} isEditing={!!crud.editingItem} />
      <AdminDeleteModal isOpen={!!crud.deletingItem} itemName={crud.deletingItem?.name}
        onConfirm={crud.handleConfirmDelete} onClose={() => crud.setDeletingItem(null)} />
    </div>
  );
};

export default MyFeaturePage;
```

### Step 4: Create styles

```css
/* src/features/my-feature/pages/MyFeaturePage.css */
/* Feature-specific styles here; most layout comes from shared CSS */
```

### Step 5: Add the route

See [How to Add Routes](#how-to-add-routes) below.

---

## How to Add Routes

### If Adding to an Existing Domain

1. Open the appropriate route file under `src/routes/`
2. Import the page component
3. Add a `<Route path="..." element={<Page />} />` entry

Example — adding a new lead route to `leadRoutes.tsx`:
```tsx
import MyFeaturePage from '../features/my-feature/pages/MyFeaturePage';

export default (
  <>
    {/* existing routes... */}
    <Route path="my-feature" element={<MyFeaturePage />} />
  </>
);
```

### If Adding a New Domain

1. Create a new route file: `src/routes/myFeatureRoutes.tsx`
2. Define the routes:

```tsx
import React from 'react';
import { Route } from 'react-router-dom';
import MyFeaturePage from '../features/my-feature/pages/MyFeaturePage';

export default (
  <Route path="my-feature/*" element={<MyFeaturePage />} />
);
```

3. Import and mount in `src/routes/index.tsx`:

```tsx
import myFeatureRoutes from './myFeatureRoutes';

// Inside the protected <Route path="/"> parent:
{myFeatureRoutes}
```

---

## How to Create Hooks / Services / Constants

### Custom Hook

```typescript
// src/features/my-feature/hooks/useMyFeature.ts
import { useState } from 'react';

interface UseMyFeatureReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useMyFeature = (initialCount = 0): UseMyFeatureReturn => {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);

  return { count, increment, decrement };
};
```

### Service Function

```typescript
// src/features/my-feature/services/myFeature.service.ts
import type { MyItem } from '../types';

const API_BASE = '/api/my-feature';

export const fetchItems = async (): Promise<MyItem[]> => {
  // TODO: Replace with actual API call
  // const response = await fetch(API_BASE);
  // return response.json();
  return [];
};

export const createItem = async (data: Partial<MyItem>): Promise<MyItem> => {
  // const response = await fetch(API_BASE, { method: 'POST', body: JSON.stringify(data) });
  // return response.json();
  return {} as MyItem;
};
```

### Constants

```typescript
// src/features/my-feature/constants/index.ts
export const MY_FEATURE_STATUSES = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  PENDING: 'Pending',
} as const;

export const MY_FEATURE_OPTIONS = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
];

export const formFields: FormField[] = [ /* ... */ ];
export const columns = [ /* ... */ ];
```

---

## Project Scripts Reference

```bash
npm run dev          # Start dev server with HMR
npm run build        # Production build to dist/
npm run lint         # Run ESLint across the project
npm run preview      # Preview production build locally
```

---

## Common Tasks

### I need to update the sidebar navigation

Edit `src/shared/constants/sidebar.ts` — it defines all sidebar menu items.

### I need to add a new icon

All icons come from `lucide-react`. Import directly:
```tsx
import { Settings, Users, BarChart3 } from 'lucide-react';
```

### I need to add a CSS variable

Add it to `:root` in `src/index.css`:
```css
:root {
  --my-color: #123456;
}
```
Then use it in any component CSS:
```css
.element {
  color: var(--my-color);
}
```

### I need to check file naming conventions

See [Naming Conventions](../standards/NAMING_CONVENTIONS.md).
