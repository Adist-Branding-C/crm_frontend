import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useToast } from '../../../shared/hooks/useToast';
import { useDebouncedSearch } from '../../../shared/hooks/useDebouncedSearch';
import { useSalesPipelineFilters } from './useSalesPipelineFilters';
import { useSalesPipelineStaffOptions } from './useSalesPipelineStaffOptions';
import { useDealsPipeline } from './useDealsPipeline';
import { useLeadsPipeline } from './useLeadsPipeline';
import { useTasksPipeline } from './useTasksPipeline';
import { usePipelineDragDrop } from './usePipelineDragDrop';
import { PipelineMapper } from '../mappers/pipeline.mapper';
import type { ActiveView } from '../types';


export function useSalesPipelineData() {
  const [activeView, setActiveView] = useState<ActiveView>('deals');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [committedSearch, setCommittedSearch] = useState('');
  const activeViewRef = useRef(activeView);
  activeViewRef.current = activeView;

  const toast = useToast();
  const reportError = useCallback(
    (message: string) => toast.showToastMessage(message, 'error'),
    [toast.showToastMessage],
  );

  const search = useDebouncedSearch(setCommittedSearch);
  const filters = useSalesPipelineFilters();
  const { staffOptions } = useSalesPipelineStaffOptions();
  const deals = useDealsPipeline(reportError);
  const leads = useLeadsPipeline(reportError);
  const tasks = useTasksPipeline(reportError);
  const dragDrop = usePipelineDragDrop(
    deals.setStatusGroups,
    leads.setLeadGroups,
    tasks.setTaskGroups,
    reportError,
  );

  const filterParams = useMemo(
    () =>
      PipelineMapper.toQueryParams(
        committedSearch,
        filters.dateFrom,
        filters.dateTo,
        filters.selectedAgent,
      ),
    [committedSearch, filters.dateFrom, filters.dateTo, filters.selectedAgent],
  );

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      deals.fetchDeals(filterParams);
      return;
    }
    const view = activeViewRef.current;
    if (view === 'deals') deals.fetchDeals(filterParams);
    else if (view === 'leads') leads.fetchLeads(filterParams);
    else if (view === 'tasks') tasks.fetchTasks(filterParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams]);

  const handleViewDeals = useCallback(() => {
    setActiveView('deals');
    deals.fetchDeals(filterParams);
  }, [deals.fetchDeals, filterParams]);

  const handleViewLeads = useCallback(() => {
    setActiveView('leads');
    leads.fetchLeads(filterParams);
  }, [leads.fetchLeads, filterParams]);

  const handleViewTasks = useCallback(() => {
    setActiveView('tasks');
    tasks.fetchTasks(filterParams);
  }, [tasks.fetchTasks, filterParams]);

  const handleSaveDeal = useCallback(() => {
    setIsDrawerOpen(false);
    deals.fetchDeals(filterParams);
  }, [deals.fetchDeals, filterParams]);

  const handleClearFilters = useCallback(() => {
    filters.clearFilters();
    filters.setShowDateFilter(false);
  }, [filters]);

  const loading =
    activeView === 'deals'
      ? deals.isLoading
      : activeView === 'leads'
        ? leads.isLoading
        : tasks.isLoading;

  return {
    searchQuery: search.searchValue,
    setSearchQuery: search.handleSearchChange,
    showDateFilter: filters.showDateFilter,
    setShowDateFilter: filters.setShowDateFilter,
    dateFrom: filters.dateFrom,
    setDateFrom: filters.setDateFrom,
    dateTo: filters.dateTo,
    setDateTo: filters.setDateTo,
    selectedAgent: filters.selectedAgent,
    setSelectedAgent: filters.setSelectedAgent,
    staffOptions,
    isDrawerOpen,
    setIsDrawerOpen,
    activeView,
    loading,
    loadingStatusId: deals.loadingStatusId,
    loadingLeadStatusId: leads.loadingLeadStatusId,
    loadingTaskStatus: tasks.loadingTaskStatus,
    onViewLeads: handleViewLeads,
    onViewDeals: handleViewDeals,
    onViewTasks: handleViewTasks,
    loadMoreDeals: deals.loadMoreDeals,
    loadMoreLeads: leads.loadMoreLeads,
    loadMoreTasks: tasks.loadMoreTasks,
    filterRef: filters.filterRef,
    onClearFilters: handleClearFilters,
    filteredStatusGroups: deals.statusGroups,
    filteredLeadGroups: leads.leadGroups,
    filteredTaskGroups: tasks.taskGroups,
    sensors: dragDrop.sensors,
    activeItem: dragDrop.activeItem,
    handleDragStart: dragDrop.handleDragStart,
    handleDragEnd: dragDrop.handleDragEnd,
    handleDragCancel: dragDrop.handleDragCancel,
    handleSaveDeal,
    toast,
  };
}
