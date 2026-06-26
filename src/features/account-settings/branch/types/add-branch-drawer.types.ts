import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { BranchFormData } from './branch.types';

export interface AddBranchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: BranchFormData;
  onSubmit: (values: BranchFormData, helpers: FormikHelpers<BranchFormData>) => void | Promise<void>;
  isLoading: boolean;
  error: string;
  isEditing: boolean;
}

{}
