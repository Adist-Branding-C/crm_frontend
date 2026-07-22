import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { CheckoutNoteFormData } from './checkoutNote.types';

export interface AddCheckoutNoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: CheckoutNoteFormData;
  onSubmit: (values: CheckoutNoteFormData, helpers: FormikHelpers<CheckoutNoteFormData>) => void | Promise<void>;
  isLoading: boolean;
  error: string;
  isEditing: boolean;
}
