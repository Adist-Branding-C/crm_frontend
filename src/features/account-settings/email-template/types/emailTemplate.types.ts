export interface EmailTemplateItem {
  id: number
  templateName: string
  title?: string
  subject: string
  content: string
  htmlCode?: string
  isDefault?: boolean
  status: string
}

export interface EmailTemplateFormData {
  templateName: string
  subject: string
  content: string
  isDefault: boolean
  status: string
}

export interface EmailTemplateResponse {
  status: boolean
  message: string
  data: EmailTemplateItem | undefined
}

export interface EmailTemplateListResponse {
  status: boolean
  message: string
  data: { items: EmailTemplateItem[] } | undefined
}

export interface EmailTemplateQueryParams {
  [key: string]: string | number | boolean | undefined
}

export interface DeleteResponse {
  status: boolean
  message: string
}
