import { useState, useRef, useEffect, useCallback } from 'react';
import { PIPELINE_PAGINATION_LIMIT } from '../constants';
import { pipelineService } from '../services/PipelineService';
import { staffService } from '../../deal/services/staff.service';
import { useAvatarColor } from './useAvatarColor';
import { usePipelineDragDrop } from './usePipelineDragDrop';
import { useToast } from '../../../shared/hooks/useToast';
import type { PipelineStatusGroup, LeadStatusGroup, TaskStatusGroup, ActiveView, Agent } from '../types/pipeline.types';

function extractErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === 'object' && 'response' in err) {
    const axiosErr = err as { response?: { data?: { message?: string } } };
    return axiosErr.response?.data?.message || fallback;
  }
  if (err && typeof err === 'object' && 'message' in err) {
    return (err as { message: string }).message;
  }
  return 'Network error. Please try again.';
}

export function useSalesPipelineData() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [staffOptions, setStaffOptions] = useState<Agent[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeView, setActiveView] = useState<ActiveView>('deals');
  const [statusGroups, setStatusGroups] = useState<PipelineStatusGroup[]>([]);
  const [leadGroups, setLeadGroups] = useState<LeadStatusGroup[]>([]);
  const [taskGroups, setTaskGroups] = useState<TaskStatusGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingStatusId, setLoadingStatusId] = useState<number | null>(null);
  const [loadingLeadStatusId, setLoadingLeadStatusId] = useState<string | null>(null);
  const [loadingTaskStatus, setLoadingTaskStatus] = useState<string | null>(null);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const debouncedSearchQueryRef = useRef(debouncedSearchQuery);
  debouncedSearchQueryRef.current = debouncedSearchQuery;
  const filterRef = useRef<HTMLDivElement | null>(null);
  const initialRenderRef = useRef(true);
  const activeViewRef = useRef(activeView);
  activeViewRef.current = activeView;
  const fetchDealsRef = useRef<() => void>(null!);
  const fetchLeadsRef = useRef<() => void>(null!);
  const fetchTasksRef = useRef<() => void>(null!);

  const { getAvatarColor } = useAvatarColor();
  const toast = useToast();
  const reportError = useCallback((message: string) => {
    toast.showToastMessage(message, 'error');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    sensors,
    activeItem,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  } = usePipelineDragDrop(setStatusGroups, setLeadGroups, setTaskGroups, reportError);

  useEffect(() => {
    fetchDeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowDateFilter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filterParams = useMemo(() => {
    const params: Record<string, string> = {};
    if (debouncedSearchQueryRef.current) params.search = debouncedSearchQueryRef.current;
    if (dateFrom) params.fromDate = dateFrom;
    if (dateTo) params.toDate = dateTo;
    if (selectedAgent) params.agent = selectedAgent;
    return params;
  }, [debouncedSearchQuery, dateFrom, dateTo, selectedAgent]);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setActiveView('leads');
    try {
      const response = await pipelineService.getLeads(filterParams);
      if (response.status) {
        setLeadGroups(response.data.items);
      }
    } catch (err: unknown) {
      reportError(extractErrorMessage(err, 'Failed to fetch leads'));
    } finally {
      setLoading(false);
    }
  }, [filterParams, reportError]);

  const fetchDeals = useCallback(async () => {
    setLoading(true);
    setActiveView('deals');
    try {
      const response = await pipelineService.getDeals(filterParams);
      if (response.status) {
        setStatusGroups(response.data.items);
      }
    } catch (err: unknown) {
      reportError(extractErrorMessage(err, 'Failed to fetch deals'));
    } finally {
      setLoading(false);
    }
  }, [filterParams, reportError]);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setActiveView('tasks');
    try {
      const response = await pipelineService.getTasks(filterParams);
      if (response.status) {
        setTaskGroups(response.data.items);
      }
    } catch (err: unknown) {
      reportError(extractErrorMessage(err, 'Failed to fetch tasks'));
    } finally {
      setLoading(false);
    }
  }, [filterParams, reportError]);

  fetchDealsRef.current = fetchDeals;
  fetchLeadsRef.current = fetchLeads;
  fetchTasksRef.current = fetchTasks;

  const isInitialMountDateAgent = useRef(true);
  useEffect(() => {
    if (isInitialMountDateAgent.current) {
      isInitialMountDateAgent.current = false;
      return;
    }
    const view = activeViewRef.current;
    if (view === 'deals') fetchDealsRef.current();
    else if (view === 'leads') fetchLeadsRef.current();
    else if (view === 'tasks') fetchTasksRef.current();
  }, [dateFrom, dateTo, selectedAgent]);

  const isInitialMountSearch = useRef(true);
  useEffect(() => {
    if (isInitialMountSearch.current) {
      isInitialMountSearch.current = false;
      return;
    }
    const view = activeViewRef.current;
    if (view === 'deals') fetchDealsRef.current();
    else if (view === 'leads') fetchLeadsRef.current();
    else if (view === 'tasks') fetchTasksRef.current();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery]);

  const clearFilters = useCallback(() => {
    setDateFrom('');
    setDateTo('');
    setSelectedAgent('');
  }, []);

  const getStageTotal = useCallback((statusId: number) => {
    const group = statusGroups.find(g => g.statusId === statusId);
    return group?.deals.reduce((sum, deal) => sum + deal.amount, 0) ?? 0;
  }, [statusGroups]);

  const handleSaveDeal = useCallback(() => {
    setIsDrawerOpen(false);
    fetchDeals();
  }, [fetchDeals]);

  const loadMoreDeals = useCallback(async (statusId: number) => {
    setLoadingStatusId(statusId);
    try {
      const statusGroup = statusGroups.find(g => g.statusId === statusId);
      if (!statusGroup) return;

      const skip = statusGroup.deals.length;
      const response = await pipelineService.getStatusDeals(statusId, skip, PIPELINE_PAGINATION_LIMIT);

      if (response.status && response.data) {
        setStatusGroups(prevGroups =>
          prevGroups.map(group => {
            if (group.statusId !== statusId) return group;

            const existingIds = new Set(group.deals.map(d => d.id));
            const newDeals = response.data.items.filter(d => !existingIds.has(d.id));

            return {
              ...group,
              deals: [...group.deals, ...newDeals],
              count: response.data.count,
            };
          })
        );
      }
    } catch (err: unknown) {
      reportError(extractErrorMessage(err, 'Failed to load more deals'));
    } finally {
      setLoadingStatusId(null);
    }
  }, [statusGroups, reportError]);

  const loadMoreLeads = useCallback(async (statusId: string) => {
    setLoadingLeadStatusId(statusId);
    try {
      const statusGroup = leadGroups.find(g => g.statusId === statusId);
      if (!statusGroup) return;

      const skip = statusGroup.leads.length;
      const response = await pipelineService.getStatusLeads(statusId, skip, PIPELINE_PAGINATION_LIMIT);

      if (response.status && response.data) {
        setLeadGroups(prevGroups =>
          prevGroups.map(group => {
            if (group.statusId !== statusId) return group;

            const existingIds = new Set(group.leads.map(d => d.id));
            const newLeads = response.data.items.filter(d => !existingIds.has(d.id));

            return {
              ...group,
              leads: [...group.leads, ...newLeads],
              count: response.data.count,
            };
          })
        );
      }
    } catch (err: unknown) {
      reportError(extractErrorMessage(err, 'Failed to load more leads'));
    } finally {
      setLoadingLeadStatusId(null);
    }
  }, [leadGroups, reportError]);

  const loadMoreTasks = useCallback(async (status: string) => {
    setLoadingTaskStatus(status);
    try {
      const taskGroup = taskGroups.find(g => g.status === status);
      if (!taskGroup) return;

      const skip = taskGroup.items.length;
      const response = await pipelineService.getStatusTasks(status, skip, PIPELINE_PAGINATION_LIMIT);

      if (response.status && response.data) {
        setTaskGroups(prevGroups =>
          prevGroups.map(group => {
            if (group.status !== status) return group;

            const existingIds = new Set(group.items.map(t => t.id));
            const newTasks = response.data.items.filter(t => !existingIds.has(t.id));

            return {
              ...group,
              items: [...group.items, ...newTasks],
              count: response.data.count,
            };
          })
        );
      }
    } catch (err: unknown) {
      reportError(extractErrorMessage(err, 'Failed to load more tasks'));
    } finally {
      setLoadingTaskStatus(null);
    }
  }, [taskGroups, reportError]);

  return {
    searchQuery, setSearchQuery,
    showDateFilter, setShowDateFilter,
    dateFrom, setDateFrom,
    dateTo, setDateTo,
    selectedAgent, setSelectedAgent,
    staffOptions,
    isDrawerOpen, setIsDrawerOpen,
    activeView,
    statusGroups,
    leadGroups,
    taskGroups, loading,
    loadingStatusId,
    loadingLeadStatusId,
    loadingTaskStatus,
    fetchLeads, fetchDeals, fetchTasks,
    loadMoreDeals,
    loadMoreLeads,
    loadMoreTasks,
    filterRef,
    clearFilters,
    filteredStatusGroups: statusGroups,
    filteredLeadGroups: leadGroups,
    filteredTaskGroups: taskGroups,
    getStageTotal,
    sensors,
    activeItem,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
    handleSaveDeal, getAvatarColor,
    toast,
  };
}
