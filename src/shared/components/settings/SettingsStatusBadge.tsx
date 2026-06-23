import React from 'react';

interface SettingsStatusBadgeProps {
  status?: string | undefined;
}

const SettingsStatusBadge: React.FC<SettingsStatusBadgeProps> = ({ status }) => (
  <span className={`status-badge status-${(status || 'Active').toLowerCase()}`}>
    {status || 'Active'}
  </span>
);

export default SettingsStatusBadge;
