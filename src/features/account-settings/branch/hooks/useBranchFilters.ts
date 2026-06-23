import type { BranchItem } from '../types/branch.types';

export function useBranchFilters(branchList: BranchItem[]) {
  return {
    filteredData: branchList,
  };
}
