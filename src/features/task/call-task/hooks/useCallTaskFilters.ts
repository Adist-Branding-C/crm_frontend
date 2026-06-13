import type { CallTaskItem } from '../types/callTask.types';

export function useCallTaskFilters(callTaskList: CallTaskItem[]) {
  return {
    filteredData: callTaskList,
    totalRecords: callTaskList.length,
  };
}
