import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { DepartmentFormData } from './department.types';

export interface AddDepartmentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: DepartmentFormData;
  onSubmit: (values: DepartmentFormData, helpers: FormikHelpers<DepartmentFormData>) => void | Promise<void>;
  isLoading: boolean;
  error: string;
  isEditing: boolean;
}
