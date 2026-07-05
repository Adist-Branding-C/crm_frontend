import type { DesignationItem } from '../types';

export function useDesignationFilters(designationList: DesignationItem[]) {
  return {
    filteredData: designationList,
  };
}
