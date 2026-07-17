import type { Dispatch, SetStateAction } from 'react';
import type { FormikHelpers } from 'formik';
import type { ToastType } from '../../../../shared/types/toast.types';
import type { MeetingOutcomeItem } from './interface';
import type { MeetingOutcomeFormData } from './request';

export interface UseMeetingOutcomeCrudParams {
  pagination: {
    setError: (message: string) => void;
    setIsLoading: (value: boolean) => void;
    setPageNumber: Dispatch<SetStateAction<number>>;
    setSearchQuery: Dispatch<SetStateAction<string>>;
    refresh: () => void;
  };
  showToastMessage: (message: string, type: ToastType) => void;
}

export interface UseMeetingOutcomeFormSubmitParams {
  editingItem: MeetingOutcomeItem | null;
  closeAddDrawer: () => void;
  closeEditDrawer: () => void;
  handleAddMeetingOutcome: (values: MeetingOutcomeFormData, helpers: FormikHelpers<MeetingOutcomeFormData>) => Promise<boolean>;
  handleUpdateMeetingOutcome: (id: number, values: MeetingOutcomeFormData, helpers: FormikHelpers<MeetingOutcomeFormData>) => Promise<boolean>;
}

export interface UseMeetingOutcomeRowActionsParams {
  openEditDrawer: (item: MeetingOutcomeItem) => void;
  onDeleteClick: (item: MeetingOutcomeItem) => void;
  closeDropdown: () => void;
}
