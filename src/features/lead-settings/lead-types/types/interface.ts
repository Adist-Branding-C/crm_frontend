export interface LeadTypeItem {
  id: string;
  addedBy: string;
  type: string;
}

export interface LeadTypeApiItem {
  typeId: string;
  type: string;
  companyId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadTypeFormData {
  type: string;
}
