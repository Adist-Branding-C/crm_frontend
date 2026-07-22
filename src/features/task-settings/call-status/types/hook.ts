import type { Dispatch, SetStateAction } from 'react';
import type { FormikHelpers } from 'formik';
import type { ToastType } from '../../../../shared/types/toast.types';
import type { CallStatusItem } from './interface';
import type { CallStatusFormData } from './request';

export interface UseCallStatusCrudParams {
  pagination: {
    setError: (message: string) => void;
    setIsLoading: (value: boolean) => void;
    setPageNumber: Dispatch<SetStateAction<number>>;
    setSearchQuery: Dispatch<SetStateAction<string>>;
    refresh: () => void;
  };
  showToastMessage: (message: string, type: ToastType) => void;
}

export interface UseCallStatusFormSubmitParams {
  editingItem: CallStatusItem | null;
  closeAddDrawer: () => void;
  closeEditDrawer: () => void;
  handleAddCallStatus: (values: CallStatusFormData, helpers: FormikHelpers<CallStatusFormData>) => Promise<boolean>;
  handleUpdateCallStatus: (id: number, values: CallStatusFormData, helpers: FormikHelpers<CallStatusFormData>) => Promise<boolean>;
}

export interface UseCallStatusRowActionsParams {
  openEditDrawer: (item: CallStatusItem) => void;
  onDeleteClick: (item: CallStatusItem) => void;
  closeDropdown: () => void;
}
