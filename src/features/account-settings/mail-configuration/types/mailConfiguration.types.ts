export interface MailConfigFormData {
  driver: string;
  host: string;
  port: string;
  encryption: string;
  username: string;
  password: string;
  fromEmail: string;
  fromName: string;
}

export interface MailConfigResponse {
  status: boolean;
  message: string;
  data?: unknown;
  errors?: Record<string, string[]>;
  field?: string;
}
