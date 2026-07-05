import type { BranchItem } from '../types';

export function useBranchFilters(branchList: BranchItem[]) {
  return {
    filteredData: branchList,
  };
}
