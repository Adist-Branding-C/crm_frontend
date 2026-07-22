import type { ActivityItem, PaginationInfo, StaffListItem } from './interface';

export interface ActivityResponseData {
  items: ActivityItem[];
  pagination: PaginationInfo;
}

export interface StaffListResponseData {
  items: StaffListItem[];
}
