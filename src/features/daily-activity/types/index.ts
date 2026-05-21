export interface Activity {
  id: number;
  type: string;
  user: string;
  relatedLead: string;
  description: string;
  timestamp: string;
  timeAgo: string;
  badge: string;
}

export interface StaffOption {
  id: number;
  name: string;
}

export interface ActivityTypeOption {
  id: number;
  name: string;
}

export interface Filters {
  date: string;
  startTime: string;
  endTime: string;
  staff: number;
  type: number;
}
