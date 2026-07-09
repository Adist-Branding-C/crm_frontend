export interface LeadSourceItem {
  id: string;
  source: string;
  addedBy: string;
}

export interface LeadSourceApiItem {
  sourceId: string;
  source: string;
  companyId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadSourceFormData {
  source: string;
}
