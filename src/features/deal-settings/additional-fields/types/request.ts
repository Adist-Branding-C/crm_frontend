export interface DealAdditionalFieldFormData {
  fieldName: string;
  fieldType: string;
  inFilter: boolean;
  inList: boolean;
  required: boolean;
  dropdownValues: string[];
  currentDropdownValue: string;
}

export interface DealAdditionalFieldPayload {
  fieldName: string;
  fieldType: string;
  isRequired: boolean;
  showInList: boolean;
  showInFilter: boolean;
  values?: string[];
}

export interface DealAdditionalFieldQueryParams {
  pageNumber?: number;
  limit?: number;
  search?: string;
}
