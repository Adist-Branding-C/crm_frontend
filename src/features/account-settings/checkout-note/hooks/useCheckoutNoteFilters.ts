import { useState, useMemo } from 'react';
import type { CheckoutNoteItem } from '../types/checkoutNote.types';

export function useCheckoutNoteFilters(checkoutNoteList: CheckoutNoteItem[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = useMemo(
    () => checkoutNoteList.filter(item =>
      (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.note || '').toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [checkoutNoteList, searchQuery]
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
