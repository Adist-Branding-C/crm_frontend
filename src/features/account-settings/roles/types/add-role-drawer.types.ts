import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { RoleFormData } from './role.types';

export interface AddRoleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: RoleFormData;
  onSubmit: (values: RoleFormData, helpers: FormikHelpers<RoleFormData>) => void | Promise<void>;
  isLoading: boolean;
  error: string;
  isEditing: boolean;
}
