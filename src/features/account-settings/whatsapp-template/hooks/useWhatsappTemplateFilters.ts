import { useState, useMemo } from 'react';
import type { WhatsappTemplateItem } from '../types/whatsapp-template.types';

export function useWhatsappTemplateFilters(whatsappTemplateList: WhatsappTemplateItem[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = useMemo(
    () => whatsappTemplateList.filter(item =>
      (item.templateName || item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.message || item.content || '').toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [whatsappTemplateList, searchQuery]
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
