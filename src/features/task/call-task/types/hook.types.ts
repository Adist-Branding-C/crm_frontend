import type { FormikHelpers } from 'formik';
import type { TaskCrudPagination } from '../../common/types/taskCrud.types';
import type { CallTaskItem } from './interface';
import type { CallTaskFormData } from './request';

export interface UseCallTaskCrudParams {
  pagination: TaskCrudPagination;
  showToastMessage: (msg: string, type: 'success' | 'error') => void;
}

export interface UseCallTaskDeleteConfirmParams {
  handleDeleteCallTask: (id: number) => Promise<boolean>;
}

export interface UseCallTaskDrawerLookups {
  loadStaff: () => void;
  loadLeads: () => void;
}

export interface UseCallTaskFormSubmitParams {
  editingItem: CallTaskItem | null;
  closeDrawer: () => void;
  handleAddCallTask: (values: CallTaskFormData, helpers: FormikHelpers<CallTaskFormData>) => Promise<boolean>;
  handleUpdateCallTask: (id: number, values: CallTaskFormData, helpers: FormikHelpers<CallTaskFormData>) => Promise<boolean>;
}
