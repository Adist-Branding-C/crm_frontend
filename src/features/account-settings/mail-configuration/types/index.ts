export interface MailConfigItem {
  id: number;
  driver: string;
  host?: string;
  port: number;
  encryption: string;
  username?: string;
  password?: string;
  fromEmail?: string;
  fromName?: string;
  auth: string;
  active: boolean;
}

export * from './mailConfiguration.types';
