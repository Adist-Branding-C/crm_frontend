import type { FormField } from '../../../shared/types/crud';
import type { MeetingOutcomeItem } from '../types';

export const formFields: FormField[] = [
  { name: 'name', label: 'Outcome', type: 'text', required: true, placeholder: 'Enter meeting outcome' },
];

export const columns = [{ key: 'name', label: 'Outcome' }];

export const INIT_DATA: MeetingOutcomeItem[] = [];
