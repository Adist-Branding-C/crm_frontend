export interface DepartmentItem {
  id: number;
  departmentName?: string;
  name?: string;
  description?: string;
  status?: string;
}

export interface DepartmentFormData {
  departmentName: string;
  description: string;
  status: string;
}

export interface DepartmentListResponse {
  status: boolean;
  message: string;
  data: {
    items: DepartmentItem[];
    pagination?: {
      total: number;
    };
  };
}

export interface DepartmentResponse {
  status: boolean;
  message: string;
  data: DepartmentItem | undefined;
  errors?: Record<string, string[]>;
  field?: string;
}

export interface DeleteDepartmentResponse {
  status: boolean;
  message: string;
}

export type DepartmentQueryParams = Record<string, string | number>;
