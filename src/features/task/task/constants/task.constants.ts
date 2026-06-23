import type { TaskFormData } from '../types/task.types';

export const ADD_TASK_INITIAL_VALUES: TaskFormData = {
  title: '',
  description: '',
  category: '',
  scheduledDate: '',
  scheduledTime: '',
  assignedTo: '',
  priority: '',
  status: '',
};
