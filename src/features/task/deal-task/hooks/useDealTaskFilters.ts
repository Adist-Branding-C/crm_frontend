import type { DealTaskItem } from '../types/dealTask.types';

export function useDealTaskFilters(dealTaskList: DealTaskItem[]) {
  return {
    filteredData: dealTaskList,
    totalRecords: dealTaskList.length,
  };
}
