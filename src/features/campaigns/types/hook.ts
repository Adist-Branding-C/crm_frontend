import type { Dispatch, SetStateAction } from 'react';
import type { FormikHelpers } from 'formik';
import type { ToastType } from '../../../shared/types/toast.types';
import type { Campaign } from './interface';
import type { CampaignFormData } from './request';

export interface UseCampaignCrudParams {
  pagination: {
    setError: (message: string) => void;
    setIsLoading: (value: boolean) => void;
    setPageNumber: Dispatch<SetStateAction<number>>;
    setSearchQuery: Dispatch<SetStateAction<string>>;
    refresh: () => void;
  };
  showToastMessage: (message: string, type: ToastType) => void;
}

export interface UseCampaignFormSubmitParams {
  editingItem: Campaign | null;
  closeAddDrawer: () => void;
  closeEditDrawer: () => void;
  handleAddCampaign: (values: CampaignFormData, helpers: FormikHelpers<CampaignFormData>) => Promise<boolean>;
  handleUpdateCampaign: (id: number, values: CampaignFormData, helpers: FormikHelpers<CampaignFormData>) => Promise<boolean>;
}

export interface UseCampaignRowActionsParams {
  openEditDrawer: (item: Campaign) => void;
  onDeleteClick: (item: Campaign) => void;
  closeDropdown: () => void;
}
