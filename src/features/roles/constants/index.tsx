import type { Column } from '../../../shared/types/crud';
import type { Role } from '../types';

export const columns: Column<Role>[] = [
  { key: 'name', label: 'Role Name' },
  { key: 'permissions', label: 'Permissions' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'status', label: 'Status', render: (item) => (
    <span className={`status-badge status-${item.status.toLowerCase()}`}>{item.status}</span>
  )},
];

export const ROLES_DATA: Role[] = [
  { id: 1, name: 'Admin', permissions: 'All Access', createdAt: '2025-11-05', status: 'Active' },
  { id: 2, name: 'Manager', permissions: '25 permissions', createdAt: '2025-11-05', status: 'Active' },
  { id: 3, name: 'Staff', permissions: '15 permissions', createdAt: '2025-11-05', status: 'Active' },
];
