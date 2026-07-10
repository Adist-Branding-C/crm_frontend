export interface LeadAdditionalApiItem {
  fieldId: string;
  name: string;
  fieldKey: string;
  fieldType: string;
  isRequired: boolean;
  showInList: boolean;
  showInFilter: boolean;
  connectWithLeadPurpose: boolean;
  purpose?: string;
  purposeId: string | null;
  values: string[];
  createdByType: string;
  createdByName: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LeadAdditionalItem {
  id: string;
  addedBy: string;
  field: string;
  fieldKey: string;
  type: string;
  inFilter: boolean;
  inList: boolean;
  required: boolean;
  purpose: boolean;
  purposeName: string;
  purposeId: string | null;
  dropdownValues: string[];
}

export interface LeadPurposeOption {
  id: string;
  title: string;
}

export interface AdditionalFieldFormData {
  name: string;
  fieldType: string;
  showInFilter: boolean;
  showInList: boolean;
  isRequired: boolean;
  connectWithLeadPurpose: boolean;
  purposeId: string;
  dropdownValues: string[];
}
