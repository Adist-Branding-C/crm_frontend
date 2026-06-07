export interface DesignationItem {
  id: number;
  designationName: string;
  name?: string;
  description: string;
  status: string;
}

export interface DesignationFormData {
  designationName: string;
  description: string;
  status: string;
}

export interface DesignationListData {
  items: DesignationItem[];
}

export interface DesignationResponse {
  status: boolean;
  message: string;
  data?: unknown;
}

export interface DeleteDesignationResponse {
  status: boolean;
  message: string;
}
