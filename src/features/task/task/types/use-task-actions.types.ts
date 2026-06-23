import type { TaskItem, TaskFormData } from './task.types';

export interface UseTaskActionsParams {
  task: {
    handleAdd: (values: TaskFormData) => Promise<boolean>;
    handleUpdate: (id: number, values: TaskFormData) => Promise<boolean>;
    handleDelete: (id: number) => Promise<boolean>;
  };
  drawer: {
    editingItem: TaskItem | null;
    closeAddDrawer: () => void;
    closeEditDrawer: () => void;
    closeDeleteDialog: () => void;
  };
}
