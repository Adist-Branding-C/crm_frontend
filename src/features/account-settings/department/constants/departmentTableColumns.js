import { jsx as _jsx } from "react/jsx-runtime";
import { SettingsStatusBadge } from '../../../../shared/components/settings';
// Static column config for DepartmentPage's SettingsTableLayout — has no dependency on props/state, so it lives outside the component (check #8).
export const DEPARTMENT_TABLE_COLUMNS = [
    { key: 'departmentName', label: 'Department Name', render: (item) => item.departmentName || item.name || '-' },
    { key: 'description', label: 'Description' },
    { key: 'status', label: 'Status', render: (item) => _jsx(SettingsStatusBadge, { status: item.status }) },
];
//# sourceMappingURL=departmentTableColumns.js.map