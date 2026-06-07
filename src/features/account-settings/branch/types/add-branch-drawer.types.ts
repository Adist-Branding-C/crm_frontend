import type { FormikHelpers } from 'formik';
import type { AnyObjectSchema } from 'yup';
import type { BranchFormData } from './branch.types';

export interface AddBranchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: AnyObjectSchema;
  initialValues: BranchFormData;
  onSubmit: (values: BranchFormData, helpers: FormikHelpers<BranchFormData>) => void | Promise<void>;
  isLoading: boolean;
  error: string;
  isEditing: boolean;
}
