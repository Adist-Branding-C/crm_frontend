import type { WorkModeItem } from '../types';

export function useWorkModeFilters(workModeList: WorkModeItem[]) {
  return {
    filteredData: workModeList,
  };
}
