export interface LeadPurposeItem {
  id: string;
  addedBy: string;
  title: string;
}

export interface LeadPurposeApiItem {
  purposeId: string;
  purpose: string;
  createdBy: string;
  createdByType: string;
  createdByName: string | null;
}

export interface LeadPurposeFormData {
  title: string;
}
