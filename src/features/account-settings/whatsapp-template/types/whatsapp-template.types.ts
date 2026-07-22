export interface WhatsappTemplateItem {
  id: number;
  templateName: string;
  message: string;
  status: string;
  name?: string;
  content?: string;
}

export interface WhatsappTemplateFormData {
  templateName: string;
  message: string;
  status: string;
}

export interface WhatsappTemplateResponse {
  status: boolean;
  message: string;
  data?: unknown;
  errors?: Record<string, string[]>;
  field?: string;
}
