export interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  location: string;
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
  dateRange: { start: string; end: string };
  filterByDate: string;
  enquirySource: string;
  enquiryPurpose: string;
  leadStatus: string;
  followupAdded: string;
  createdBy: string;
  assignedTo: string;
  leadType: string;
  location: string;
  remarks: string;
  date: string;
}

export interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc';
}

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}
