import { useState, useMemo } from 'react';
import type { BranchItem } from '../types/branch.types';

export function useBranchFilters(branchList: BranchItem[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = useMemo(
    () => branchList.filter(item =>
      (item.name || item.branchName || '').toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [branchList, searchQuery]
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
