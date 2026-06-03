import type { FormField } from '../../../shared/types/crud';
import type { DealStageItem } from '../types';

export const formFields: FormField[] = [
  { name: 'status', label: 'Status', type: 'text', required: true, placeholder: 'Enter status' },
  { name: 'stage', label: 'Stage', type: 'text', required: true, placeholder: 'Enter stage' },
  { name: 'priority', label: 'Priority', type: 'text', required: true, placeholder: 'Enter priority' },
];

export const columns = [
  { key: 'status', label: 'Status' },
  { key: 'stage', label: 'Stage' },
  { key: 'priority', label: 'Priority' },
];

export const DEAL_STAGE_DATA: DealStageItem[] = [
  { id: 1, status: 'Deal Lost', stage: 'Lose', priority: 1 },
];
