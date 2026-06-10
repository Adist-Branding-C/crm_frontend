import { useState, useMemo } from 'react';
import type { TaskItem } from '../types/task.types';

export function useTaskFilters(taskList: TaskItem[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = useMemo(
    () => taskList.filter(item =>
      (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.deal || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category || '').toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [taskList, searchQuery]
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
