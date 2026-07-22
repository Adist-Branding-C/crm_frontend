import type { Dispatch, SetStateAction } from 'react';
import type { ToastType } from '../../../../shared/types/toast.types';

export interface UseBranchCrudParams {
  pagination: {
    setError: (message: string) => void;
    setIsLoading: (value: boolean) => void;
    setPageNumber: Dispatch<SetStateAction<number>>;
    setSearchQuery: Dispatch<SetStateAction<string>>;
    refresh: () => void;
  };
  showToastMessage: (message: string, type: ToastType) => void;
}
