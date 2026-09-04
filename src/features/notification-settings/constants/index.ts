import { Bell } from 'lucide-react';
import type { MenuItem, NotificationItem } from '../types';

// Hidden: Notification Settings page disabled per client request (2026-09-04)
// export const menuItems: MenuItem[] = [
//   { id: 'configure', label: 'Configure Notification', link: '/user/notifications-users', icon: Bell },
// ];
export const menuItems: MenuItem[] = [];

export const initialData: NotificationItem[] = [
  { id: 1, type: 'Email', status: 'Active', config: { smtpHost: '', port: '', username: '', password: '', fromName: '' } },
  { id: 2, type: 'SMS', status: 'Inactive', config: { provider: '', apiKey: '', senderId: '' } },
  { id: 3, type: 'Telegram', status: 'Active', config: { botToken: '', chatId: '', webhookUrl: '' } },
];
