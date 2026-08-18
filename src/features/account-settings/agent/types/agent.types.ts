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
  countryCode?: string;
  designationId?: string;
  designation_id?: number | string;
  designation?: string;
  departmentId?: string;
  department_id?: number | string;
  status: string;
  isAdmin?: boolean;
}


export interface AgentFormData {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  password: string;
  confirmPassword: string;
  designationId: string;
  departmentId: string;
  status: string;
  isAdmin: boolean;
}

export interface AgentResponse {
  status: boolean;
  message: string;
  data?: unknown;
  errors?: Record<string, string[]>;
  field?: string;
}

export interface GetAllAgentsParams {
  pageNumber?: number;
  limit?: number;
  search?: string;
}

export interface AgentListData {
  items: AgentItem[];
  pagination?: { total: number };
}

export interface GetAllAgentsResponse {
  status: boolean;
  message: string;
  data?: AgentListData;
}

export interface DesignationOption {
  label: string;
  value: string;
}

export interface StaffAutomationReference {
  id: number;
  automationRuleId: number;
  ruleName: string;
  actionType: string;
}

export interface StaffDeletionDependencies {
  leadCount: number;
  taskCount: number;
  automationActions: StaffAutomationReference[];
}

export interface StaffDeletionDependenciesResponse {
  status: boolean;
  message?: string;
  data?: StaffDeletionDependencies;
}

export interface StaffProfile {
  staffId?: string;
  companyId?: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
}

export interface GetStaffMeResponse {
  status: boolean;
  message: string;
  data: StaffProfile;
}

export interface DepartmentOption {
  label: string;
  value: string;
}
