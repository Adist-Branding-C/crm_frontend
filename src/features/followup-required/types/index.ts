export interface FollowupLead {
  id: number;
  name: string;
  phone: string;
  assignedTo: string;
  purpose: string;
  type: string;
  status: string;
  source: string;
  createdAt: string;
  updatedAt: string;
  nextFollowUp: string;
}

export interface Filters {
  type: string;
  status: string;
  source: string;
  assignedTo: string;
  dateRange: { start: string; end: string };
}

export interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc';
}
