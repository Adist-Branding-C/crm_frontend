import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { BranchFormData } from './branch.types';

export interface AddBranchDrawerVisibility {
  isOpen: boolean;
  onClose: () => void;
}

export interface AddBranchDrawerForm {
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: BranchFormData;
  onSubmit: (values: BranchFormData, helpers: FormikHelpers<BranchFormData>) => void | Promise<void>;
  isEditing: boolean;
}

export interface AddBranchDrawerStatus {
  isLoading: boolean;
  error: string;
}

export interface AddBranchDrawerProps {
  visibility: AddBranchDrawerVisibility;
  form: AddBranchDrawerForm;
  status: AddBranchDrawerStatus;
}
