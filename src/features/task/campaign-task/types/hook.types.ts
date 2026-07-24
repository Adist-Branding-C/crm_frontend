import type { FormikHelpers } from 'formik';
import type { TaskCrudPagination } from '../../common/types/taskCrud.types';
import type { CampaignTaskItem } from './interface';
import type { CampaignTaskFormData } from './request';

export interface UseCampaignTaskCrudParams {
  pagination: TaskCrudPagination;
  showToastMessage: (msg: string, type: 'success' | 'error') => void;
}

export interface UseCampaignTaskDeleteConfirmParams {
  handleDeleteCampaignTask: (id: number) => Promise<boolean>;
}

export interface UseCampaignTaskDrawerLookups {
  loadStaff: () => void;
  loadLeads: () => void;
}

export interface UseCampaignTaskFormSubmitParams {
  editingItem: CampaignTaskItem | null;
  closeDrawer: () => void;
  handleAddCampaignTask: (values: CampaignTaskFormData, helpers: FormikHelpers<CampaignTaskFormData>) => Promise<boolean>;
  handleUpdateCampaignTask: (id: number, values: CampaignTaskFormData, helpers: FormikHelpers<CampaignTaskFormData>) => Promise<boolean>;
}
