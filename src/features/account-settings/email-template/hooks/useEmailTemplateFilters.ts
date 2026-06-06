import { useState, useMemo } from 'react';
import type { EmailTemplateItem } from '../types/emailTemplate.types';

export function useEmailTemplateFilters(emailTemplateList: EmailTemplateItem[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = useMemo(
    () => emailTemplateList.filter(item =>
      (item.templateName || item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.subject || '').toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [emailTemplateList, searchQuery]
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
