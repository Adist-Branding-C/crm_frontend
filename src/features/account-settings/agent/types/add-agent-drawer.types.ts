import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { AgentFormData, DesignationOption, DepartmentOption } from './agent.types';
import type { RoleOption } from '../../roles/types/role.types';

export interface AddAgentDrawerVisibility {
  isOpen: boolean;
  onClose: () => void;
}

export interface AddAgentDrawerForm {
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: AgentFormData;
  onSubmit: (values: AgentFormData, helpers: FormikHelpers<AgentFormData>) => void | Promise<void>;
  isEditing: boolean;
}

export interface AddAgentDrawerStatus {
  isLoading: boolean;
  error: string;
}

export interface AddAgentDrawerDesignation {
  options: DesignationOption[];
  onFetch: () => void;
}

export interface AddAgentDrawerDepartment {
  options: DepartmentOption[];
  onFetch: () => void;
}

export interface AddAgentDrawerRole {
  options: RoleOption[];
  onFetch: () => void;
}

export interface AddAgentDrawerProps {
  visibility: AddAgentDrawerVisibility;
  form: AddAgentDrawerForm;
  status: AddAgentDrawerStatus;
  designation: AddAgentDrawerDesignation;
  department: AddAgentDrawerDepartment;
  role: AddAgentDrawerRole;
}
