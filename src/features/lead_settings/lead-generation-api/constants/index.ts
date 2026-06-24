import type { ApiParameter, Tab } from '../types';

export const apiParameters: ApiParameter[] = [
  { parameter: 'token', type: 'String', required: 'Yes', description: 'Your unique API token' },
  { parameter: 'name', type: 'String', required: 'Yes', description: "Customer's full name" },
  { parameter: 'email', type: 'String', required: 'No', description: "Customer's email address" },
  { parameter: 'countrycode', type: 'String', required: 'Yes', description: "Customer's country code" },
  { parameter: 'mobileno', type: 'String', required: 'Yes', description: "Customer's mobile number" },
  { parameter: 'feedback', type: 'String', required: 'No', description: 'Customer feedback' },
  { parameter: 'source', type: 'String', required: 'Yes', description: 'Lead source (e.g., "Demo request")' },
  { parameter: 'type', type: 'String', required: 'No', description: 'Lead type' },
  { parameter: 'company_name', type: 'String', required: 'No', description: "Customer's company name" },
  { parameter: 'staff_name', type: 'String', required: 'No', description: 'Staff assigned to the lead' },
  { parameter: 'date_of_birth', type: 'Date', required: 'No', description: "Customer's date of birth" },
  { parameter: 'purpose', type: 'String', required: 'No', description: 'Purpose of the lead' },
  { parameter: 'status', type: 'String', required: 'No', description: 'Status of the lead' },
  { parameter: 'department', type: 'String', required: 'No', description: 'Department for staff auto-assignment' },
  { parameter: 'lead_note', type: 'String', required: 'No', description: 'Notes related to the lead' },
  { parameter: 'address', type: 'String', required: 'No', description: 'Address of the lead' },
  { parameter: 'more_phone_numbers', type: 'String', required: 'No', description: 'Additional phone numbers (comma-separated, max 2 numbers)' },
];

export const additionalFields: ApiParameter[] = [
  { parameter: 'location', type: 'String', required: 'No', description: "replace with the 'location'" },
  { parameter: 'Remarks', type: 'String', required: 'No', description: "replace with the 'Remarks'" },
  { parameter: 'Date', type: 'String', required: 'No', description: "replace with the 'Date'" },
  { parameter: 'Assigned Date', type: 'String', required: 'No', description: "replace with the 'Assigned Date'" },
];

export const tabs: Tab[] = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'parameters', label: 'Parameters' },
  { id: 'example', label: 'Example' },
  { id: 'response', label: 'Response' },
];
