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
