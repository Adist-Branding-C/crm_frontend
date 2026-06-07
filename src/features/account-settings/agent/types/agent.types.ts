export interface AgentItem {
  id: number;
  staff_id?: string;
  fullName?: string;
  name?: string;
  email: string;
  phone?: string;
  phone_number?: string;
  phoneNumber?: string;
  mobile?: string;
  designationId?: string;
  designation?: string;
  status: string;
}

export interface AgentFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  designationId: string;
  status: string;
}

export interface AgentResponse {
  status: boolean;
  message: string;
  data?: unknown;
}

export interface DesignationOption {
  label: string;
  value: string;
}
