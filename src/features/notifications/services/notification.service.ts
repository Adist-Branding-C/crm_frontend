import axiosInstance from '../../../api/axiosInstance';
import {
  GetNotificationQueryParams,
  MarkAsReadPayload,
  NotificationListResponse,
} from '../types';

export const notificationService = {
  getNotifications: async (
    params: GetNotificationQueryParams
  ): Promise<NotificationListResponse> => {
    const response = await axiosInstance.get('/notifications', { params });
    return response.data;
  },

  markAsRead: async (payload: MarkAsReadPayload): Promise<void> => {
    await axiosInstance.patch('/notifications/mark-as-read', payload);
  },

  markAllAsRead: async (): Promise<void> => {
    await axiosInstance.patch('/notifications/mark-all-as-read');
  },
};
