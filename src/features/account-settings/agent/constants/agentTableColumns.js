import { jsx as _jsx } from "react/jsx-runtime";
import { SettingsStatusBadge } from '../../../../shared/components/settings';
// Static column config for AgentPage's SettingsTableLayout — has no dependency on props/state, so it lives outside the component (check #8).
export const AGENT_TABLE_COLUMNS = [
    { key: 'fullName', label: 'Name', render: (item) => item.fullName || item.name || '-' },
    { key: 'email', label: 'Email' },
    { key: 'mobile', label: 'Mobile', render: (item) => item.mobile || item.phone || item.phone_number || item.phoneNumber || '-' },
    { key: 'status', label: 'Status', render: (item) => _jsx(SettingsStatusBadge, { status: item.status }) },
];
//# sourceMappingURL=agentTableColumns.js.map