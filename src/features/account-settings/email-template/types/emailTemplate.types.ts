export interface EmailTemplateItem {
  id: number;
  templateName: string;
  title?: string;
  subject: string;
  content: string;
  htmlCode?: string;
  isDefault?: boolean;
  status: string;
}

export interface EmailTemplateFormData {
  templateName: string;
  subject: string;
  content: string;
  isDefault: boolean;
  status: string;
}

export interface EmailTemplateResponse {
  status: boolean;
  message: string;
  data?: unknown;
}

export interface DeleteEmailTemplateResponse {
  status: boolean;
  message: string;
}
