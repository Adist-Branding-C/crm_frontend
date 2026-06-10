import type { CallTaskItem, CallTaskFormData } from './callTask.types';

export interface UseCallTaskActionsParams {
  callTask: {
    handleAdd: (values: CallTaskFormData) => Promise<boolean>;
    handleUpdate: (id: number, values: CallTaskFormData) => Promise<boolean>;
    handleDelete: (id: number) => Promise<boolean>;
  };
  drawer: {
    editingItem: CallTaskItem | null;
    closeAddDrawer: () => void;
    closeEditDrawer: () => void;
    closeDeleteDialog: () => void;
  };
}
