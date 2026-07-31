import { useState, useCallback, useEffect } from 'react';
import { notificationService } from '../services/notification.service';
import { NotificationItem, GetNotificationQueryParams } from '../types';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async (params: GetNotificationQueryParams = { pageNumber: 1, limit: 50 }) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Fetching notifications...');
      const data = await notificationService.getNotifications(params);
      console.log('Notifications API response:', data);
      setNotifications(data?.data?.items || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch notifications');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAsRead = async (notificationIds: string[]) => {
    try {
      await notificationService.markAsRead({ notificationIds });
      // Optimistically update the state
      setNotifications(prev =>
        prev.map(n => (notificationIds.includes(n.id) ? { ...n, isRead: true } : n))
      );
    } catch (err: any) {
      console.error('Failed to mark as read', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      // Optimistically update the state
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (err: any) {
      console.error('Failed to mark all as read', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Optional: Add polling here if real-time updates are needed
    // const interval = setInterval(fetchNotifications, 60000);
    // return () => clearInterval(interval);
  }, [fetchNotifications]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return {
    notifications,
    isLoading,
    error,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refresh: fetchNotifications,
  };
};
