import type { Dispatch, SetStateAction } from 'react';
import type { FormikHelpers } from 'formik';
import type { ToastType } from '../../../../shared/types/toast.types';
import type { TaskCategoryItem } from './interface';
import type { TaskCategoryFormData } from './request';

export interface UseTaskCategoryCrudParams {
  pagination: {
    setError: (message: string) => void;
    setIsLoading: (value: boolean) => void;
    setPageNumber: Dispatch<SetStateAction<number>>;
    setSearchQuery: Dispatch<SetStateAction<string>>;
    refresh: () => void;
  };
  showToastMessage: (message: string, type: ToastType) => void;
}

export interface UseTaskCategoryFormSubmitParams {
  editingItem: TaskCategoryItem | null;
  closeAddDrawer: () => void;
  closeEditDrawer: () => void;
  handleAddTaskCategory: (values: TaskCategoryFormData, helpers: FormikHelpers<TaskCategoryFormData>) => Promise<boolean>;
  handleUpdateTaskCategory: (id: number, values: TaskCategoryFormData, helpers: FormikHelpers<TaskCategoryFormData>) => Promise<boolean>;
}

export interface UseTaskCategoryRowActionsParams {
  openEditDrawer: (item: TaskCategoryItem) => void;
  onDeleteClick: (item: TaskCategoryItem) => void;
  closeDropdown: () => void;
}
