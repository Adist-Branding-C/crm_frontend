import type { DealAdditionalField } from './interface';

export interface UseDealAdditionalFieldCrudParams {
  editingItem: DealAdditionalField | null;
  closeDrawer: () => void;
  setError: (message: string) => void;
  refresh: () => void;
  showToastMessage: (message: string, type: 'success' | 'error') => void;
}
