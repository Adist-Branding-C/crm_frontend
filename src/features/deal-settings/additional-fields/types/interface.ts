export interface DealAdditionalField {
  id: number;
  field: string;
  type: string;
  inFilter: boolean;
  inList: boolean;
  required: boolean;
}

export interface ApiDealAdditionalField {
  id: number;
  fieldName: string;
  fieldType: string;
  isRequired: boolean;
  showInList: boolean;
  showInFilter: boolean;
}
