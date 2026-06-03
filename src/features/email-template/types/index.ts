export interface EmailTemplateItem {
  id: number;
  title: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  isDefault: boolean;
  status: string;
  htmlCode?: string;
}
