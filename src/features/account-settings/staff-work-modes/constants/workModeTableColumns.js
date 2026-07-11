import { jsx as _jsx } from "react/jsx-runtime";
import { SettingsStatusBadge } from '../../../../shared/components/settings';
// Static column config for WorkModePage's SettingsTableLayout — has no dependency on props/state, so it lives outside the component (check #8).
export const WORK_MODE_TABLE_COLUMNS = [
    { key: 'workModeName', label: 'Work Mode', render: (item) => item.workModeName || item.name || '-' },
    { key: 'description', label: 'Description' },
    { key: 'status', label: 'Status', render: (item) => _jsx(SettingsStatusBadge, { status: item.status }) },
];
//# sourceMappingURL=workModeTableColumns.js.map