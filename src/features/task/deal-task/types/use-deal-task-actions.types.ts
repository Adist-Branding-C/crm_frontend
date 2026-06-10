import type { DealTaskItem, DealTaskFormData } from './dealTask.types';

export interface UseDealTaskActionsParams {
  dealTask: {
    handleAdd: (values: DealTaskFormData) => Promise<boolean>;
    handleUpdate: (id: number, values: DealTaskFormData) => Promise<boolean>;
    handleDelete: (id: number) => Promise<boolean>;
  };
  drawer: {
    editingItem: DealTaskItem | null;
    closeAddDrawer: () => void;
    closeEditDrawer: () => void;
    closeDeleteDialog: () => void;
  };
}
