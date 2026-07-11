import { Bell } from 'lucide-react';
export const menuItems = [
    { id: 'configure', label: 'Configure Notification', link: '/user/notifications-users', icon: Bell },
];
export const initialData = [
    { id: 1, type: 'Email', status: 'Active', config: { smtpHost: '', port: '', username: '', password: '', fromName: '' } },
    { id: 2, type: 'SMS', status: 'Inactive', config: { provider: '', apiKey: '', senderId: '' } },
    { id: 3, type: 'Telegram', status: 'Active', config: { botToken: '', chatId: '', webhookUrl: '' } },
];
//# sourceMappingURL=index.js.map