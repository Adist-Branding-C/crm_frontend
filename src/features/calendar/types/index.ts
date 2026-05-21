export interface Agent {
  id: number;
  name: string;
}

export interface CalendarTask {
  id: number;
  title: string;
  category: string;
  description: string;
  contactName: string;
  contactPhone: string;
  assignedTo: string;
  dueDate: string;
  dueTime: string;
  addedOn: string;
  addedTime: string;
  addedBy: string;
  status: string;
  priority: string;
}
