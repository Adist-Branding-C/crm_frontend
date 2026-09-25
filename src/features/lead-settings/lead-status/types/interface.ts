export interface LeadStatusApiItem {
  statusId: string;
  status: string;
  color: string;
  conversion: boolean;
  sortOrder: number;
  createdBy: string;
  createdByType: string;
  createdByName: string | null;
}
