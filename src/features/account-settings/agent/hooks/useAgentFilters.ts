import { useState, useMemo } from 'react';
import type { AgentItem } from '../types/agent.types';

export function useAgentFilters(agentList: AgentItem[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = useMemo(
    () => agentList.filter(item =>
      (item.fullName || item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.phone || item.phone_number || item.phoneNumber || item.mobile || '').includes(searchQuery)
    ),
    [agentList, searchQuery]
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
