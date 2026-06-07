import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { WorkModeFormData } from './workMode.types';

export interface AddWorkModeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: WorkModeFormData;
  onSubmit: (values: WorkModeFormData, helpers: FormikHelpers<WorkModeFormData>) => void | Promise<void>;
  isLoading: boolean;
  error: string;
  isEditing: boolean;
}
