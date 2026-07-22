import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { DesignationFormData } from './designation.types';

export interface AddDesignationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: DesignationFormData;
  onSubmit: (values: DesignationFormData, helpers: FormikHelpers<DesignationFormData>) => void | Promise<void>;
  isLoading: boolean;
  error: string;
  isEditing: boolean;
}
