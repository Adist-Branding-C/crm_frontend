import type { DesignationItem } from '../types/designation.types';

export function useDesignationFilters(designationList: DesignationItem[]) {
  return {
    filteredData: designationList,
  };
}
