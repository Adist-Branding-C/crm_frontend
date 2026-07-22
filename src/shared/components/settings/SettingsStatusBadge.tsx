import React from 'react';

interface SettingsStatusBadgeProps {
  status: string | undefined;
}

const STATUS_CLASS_MAP: Record<string, string> = {
  active: 'status-active',
  inactive: 'status-inactive',
};

const SettingsStatusBadge: React.FC<SettingsStatusBadgeProps> = ({ status }) => {
  const displayStatus = status || 'Active';
  const cssClass = STATUS_CLASS_MAP[displayStatus.toLowerCase()] || 'status-active';
  return <span className={`status-badge ${cssClass}`}>{displayStatus}</span>;
};

export default SettingsStatusBadge;
