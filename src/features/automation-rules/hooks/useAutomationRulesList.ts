import { useCallback, useMemo, useState } from 'react';
import { useAutomationData } from '../context/AutomationDataContext';
import { useSearchFilter } from '../../../shared/hooks/useSearchFilter';
import { DEFAULT_ROWS_PER_PAGE } from '../../../shared/constants/pagination';
import type { TriggerType } from '../types';

export function useAutomationRulesList() {
  const { rules, isLoadingRules } = useAutomationData();
  const [triggerTypeFilter, setTriggerTypeFilter] = useState<TriggerType | ''>('');
  const [activeFilter, setActiveFilter] = useState<'' | 'active' | 'inactive'>('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  const visibleRules = useMemo(() => rules.filter((rule) => !rule.deletedAt), [rules]);

  const filteredByDropdowns = useMemo(() => visibleRules.filter((rule) => {
    if (triggerTypeFilter && rule.triggerType !== triggerTypeFilter) return false;
    if (activeFilter === 'active' && !rule.isActive) return false;
    if (activeFilter === 'inactive' && rule.isActive) return false;
    return true;
  }), [visibleRules, triggerTypeFilter, activeFilter]);

  const { query, setQuery, filteredData } = useSearchFilter(filteredByDropdowns, ['name']);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * rowsPerPage;
  const paginatedRules = useMemo(
    () => filteredData.slice(startIndex, startIndex + rowsPerPage),
    [filteredData, startIndex, rowsPerPage],
  );

  const handleRowsPerPageChange = useCallback((value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setTriggerTypeFilter('');
    setActiveFilter('');
  }, []);

  return {
    rules: paginatedRules,
    totalItems: filteredData.length,
    isEmpty: !isLoadingRules && visibleRules.length === 0,
    isLoading: isLoadingRules,
    searchQuery: query,
    setSearchQuery: setQuery,
    triggerTypeFilter,
    setTriggerTypeFilter,
    activeFilter,
    setActiveFilter,
    showFilters,
    setShowFilters,
    clearFilters,
    currentPage: safePage,
    setCurrentPage,
    rowsPerPage,
    handleRowsPerPageChange,
    totalPages,
  };
}
