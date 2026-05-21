export interface TaskItem {
  id: number;
  slNo: number;
  title: string;
  category: string;
  deal: string;
  dealId: string;
  amount: number;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedBy: string;
  assignedTo: string;
  priority: string;
  status: string;
}

export interface TaskFilters {
  deal: string;
  status: string;
  assignedBy: string;
  assignedTo: string;
  category: string;
  dateRange: { start: string; end: string };
}

export interface TaskSubMenuItem {
  id: string;
  title: string;
  link: string;
  icon: React.ComponentType<{ size?: number }>;
}
