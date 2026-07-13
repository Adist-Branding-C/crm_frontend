import type { FormikHelpers } from 'formik';
import type { TaskItem } from './interface';
import type { TaskFormData } from './request';

export interface TaskPagination {
  setError: (msg: string) => void;
  setIsLoading: (loading: boolean) => void;
  refresh: () => void;
}

export interface UseTaskCrudParams {
  pagination: TaskPagination;
  showToastMessage: (msg: string, type: 'success' | 'error') => void;
}

export interface UseTaskDeleteConfirmParams {
  handleDeleteTask: (id: number) => Promise<boolean>;
}

export interface UseTaskDrawerLookups {
  loadStaff: () => void;
  loadCategories: () => void;
  loadLeads: () => void;
}

export interface UseTaskFormSubmitParams {
  editingItem: TaskItem | null;
  closeDrawer: () => void;
  handleAddTask: (values: TaskFormData, helpers: FormikHelpers<TaskFormData>) => Promise<boolean>;
  handleUpdateTask: (id: number, values: TaskFormData, helpers: FormikHelpers<TaskFormData>) => Promise<boolean>;
}
