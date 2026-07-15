export interface DealTypeItem {
  id: number;
  name: string;
  status: boolean;
}

export interface ApiDealTypeItem {
  id: number;
  dealType?: string;
  name?: string;
  status: boolean;
}
