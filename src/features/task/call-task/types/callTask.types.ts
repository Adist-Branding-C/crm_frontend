export interface PopulatedField {
  id: number;
  name: string;
}

export interface CallTaskItem {
  id: number;
  title: string;
  description: string;
  contactName: string;
  contactPhone: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: string;
  assignedTo: PopulatedField;
  status: string;
}

export interface CallTaskFormData {
  title: string;
  description: string;
  contactName: string;
  contactPhone: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: string;
  assignedTo: string;
  status: string;
}
