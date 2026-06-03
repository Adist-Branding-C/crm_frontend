export interface DealAdditionalField {
  id: number;
  field: string;
  type: string;
  inFilter: boolean;
  inList: boolean;
  required: boolean;
}

export interface FormData {
  fieldName: string;
  fieldType: string;
  inFilter: boolean;
  inList: boolean;
  required: boolean;
}
