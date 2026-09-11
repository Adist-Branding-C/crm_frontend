import type { RepeatType, RepeatConfig } from '../../task/types/interface';

export interface DealTaskFormData {
  title: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedTo: string;
  dealId: string;
  priority: string;
  status: string;
  workflowId?: string;
  stageId?: string;
  repeatType?: RepeatType;
  repeatConfig?: RepeatConfig | undefined;
}
