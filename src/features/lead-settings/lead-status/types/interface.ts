export interface LeadStatusItem {
  id: string;
  addedBy: string;
  status: string;
  color: string;
  useForConversion: boolean;
}

export interface LeadStatusApiItem {
  statusId: string;
  status: string;
  color: string;
  conversion: boolean;
  createdBy: string;
  createdByType: string;
  createdByName: string | null;
}

export interface LeadStatusFormData {
  status: string;
  color: string;
  useForConversion: boolean;
}
