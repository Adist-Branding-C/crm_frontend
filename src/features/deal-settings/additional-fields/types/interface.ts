export interface DealAdditionalField {
  id: string;
  addedBy: string;
  field: string;
  type: string;
  inFilter: boolean;
  inList: boolean;
  required: boolean;
  dropdownValues: string[];
}

export interface ApiDealAdditionalField {
  fieldId: string;
  fieldName: string;
  fieldKey: string;
  fieldType: string;
  isRequired: boolean;
  showInList: boolean;
  showInFilter: boolean;
  values: string[];
  createdAt: string;
  createdByName: string | null;
  createdByType: string;
}
