import type { MailConfigFormData, MailConfigItem } from '../types';

export const MAIL_DRIVER_OPTIONS = [
  { value: 'smtp', label: 'SMTP' },
  { value: 'sendmail', label: 'Sendmail' },
  { value: 'mailgun', label: 'Mailgun' },
];

export const ENCRYPTION_OPTIONS = [
  { value: 'tls', label: 'TLS' },
  { value: 'ssl', label: 'SSL' },
];

export const MAIL_CONFIG_DATA: MailConfigItem[] = [
  { id: 1, driver: 'SMTP', port: 587, encryption: 'TLS', auth: 'Yes', active: true },
];

export const MAIL_CONFIG_FIELD_MAP: Record<string, string> = {
  host: 'host',
  port: 'port',
  username: 'username',
  from_email: 'fromEmail',
};

export const ADD_MAIL_CONFIG_INITIAL_VALUES: MailConfigFormData = {
  driver: '', host: '', port: '', encryption: '',
  username: '', password: '', fromEmail: '', fromName: '',
};

export const INITIAL_MAIL_FORM = {
  driver: '', host: '', port: '', encryption: '',
  username: '', password: '', fromEmail: '', fromName: '',
};
