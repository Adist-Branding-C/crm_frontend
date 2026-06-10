import { useState, useMemo } from 'react';
import type { DealTaskItem } from '../types/dealTask.types';

export function useDealTaskFilters(dealTaskList: DealTaskItem[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = useMemo(
    () => dealTaskList.filter(item =>
      (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.dealName || '').toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [dealTaskList, searchQuery]
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
