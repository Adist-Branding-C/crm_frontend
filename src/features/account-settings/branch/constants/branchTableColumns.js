import { jsx as _jsx } from "react/jsx-runtime";
import { SettingsStatusBadge } from '../../../../shared/components/settings';
// Static column config for BranchPage's SettingsTableLayout — has no dependency on props/state, so it lives outside the component (account-settings/branch).
export const BRANCH_TABLE_COLUMNS = [
    { key: 'branchName', label: 'Branch Name', render: (item) => item.name || item.branchName || '-' },
    { key: 'description', label: 'Description' },
    { key: 'status', label: 'Status', render: (item) => _jsx(SettingsStatusBadge, { status: item.status }) },
];
//# sourceMappingURL=branchTableColumns.js.map