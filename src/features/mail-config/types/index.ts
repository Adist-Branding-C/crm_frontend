export interface MailConfigItem {
  id: string;
  driver: string;
  host?: string;
  port: number;
  encryption?: string;
  username?: string;
  password?: string;
  fromEmail?: string;
  fromName?: string;
  isActive: boolean;
}

export interface MailConfigFormData {
  driver: string;
  host: string;
  port: string;
  encryption: string;
  username: string;
  password: string;
  fromEmail: string;
  fromName: string;
  isActive: boolean;
}

export interface MailConfigListResponse {
  status: boolean;
  message: string;
  data: {
    items: MailConfigItem[];
    pagination?: { total: number };
  };
}

export interface MailConfigMutationResponse {
  status: boolean;
  message: string;
  data?: unknown;
}
