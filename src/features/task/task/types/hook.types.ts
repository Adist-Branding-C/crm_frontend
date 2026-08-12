import type { FormikHelpers } from 'formik';
import type { TaskCrudPagination } from '../../common/types/taskCrud.types';
import type { TaskItem } from './interface';
import type { TaskFormData } from './request';

export interface UseTaskCrudParams {
  pagination: TaskCrudPagination;
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
