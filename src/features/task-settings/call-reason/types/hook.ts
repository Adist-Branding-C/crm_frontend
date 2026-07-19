import type { Dispatch, SetStateAction } from 'react';
import type { FormikHelpers } from 'formik';
import type { ToastType } from '../../../../shared/types/toast.types';
import type { CallReasonItem } from './interface';
import type { CallReasonFormData } from './request';

export interface UseCallReasonCrudParams {
  pagination: {
    setError: (message: string) => void;
    setIsLoading: (value: boolean) => void;
    setPageNumber: Dispatch<SetStateAction<number>>;
    setSearchQuery: Dispatch<SetStateAction<string>>;
    refresh: () => void;
  };
  showToastMessage: (message: string, type: ToastType) => void;
}

export interface UseCallReasonFormSubmitParams {
  editingItem: CallReasonItem | null;
  closeAddDrawer: () => void;
  closeEditDrawer: () => void;
  handleAddCallReason: (values: CallReasonFormData, helpers: FormikHelpers<CallReasonFormData>) => Promise<boolean>;
  handleUpdateCallReason: (id: number, values: CallReasonFormData, helpers: FormikHelpers<CallReasonFormData>) => Promise<boolean>;
}

export interface UseCallReasonRowActionsParams {
  openEditDrawer: (item: CallReasonItem) => void;
  onDeleteClick: (item: CallReasonItem) => void;
  closeDropdown: () => void;
}
