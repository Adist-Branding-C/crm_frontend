import type { Schema } from 'yup';
import type { CallTaskFormData } from './callTask.types';

export interface AddCallTaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: CallTaskFormData;
  onSubmit: (values: CallTaskFormData) => Promise<void>;
  isLoading: boolean;
  error: string;
  isEditing: boolean;
  staffOptions: string[];
}
