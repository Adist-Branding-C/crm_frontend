export interface PopulatedField {
  id: number;
  name: string;
}

export interface TaskItem {
  id: number;
  title: string;
  description: string;
  category: PopulatedField;
  scheduledDate: string;
  scheduledTime: string;
  assignedBy: string;
  assignedTo: PopulatedField;
  priority: string;
  status: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  category: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedTo: string;
  priority: string;
  status: string;
}
