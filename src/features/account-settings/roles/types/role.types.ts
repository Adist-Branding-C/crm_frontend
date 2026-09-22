import type { ModulePermissions } from '../../../../shared/constants/modules';

// A role as returned by the backend list (GET /role/custom) and detail endpoints (account-settings/roles).
// The custom catalog returns id (string slug), name, permissions, createdAt, updatedAt.
export interface RoleItem {
  id: string;
  roleName?: string;
  name?: string;
  /** Count of modules the role has at least one permission on. If the backend supplies it, show it directly. */
  module_count?: number;
  modulesAssigned?: number;
  /** Flat count used as a fallback when module_count/modulesAssigned are absent. */
  assignedModules?: number;
  permissions?: ModulePermissions;
  canAccessWeb?: boolean;
  created_at?: string;
  createdAt?: string;
  created_date?: string;
  /** Number of staff members currently holding this role; drives the delete-dependency block. */
  staffCount?: number;
}

// Formik shape for the AddRoleDrawer — role name plus the module permission matrix.
export interface RoleFormData {
  roleName: string;
  canAccessWeb: boolean;
  permissions: ModulePermissions;
}

// Server-ready update payload built from RoleFormData (structured for the backend contract; adjust when confirmed).
export interface RolePayload {
  roleName: string;
  canAccessWeb: boolean;
  permissions: ModulePermissions;
}

export interface RoleListResponse {
  status: boolean;
  message: string;
  data?: {
    items: RoleItem[];
    pagination?: {
      total: number;
    };
  };
}

export interface RoleResponse {
  status: boolean;
  message: string;
  data?: RoleItem;
  errors?: Record<string, string[]>;
  field?: string;
}

export interface DeleteRoleResponse {
  status: boolean;
  message: string;
}

export type RoleQueryParams = Record<string, string | number>;

export interface RoleOption {
  label: string;
  value: string;
}
