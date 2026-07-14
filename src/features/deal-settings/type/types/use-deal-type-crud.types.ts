import type { DealTypeItem } from './interface';
import type { DealTypeFormData } from './request';

export interface UseDealTypeCrudParams {
  editingItem: DealTypeItem | null;
  formData: DealTypeFormData;
  closeDrawer: () => void;
  setError: (message: string) => void;
  refresh: () => void;
}
