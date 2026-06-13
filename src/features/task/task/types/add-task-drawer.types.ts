import type { Schema } from 'yup';
import type { TaskFormData } from './task.types';

export interface AddTaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: TaskFormData;
  onSubmit: (values: TaskFormData) => Promise<void>;
  isLoading: boolean;
  error: string;
  isEditing: boolean;
  categoryOptions: string[];
  staffOptions: string[];
}
