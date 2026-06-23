import type { Schema } from 'yup';
import type { CallTaskFormData } from './callTask.types';

export interface CallTaskFormProps {
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: CallTaskFormData;
  onSubmit: (values: CallTaskFormData) => Promise<void>;
  isLoading: boolean;
  error: string;
  isEditing: boolean;
  staffOptions: string[];
}
