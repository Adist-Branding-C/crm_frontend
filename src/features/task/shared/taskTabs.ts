import { ListChecks, Phone, Megaphone, Briefcase } from 'lucide-react';
import type { TabItem } from '../../../shared/types/layout';

export const taskTabs: TabItem[] = [
  { id: 'task', title: 'Task', link: '/user/tasks', icon: ListChecks },
  { id: 'call-task', title: 'Call Task', link: '/user/tasks/call-tasks', icon: Phone },
  { id: 'campaign-task', title: 'Campaign Task', link: '/user/tasks/campaign-tasks', icon: Megaphone },
  { id: 'deal-task', title: 'Deal Task', link: '/user/tasks/deal-tasks', icon: Briefcase },
];
