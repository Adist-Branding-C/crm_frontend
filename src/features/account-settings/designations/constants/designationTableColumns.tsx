import { SettingsStatusBadge } from '../../../../shared/components/settings';
import type { Column } from '../../../../shared/types/crud';
import type { DesignationItem } from '../types/designation.types';

// Static column config for DesignationPage's SettingsTableLayout — has no dependency on props/state, so it lives outside the component (check #8).
export const DESIGNATION_TABLE_COLUMNS: Column<DesignationItem>[] = [
  { key: 'designationName', label: 'Designation', render: (item) => item.designationName || item.name || '-' },
  { key: 'description', label: 'Description' },
  { key: 'status', label: 'Status', render: (item) => <SettingsStatusBadge status={item.status} /> },
];
