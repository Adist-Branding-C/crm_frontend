export interface TaskFormData {
  title: string;
  description: string;
  categoryId: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedTo: string;
  leadId: string;
  priority: string;
  status: string;
}

export interface TaskFormDataUpdate {
  title?: string;
  description?: string;
  categoryId?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  assignedTo?: string;
  leadId?: string;
  priority?: string;
  status?: string;
}
