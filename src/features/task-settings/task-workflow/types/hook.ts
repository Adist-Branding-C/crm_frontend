import type { Dispatch, SetStateAction } from 'react';
import type { ToastType } from '../../../../shared/types/toast.types';
import type { TaskWorkflowItem } from './interface';

export interface UseTaskWorkflowListCrudParams {
  pagination: {
    setError: (message: string) => void;
    setIsLoading: (value: boolean) => void;
    setPageNumber: Dispatch<SetStateAction<number>>;
    setSearchQuery: Dispatch<SetStateAction<string>>;
    refresh: () => void;
  };
  showToastMessage: (message: string, type: ToastType) => void;
}

export interface UseTaskWorkflowRowActionsParams {
  onOpen: (item: TaskWorkflowItem) => void;
  onSetDefault: (item: TaskWorkflowItem) => void;
  onDelete: (item: TaskWorkflowItem) => void;
  closeDropdown: () => void;
}
