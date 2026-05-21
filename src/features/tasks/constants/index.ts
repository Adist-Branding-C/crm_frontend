import { ListChecks, Phone, Megaphone, CheckSquare } from 'lucide-react';
import type { TaskSubMenuItem, TaskItem } from '../types';

export const TASK_SUB_MENU_ITEMS: TaskSubMenuItem[] = [
  { id: 'task', title: 'Task', link: '/user/tasks', icon: ListChecks },
  { id: 'call-tasks', title: 'Call Tasks', link: '/user/tasks/call', icon: Phone },
  { id: 'campaign-tasks', title: 'Campaign Tasks', link: '/user/tasks/campaign', icon: Megaphone },
  { id: 'deal-tasks', title: 'Deal Tasks', link: '/user/tasks/deal', icon: CheckSquare },
];

export const SAMPLE_TASKS: TaskItem[] = [
  { id: 1, slNo: 1, title: 'Follow up for Website Demo', category: 'Demo', deal: 'Website Development', dealId: 'DL001', amount: 150000, description: 'Schedule follow up call', scheduledDate: '2024-01-20', scheduledTime: '10:00', assignedBy: 'Admin', assignedTo: 'John Doe', priority: 'high', status: 'pending' },
  { id: 2, slNo: 2, title: 'Payment Reminder - CRM', category: 'Payment Reminder', deal: 'CRM Implementation', dealId: 'DL002', amount: 200000, description: 'Send payment reminder', scheduledDate: '2024-01-18', scheduledTime: '14:00', assignedBy: 'Admin', assignedTo: 'Jane Smith', priority: 'medium', status: 'completed' },
  { id: 3, slNo: 3, title: 'Documentation Review', category: 'Documentation', deal: 'Annual Maintenance', dealId: 'DL003', amount: 50000, description: 'Review all documents', scheduledDate: '2024-01-15', scheduledTime: '11:00', assignedBy: 'Admin', assignedTo: 'Mike Johnson', priority: 'low', status: 'overdue' },
  { id: 4, slNo: 4, title: 'Closing Meeting', category: 'Closing', deal: 'Website Development', dealId: 'DL001', amount: 150000, description: 'Final closing discussion', scheduledDate: '2024-01-25', scheduledTime: '15:00', assignedBy: 'Admin', assignedTo: 'John Doe', priority: 'high', status: 'pending' },
];

export const COLUMNS = [
  { key: 'checkbox', label: '' },
  { key: 'slNo', label: 'Sl No' },
  { key: 'title', label: 'Title', sortable: true },
  { key: 'category', label: 'Category', sortable: true },
  { key: 'deal', label: 'Deal', sortable: true },
  { key: 'amount', label: 'Amount', sortable: true },
  { key: 'description', label: 'Description' },
  { key: 'scheduledDate', label: 'Scheduled Date', sortable: true },
  { key: 'assignedBy', label: 'Assigned By', sortable: true },
  { key: 'assignedTo', label: 'Assigned To', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'action', label: 'Action', sortable: true },
];
