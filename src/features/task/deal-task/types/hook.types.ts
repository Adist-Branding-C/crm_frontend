import type { FormikHelpers } from 'formik';
import type { TaskCrudPagination } from '../../common/types/taskCrud.types';
import type { DealTaskItem } from './interface';
import type { DealTaskFormData } from './request';

export interface UseDealTaskCrudParams {
  pagination: TaskCrudPagination;
  showToastMessage: (msg: string, type: 'success' | 'error') => void;
}

export interface UseDealTaskDeleteConfirmParams {
  handleDeleteDealTask: (id: number) => Promise<boolean>;
}

export interface UseDealTaskDrawerLookups {
  loadStaff: () => void;
  loadDeals: () => void;
}

export interface UseDealTaskFormSubmitParams {
  editingItem: DealTaskItem | null;
  closeDrawer: () => void;
  handleAddDealTask: (values: DealTaskFormData, helpers: FormikHelpers<DealTaskFormData>) => Promise<boolean>;
  handleUpdateDealTask: (id: number, values: DealTaskFormData, helpers: FormikHelpers<DealTaskFormData>) => Promise<boolean>;
}
