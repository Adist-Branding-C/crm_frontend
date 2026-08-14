import { useCallback, useState, useEffect } from 'react';
import { useTableData } from '../../../shared/hooks/useTableData';
import { automationRulesApi } from '../services/automationRulesApi';
import { mapApiRuleToUI } from '../mappers/automationRuleMapper';
import type { TriggerType } from '../types';

export function useAutomationRulesList() {
  const [triggerTypeFilter, setTriggerTypeFilter] = useState<TriggerType | ''>('');
  const [activeFilter, setActiveFilter] = useState<'' | 'active' | 'inactive'>('');
  const [showFilters, setShowFilters] = useState(false);

  const {
    list,
    totalCount,
    isLoading,
    searchQuery,
    handleSearchChange,
    pageNumber,
    setPageNumber,
    limit,
    handleRowsPerPageChange,
    totalPages,
    refresh,
  } = useTableData({
    fetchFn: async (params) => {
      const response = await automationRulesApi.getRules({
        pageNumber: params.pageNumber,
        limit: params.limit,
        search: params.search,
        triggerType: triggerTypeFilter,
        isActive: activeFilter === 'active' ? true : activeFilter === 'inactive' ? false : '',
      });
      
      const items = response.data?.items ?? [];
      const mappedItems = items.map(mapApiRuleToUI);
      return {
        items: mappedItems,
        total: response.data?.pagination?.total ?? 0,
      };
    },
  });

  const clearFilters = useCallback(() => {
    setTriggerTypeFilter('');
    setActiveFilter('');
  }, []);

  // Trigger re-fetch when custom filters change
  useEffect(() => {
    setPageNumber(1);
    refresh(1);
  }, [triggerTypeFilter, activeFilter, refresh, setPageNumber]);

  return {
    rules: list,
    totalItems: totalCount,
    isEmpty: !isLoading && totalCount === 0 && !searchQuery && !triggerTypeFilter && !activeFilter,
    isLoading,
    searchQuery,
    setSearchQuery: handleSearchChange,
    triggerTypeFilter,
    setTriggerTypeFilter,
    activeFilter,
    setActiveFilter,
    showFilters,
    setShowFilters,
    clearFilters,
    currentPage: pageNumber,
    setCurrentPage: setPageNumber,
    rowsPerPage: limit,
    handleRowsPerPageChange,
    totalPages,
    refresh,
  };
}
