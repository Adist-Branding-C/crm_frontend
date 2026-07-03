import type { FormikHelpers } from 'formik';
import type { ResetPasswordFormData } from './resetPassword.types';

export interface ResetPasswordFormProps {
  initialValues: ResetPasswordFormData;
  validationSchema: unknown;
  onSubmit: (values: ResetPasswordFormData, helpers: FormikHelpers<ResetPasswordFormData>) => Promise<void>;
  isLoading: boolean;
  error: string;
}
