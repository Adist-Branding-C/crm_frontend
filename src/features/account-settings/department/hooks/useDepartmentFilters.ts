import type { DepartmentItem } from '../types';

export function useDepartmentFilters(departmentList: DepartmentItem[]) {
  return {
    filteredData: departmentList,
  };
}
