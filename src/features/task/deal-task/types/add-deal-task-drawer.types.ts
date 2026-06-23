import type { Schema } from 'yup';
import type { DealTaskFormData, DealOption } from './dealTask.types';

export interface AddDealTaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: DealTaskFormData;
  onSubmit: (values: DealTaskFormData) => Promise<void>;
  isLoading: boolean;
  error: string;
  isEditing: boolean;
  deals: DealOption[];
  dealListLoading: boolean;
  staffOptions: string[];
}
