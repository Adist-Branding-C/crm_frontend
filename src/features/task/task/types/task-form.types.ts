import type { Schema } from 'yup';
import type { TaskFormData } from './task.types';

export interface TaskFormProps {
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: TaskFormData;
  onSubmit: (values: TaskFormData) => Promise<void>;
  isLoading: boolean;
  error: string;
  isEditing: boolean;
  categoryOptions: string[];
  staffOptions: string[];
}
