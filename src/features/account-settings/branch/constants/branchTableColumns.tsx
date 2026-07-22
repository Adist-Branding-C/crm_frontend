import { SettingsStatusBadge } from '../../../../shared/components/settings';
import type { Column } from '../../../../shared/types/crud';
import type { BranchItem } from '../types/branch.types';

// Static column config for BranchPage's SettingsTableLayout — has no dependency on props/state, so it lives outside the component (account-settings/branch).
export const BRANCH_TABLE_COLUMNS: Column<BranchItem>[] = [
  { key: 'branchName', label: 'Branch Name', render: (item) => item.name || item.branchName || '-' },
  { key: 'description', label: 'Description' },
  { key: 'status', label: 'Status', render: (item) => <SettingsStatusBadge status={item.status} /> },
];
