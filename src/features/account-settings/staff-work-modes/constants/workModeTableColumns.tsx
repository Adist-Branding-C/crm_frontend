import { SettingsStatusBadge } from '../../../../shared/components/settings';
import type { Column } from '../../../../shared/types/crud';
import type { WorkModeItem } from '../types/workMode.types';

// Static column config for WorkModePage's SettingsTableLayout — has no dependency on props/state, so it lives outside the component (check #8).
export const WORK_MODE_TABLE_COLUMNS: Column<WorkModeItem>[] = [
  { key: 'workModeName', label: 'Work Mode', render: (item) => item.workModeName || item.name || '-' },
  { key: 'description', label: 'Description' },
  { key: 'status', label: 'Status', render: (item) => <SettingsStatusBadge status={item.status} /> },
];
