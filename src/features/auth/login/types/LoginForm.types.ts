import type { FormikHelpers } from 'formik';
import type { LoginFormData } from './login.types';

export interface LoginFormProps {
  initialValues: LoginFormData;
  validationSchema: unknown;
  onSubmit: (values: LoginFormData, helpers: FormikHelpers<LoginFormData>) => Promise<void>;
  isLoading: boolean;
  error: string;
  onForgotPasswordClick: () => void;
}
