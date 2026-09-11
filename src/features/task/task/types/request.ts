import type { RepeatType } from './interface';

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
  workflowId?: string;
  stageId?: string;
  repeatType?: RepeatType;
  repeatConfig?: {
    dayOfWeek?: number;
    dayOfMonth?: number | 'last';
  } | undefined;
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
  repeatType?: RepeatType;
  repeatConfig?: {
    dayOfWeek?: number;
    dayOfMonth?: number | 'last';
  } | undefined;
}
