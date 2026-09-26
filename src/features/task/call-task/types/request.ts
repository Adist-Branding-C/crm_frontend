import type { RepeatType, RepeatConfig } from '../../task/types/interface';

export interface CallTaskFormData {
  title: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedTo: string;
  leadId: string;
  priority: string;
  status: string;
  workflowId?: string;
  stageId?: string;
  repeatType?: RepeatType;
  repeatConfig?: RepeatConfig | undefined;
}
