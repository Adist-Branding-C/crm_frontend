import { jsx as _jsx } from "react/jsx-runtime";
import { SettingsStatusBadge } from '../../../../shared/components/settings';
// Static column config for DesignationPage's SettingsTableLayout — has no dependency on props/state, so it lives outside the component (check #8).
export const DESIGNATION_TABLE_COLUMNS = [
    { key: 'designationName', label: 'Designation', render: (item) => item.designationName || item.name || '-' },
    { key: 'description', label: 'Description' },
    { key: 'status', label: 'Status', render: (item) => _jsx(SettingsStatusBadge, { status: item.status }) },
];
//# sourceMappingURL=designationTableColumns.js.map