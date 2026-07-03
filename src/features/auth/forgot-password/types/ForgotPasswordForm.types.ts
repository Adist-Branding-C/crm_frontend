import type { FormikHelpers } from 'formik';
import type { ForgotPasswordFormData } from './forgotPassword.types';

export interface ForgotPasswordFormProps {
  initialValues: ForgotPasswordFormData;
  validationSchema: unknown;
  onSubmit: (values: ForgotPasswordFormData, helpers: FormikHelpers<ForgotPasswordFormData>) => Promise<void>;
  isLoading: boolean;
  error: string;
}
