export interface Activity {
  id: number;
  type: string;
  entityType: string;
  user: string;
  relatedLead: string;
  hasContactInfo: boolean;
  description: string;
  timestamp: string;
  timeAgo: string;
  badge: string;
}

// Staff filter options carry the real staff_id (string), not a numeric mock id.
export interface StaffOption {
  id: string;
  name: string;
}

export type ActivityTypeOption = { value: string; label: string };

// '' represents "All Staff" (no actorId filter applied).
export interface Filters {
  date: string;
  startTime: string;
  endTime: string;
  staff: string;
}

export interface ActivityItem {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string | null;
  createdByType: string | null;
  updatedBy: string | null;
  updatedByType: string | null;
  deletedBy: string | null;
  companyId: string;
  actorId: string;
  actorType: string;
  entityType: string;
  entityId: string;
  activityType: string;
  description: string;
  actorName: string;
  name: string | null;
  phone: string | null;
}

// Raw staff list item shape as returned by GET /staff.
export interface StaffListItem {
  staff_id: string;
  name: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

// 'ellipsis' is a non-clickable "..." gap marker between windowed page numbers.
export type PageNumberEntry = number | 'ellipsis';
