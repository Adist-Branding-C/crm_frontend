import { Phone, MessageSquare, Users, Tag } from 'lucide-react';
import type { ReactNode } from 'react';

interface SettingsTab {
  label: string;
  path: string;
  icon: ReactNode;
}

export const SETTINGS_TABS: SettingsTab[] = [
  { label: 'Call Status', path: '/user/call_status', icon: <Phone size={16} /> },
  { label: 'Call Reasons', path: '/user/call_reasons', icon: <MessageSquare size={16} /> },
  { label: 'Meeting Outcome', path: '/user/meeting_outcome', icon: <Users size={16} /> },
  { label: 'Task Categories', path: '/user/task_categories', icon: <Tag size={16} /> },
];
