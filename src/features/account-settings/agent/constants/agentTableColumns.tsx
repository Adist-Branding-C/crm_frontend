import { SettingsStatusBadge } from '../../../../shared/components/settings';
import type { Column } from '../../../../shared/types/crud';
import type { AgentItem } from '../types/agent.types';

// Static column config for AgentPage's SettingsTableLayout — has no dependency on props/state, so it lives outside the component (check #8).
export const AGENT_TABLE_COLUMNS: Column<AgentItem>[] = [
  { key: 'fullName', label: 'Name', render: (item) => item.fullName || item.name || '-' },
  { key: 'email', label: 'Email' },
  { key: 'mobile', label: 'Mobile', render: (item) => item.mobile || item.phone || item.phone_number || item.phoneNumber || '-' },
  {
    key: 'isAdmin',
    label: 'Admin',
    render: (item) => (
      <span className={`badge ${item.isAdmin ? 'badge-active' : 'badge-inactive'}`}>
        {item.isAdmin ? 'Admin' : 'Staff'}
      </span>
    ),
  },
  { key: 'status', label: 'Status', render: (item) => <SettingsStatusBadge status={item.status} /> },
];
