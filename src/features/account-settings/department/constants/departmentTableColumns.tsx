import { SettingsStatusBadge } from '../../../../shared/components/settings';
import type { Column } from '../../../../shared/types/crud';
import type { DepartmentItem } from '../types/department.types';

// Static column config for DepartmentPage's SettingsTableLayout — has no dependency on props/state, so it lives outside the component (check #8).
export const DEPARTMENT_TABLE_COLUMNS: Column<DepartmentItem>[] = [
  { key: 'departmentName', label: 'Department Name', render: (item) => item.departmentName || item.name || '-' },
  { key: 'description', label: 'Description' },
  { key: 'status', label: 'Status', render: (item) => <SettingsStatusBadge status={item.status} /> },
];
