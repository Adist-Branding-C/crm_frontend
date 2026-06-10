import { useState, useMemo } from 'react';
import type { CallTaskItem } from '../types/callTask.types';

export function useCallTaskFilters(callTaskList: CallTaskItem[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = useMemo(
    () => callTaskList.filter(item =>
      (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.contactName || '').toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [callTaskList, searchQuery]
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
