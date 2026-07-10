import { ListChecks, Phone, Megaphone, Briefcase } from 'lucide-react';
import type { ReactNode } from 'react';

export interface TaskTab {
  label: string;
  path: string;
  icon: ReactNode;
}

export const taskTabs: TaskTab[] = [
  { label: 'Task', path: '/user/tasks', icon: <ListChecks size={16} /> },
  { label: 'Call Task', path: '/user/tasks/call-tasks', icon: <Phone size={16} /> },
  { label: 'Campaign Task', path: '/user/tasks/campaign-tasks', icon: <Megaphone size={16} /> },
  { label: 'Deal Task', path: '/user/tasks/deal-tasks', icon: <Briefcase size={16} /> },
];
