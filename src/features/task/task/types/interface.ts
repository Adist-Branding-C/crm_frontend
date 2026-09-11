export type RepeatType = 'Never' | 'Daily' | 'Weekly' | 'Monthly';

export interface RepeatConfig {
  dayOfWeek?: number;
  dayOfMonth?: number | 'last';
}

export interface TaskItem {
  id: number;
  title: string;
  description: string;
  category?: {
    id: number;
    name: string;
  } | null;
  scheduledDate: string;
  scheduledTime: string;
  assignedBy?: {
    id: number;
    name: string;
  } | null;
  assignedTo?: {
    id: number;
    name: string;
  } | null;
  leadId?: {
    id: number;
    name: string;
  } | null;
  priority: string;
  status: string;
  workflowId?: number;
  stageId?: number;
  workflowName?: string | null;
  stageName?: string | null;
  stageColor?: string | null;
  repeatType?: RepeatType;
  repeatConfig?: RepeatConfig;
}
