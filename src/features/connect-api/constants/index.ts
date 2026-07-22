import type { ApiParameter, Tab } from '../types';

export const apiParameters: ApiParameter[] = [
  { parameter: 'name', type: 'String', required: 'Yes', description: "Lead's full name." },
  { parameter: 'phone', type: 'String', required: 'Yes', description: "Lead's phone number." },
  { parameter: 'email', type: 'String', required: 'Yes', description: "Lead's email address." },
  { parameter: 'status', type: 'String', required: 'Yes', description: 'Name of an existing Lead Status configured in your account (case-insensitive).' },
  { parameter: 'source', type: 'String', required: 'Yes', description: 'Name of an existing Lead Source configured in your account (case-insensitive).' },
  { parameter: 'purpose', type: 'String', required: 'Yes', description: 'Name of an existing Lead Purpose configured in your account (case-insensitive).' },
  { parameter: 'type', type: 'String', required: 'Yes', description: 'Name of an existing Lead Type configured in your account (case-insensitive).' },
  { parameter: 'agent', type: 'String', required: 'No', description: 'Name of the staff member to assign the lead to (case-insensitive). Left out, the lead is created unassigned.' },
  { parameter: 'notes', type: 'String', required: 'No', description: 'Note added to the lead on creation.' },
  { parameter: 'location', type: 'String', required: 'No', description: "Lead's location." },
  { parameter: 'address', type: 'String', required: 'No', description: "Lead's address." },
  { parameter: 'nextFollowUp', type: 'Date (ISO 8601)', required: 'No', description: 'Next follow-up date, e.g. 2026-08-01.' },
];

export const tabs: Tab[] = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'parameters', label: 'Parameters' },
  { id: 'example', label: 'Example' },
  { id: 'response', label: 'Response' },
];
