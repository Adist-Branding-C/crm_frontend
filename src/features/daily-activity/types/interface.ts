export interface ActivityChangeItem {
  fieldName: string;
  oldValue?: string;
  newValue?: string;
}

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
  changes: ActivityChangeItem[];
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
  deletedByType: string | null;
  // Resolved in the database via a @VirtualColumn on the entity (BaseEntity's
  // createdByName/updatedByName, and Activity's own actorName keyed off
  // actor_id/actor_type) - not a separate enrichment query/service.
  createdByName: string | null;
  updatedByName: string | null;
  companyId: string;
  actorId: string;
  actorType: string;
  actorName: string | null;
  entityType: string;
  entityId: string;
  activityType: string;
  description: string;
  changes?: ActivityChangeItem[];
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
