import type { WorkModeItem } from '../types/workMode.types';

export function useWorkModeFilters(workModeList: WorkModeItem[]) {
  return {
    filteredData: workModeList,
  };
}
