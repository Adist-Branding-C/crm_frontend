import type { FormikHelpers } from 'formik';
import type { CheckoutNoteItem, CheckoutNoteFormData } from './checkoutNote.types';

export interface UseCheckoutNoteActionsParams {
  checkoutNote: {
    handleAddCheckoutNote: (values: CheckoutNoteFormData, helpers: FormikHelpers<CheckoutNoteFormData>) => Promise<boolean>;
    handleUpdateCheckoutNote: (id: number, values: CheckoutNoteFormData, helpers: FormikHelpers<CheckoutNoteFormData>) => Promise<boolean>;
    handleDeleteCheckoutNote: (id: number) => Promise<boolean>;
  };
  drawer: {
    editingItem: CheckoutNoteItem | null;
    closeDrawer: () => void;
  };
}
