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
  data: WhatsappTemplateItem;
}

export interface WhatsappTemplateListResponse {
  status: boolean;
  message: string;
  data: {
    items: WhatsappTemplateItem[];
  };
}

export interface CreateWhatsappTemplateRequest {
  templateName: string;
  message: string;
  status: string;
}

export interface UpdateWhatsappTemplateRequest {
  templateName: string;
  message: string;
  status: string;
}
