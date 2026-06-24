import type { DepartmentItem } from '../types/department.types';

export function useDepartmentFilters(departmentList: DepartmentItem[]) {
  return {
    filteredData: departmentList,
  };
}
