import type { TaskItem } from '../types/task.types';

export function useTaskFilters(taskList: TaskItem[]) {
  return {
    filteredData: taskList,
    totalRecords: taskList.length,
  };
}
