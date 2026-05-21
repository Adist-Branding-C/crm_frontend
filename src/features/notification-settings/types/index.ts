import type { ComponentType } from 'react';

export interface NotificationConfig {
  smtpHost?: string;
  port?: string;
  username?: string;
  password?: string;
  fromName?: string;
  provider?: string;
  apiKey?: string;
  senderId?: string;
  botToken?: string;
  chatId?: string;
  webhookUrl?: string;
}

export interface NotificationItem {
  id: number;
  type: string;
  status: string;
  config: NotificationConfig;
}

export interface MenuItem {
  id: string;
  label: string;
  link: string;
  icon: ComponentType<{ size?: number }>;
}
