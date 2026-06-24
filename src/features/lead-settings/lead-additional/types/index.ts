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
  createdAt: string;
  updatedAt: string;
}

export interface LeadAdditionalItem {
  id: string;
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

export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CreateLeadAdditionalPayload {
  name: string;
  fieldType: string;
  isRequired: boolean;
  showInList: boolean;
  showInFilter: boolean;
  connectWithLeadPurpose: boolean;
  purposeId?: string | null;
  values?: string[];
}

export interface UpdateLeadAdditionalPayload {
  name?: string;
  fieldType?: string;
  isRequired?: boolean;
  showInList?: boolean;
  showInFilter?: boolean;
  connectWithLeadPurpose?: boolean;
  purposeId?: string | null;
  values?: string[];
}

export interface CreateLeadAdditionalResponse {
  status: boolean;
  message: string;
  data: {
    fieldId: string;
  };
}

export interface LeadAdditionalResponse {
  status: boolean;
  message: string;
  data: LeadAdditionalApiItem;
}

export interface LeadAdditionalListResponse {
  status: boolean;
  message: string;
  data: {
    items: LeadAdditionalApiItem[];
    pagination: PaginationResponse;
  };
}

export interface DeleteLeadAdditionalResponse {
  status: boolean;
  message: string;
}

export interface LeadPurposeOption {
  id: string;
  title: string;
}

export interface FormData {
  name: string;
  fieldType: string;
  showInFilter: boolean;
  showInList: boolean;
  isRequired: boolean;
  connectWithLeadPurpose: boolean;
  purposeId: string;
  dropdownValues: string[];
  currentDropdownValue: string;
}
