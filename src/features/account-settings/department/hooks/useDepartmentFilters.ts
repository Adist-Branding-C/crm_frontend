import { useState, useMemo } from 'react';
import type { DepartmentItem } from '../types/department.types';

export function useDepartmentFilters(departmentList: DepartmentItem[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = useMemo(
    () => departmentList.filter(item =>
      (item.departmentName || item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [departmentList, searchQuery]
  );

  return {
    searchQuery,
    setSearchQuery,
    rowsPerPage,
    setRowsPerPage,
    filteredData,
    totalRecords: filteredData.length,
  };
}
