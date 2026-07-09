export interface LeadStatusItem {
  id: string;
  status: string;
  color: string;
  useForConversion: boolean;
}

export interface LeadStatusApiItem {
  statusId: string;
  status: string;
  color: string;
  conversion: boolean;
}

export interface LeadStatusFormData {
  status: string;
  color: string;
  useForConversion: boolean;
}
