import type { DealStatusItem } from './interface';
import type { DealStatusFormData } from './request';

export interface UseDealStatusCrudParams {
  editingItem: DealStatusItem | null;
  formData: DealStatusFormData;
  closeDrawer: () => void;
  setError: (message: string) => void;
  refresh: () => void;
}
