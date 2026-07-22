export interface AdditionalField {
  id: number;
  field: string;
  type: string;
  inFilter: boolean;
  inList: boolean;
  required: boolean;
  purpose: boolean;
}

export interface FormData {
  fieldName: string;
  fieldType: string;
  inFilter: boolean;
  inList: boolean;
  required: boolean;
  purpose: boolean;
}
