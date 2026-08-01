export interface PaginationRequest {
  pageNumber?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  status: boolean;
  message: string;
  data: {
    items: T[];
    pagination: any;
  };
}

export enum NotificationType {
    NEW_LEAD_ASSIGNED = 'New lead assigned',
    TASK_ASSIGNED = 'Task assigned',
    DEAL_WON = 'Deal won',
    DEAL_LOST = 'Deal lost',
    FOLLOWUP_REMINDER = 'Followup reminder',
    AUTOMATION_DIGEST = 'Automation digest',
}

export interface NotificationItem {
  id: string;
  title: string;
  notification: string;
  type: NotificationType;
  time: string;
  isRead: boolean;
  link?: string; // We can generate links dynamically on the frontend based on type
}

export interface GetNotificationQueryParams extends PaginationRequest {
  search?: string;
  isRead?: boolean;
}

export interface MarkAsReadPayload {
  notificationIds: string[];
}

export type NotificationListResponse = PaginatedResponse<NotificationItem>;
