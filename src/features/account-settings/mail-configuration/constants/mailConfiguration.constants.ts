import type { MailConfigFormData } from '../types/mailConfiguration.types';

export const ADD_MAIL_CONFIG_INITIAL_VALUES: MailConfigFormData = {
  driver: '',
  host: '',
  port: '',
  encryption: '',
  username: '',
  password: '',
  fromEmail: '',
  fromName: '',
};
