import { useState, useMemo } from 'react';
import type { CampaignTaskItem } from '../types/campaignTask.types';

export function useCampaignTaskFilters(campaignTaskList: CampaignTaskItem[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = useMemo(
    () => campaignTaskList.filter(item =>
      (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.campaignName || '').toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [campaignTaskList, searchQuery]
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
