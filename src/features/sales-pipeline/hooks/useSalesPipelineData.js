import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { salesAgents, PIPELINE_PAGINATION_LIMIT } from '../constants';
import { pipelineService } from '../services/PipelineService';
import { useAvatarColor } from './useAvatarColor';
import { usePipelineDragDrop } from './usePipelineDragDrop';
export function useSalesPipelineData() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showDateFilter, setShowDateFilter] = useState(false);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [selectedAgent, setSelectedAgent] = useState(1);
    const [selectedType, setSelectedType] = useState(1);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [activeView, setActiveView] = useState('deals');
    const [statusGroups, setStatusGroups] = useState([]);
    const [leadGroups, setLeadGroups] = useState([]);
    const [taskGroups, setTaskGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loadingStatusId, setLoadingStatusId] = useState(null);
    const [loadingLeadStatusId, setLoadingLeadStatusId] = useState(null);
    const [loadingTaskStatus, setLoadingTaskStatus] = useState(null);
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const debouncedSearchQueryRef = useRef(debouncedSearchQuery);
    debouncedSearchQueryRef.current = debouncedSearchQuery;
    const filterRef = useRef(null);
    const initialRenderRef = useRef(true);
    const activeViewRef = useRef(activeView);
    activeViewRef.current = activeView;
    const fetchDealsRef = useRef(null);
    const fetchLeadsRef = useRef(null);
    const fetchTasksRef = useRef(null);
    const { getAvatarColor } = useAvatarColor();
    const { handleDragStart, handleDragOver, handleDrop } = usePipelineDragDrop(setStatusGroups);
    // Auto-fetch deals on mount
    useEffect(() => {
        fetchDeals();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowDateFilter(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    // Debounce search query (500ms) before triggering API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);
    const fetchLeads = useCallback(async () => {
        setLoading(true);
        setError(null);
        setActiveView('leads');
        try {
            const params = {};
            if (debouncedSearchQueryRef.current)
                params.search = debouncedSearchQueryRef.current;
            const response = await pipelineService.getLeads(params);
            if (response.status) {
                setLeadGroups(response.data.items);
            }
        }
        catch (err) {
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err;
                setError(axiosErr.response?.data?.message || 'Failed to fetch leads');
            }
            else if (err && typeof err === 'object' && 'message' in err) {
                setError(err.message);
            }
            else {
                setError('Network error. Please try again.');
            }
        }
        finally {
            setLoading(false);
        }
    }, []);
    const fetchDeals = useCallback(async () => {
        setLoading(true);
        setError(null);
        setActiveView('deals');
        try {
            const params = {};
            if (dateFrom)
                params.fromDate = dateFrom;
            if (dateTo)
                params.toDate = dateTo;
            if (debouncedSearchQueryRef.current)
                params.search = debouncedSearchQueryRef.current;
            const response = await pipelineService.getDeals(params);
            if (response.status) {
                setStatusGroups(response.data.items);
            }
        }
        catch (err) {
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err;
                setError(axiosErr.response?.data?.message || 'Failed to fetch deals');
            }
            else if (err && typeof err === 'object' && 'message' in err) {
                setError(err.message);
            }
            else {
                setError('Network error. Please try again.');
            }
        }
        finally {
            setLoading(false);
        }
    }, [dateFrom, dateTo]);
    // Refetch deals when date filters change (skip initial mount)
    useEffect(() => {
        if (initialRenderRef.current) {
            initialRenderRef.current = false;
            return;
        }
        if (activeViewRef.current === 'deals') {
            fetchDeals();
        }
    }, [dateFrom, dateTo, fetchDeals]);
    const fetchTasks = useCallback(async () => {
        setLoading(true);
        setError(null);
        setActiveView('tasks');
        try {
            const params = {};
            if (debouncedSearchQueryRef.current)
                params.search = debouncedSearchQueryRef.current;
            const response = await pipelineService.getTasks(params);
            if (response.status) {
                setTaskGroups(response.data.items);
            }
        }
        catch (err) {
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err;
                setError(axiosErr.response?.data?.message || 'Failed to fetch tasks');
            }
            else if (err && typeof err === 'object' && 'message' in err) {
                setError(err.message);
            }
            else {
                setError('Network error. Please try again.');
            }
        }
        finally {
            setLoading(false);
        }
    }, []);
    // Sync fetch refs so search-change effect can call them without deps
    fetchDealsRef.current = fetchDeals;
    fetchLeadsRef.current = fetchLeads;
    fetchTasksRef.current = fetchTasks;
    // Refetch when debounced search query changes
    useEffect(() => {
        const view = activeViewRef.current;
        if (view === 'deals')
            fetchDealsRef.current();
        else if (view === 'leads')
            fetchLeadsRef.current();
        else if (view === 'tasks')
            fetchTasksRef.current();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchQuery]);
    const clearFilters = useCallback(() => {
        setDateFrom('');
        setDateTo('');
        setSelectedAgent(1);
        setSelectedType(1);
    }, []);
    // Filter deals within each status group by agent
    const filteredStatusGroups = useMemo(() => statusGroups.map(group => {
        let filteredDeals = group.deals;
        if (selectedAgent !== 1) {
            const agentName = salesAgents.find(a => a.id === selectedAgent)?.name;
            if (agentName) {
                filteredDeals = filteredDeals.filter(deal => deal.agent === agentName);
            }
        }
        return {
            ...group,
            deals: filteredDeals,
            count: filteredDeals.length,
        };
    }), [statusGroups, selectedAgent]);
    // Filter leads within each status group
    const filteredLeadGroups = useMemo(() => leadGroups.map(group => ({
        ...group,
        leads: group.leads,
        count: group.leads.length,
    })), [leadGroups]);
    // Filter tasks within each status group
    const filteredTaskGroups = useMemo(() => taskGroups.map(group => ({
        ...group,
        items: group.items,
        count: group.items.length,
    })), [taskGroups]);
    // Sum amounts for all deals in a given status group
    const getStageTotal = useCallback((statusId) => {
        const group = filteredStatusGroups.find(g => g.statusId === statusId);
        return group?.deals.reduce((sum, deal) => sum + deal.amount, 0) ?? 0;
    }, [filteredStatusGroups]);
    const handleSaveDeal = useCallback(() => {
        // Deal saved via drawer; integration with pipeline state can be added later
    }, []);
    const loadMoreDeals = useCallback(async (statusId) => {
        setLoadingStatusId(statusId);
        try {
            const statusGroup = statusGroups.find(g => g.statusId === statusId);
            if (!statusGroup)
                return;
            const skip = statusGroup.deals.length;
            const response = await pipelineService.getStatusDeals(statusId, skip, PIPELINE_PAGINATION_LIMIT);
            if (response.status && response.data) {
                setStatusGroups(prevGroups => prevGroups.map(group => {
                    if (group.statusId !== statusId)
                        return group;
                    const existingIds = new Set(group.deals.map(d => d.id));
                    const newDeals = response.data.items.filter(d => !existingIds.has(d.id));
                    return {
                        ...group,
                        deals: [...group.deals, ...newDeals],
                        count: response.data.count,
                    };
                }));
            }
        }
        catch (err) {
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err;
                setError(axiosErr.response?.data?.message || 'Failed to load more deals');
            }
            else if (err && typeof err === 'object' && 'message' in err) {
                setError(err.message);
            }
            else {
                setError('Network error. Please try again.');
            }
        }
        finally {
            setLoadingStatusId(null);
        }
    }, [statusGroups]);
    const loadMoreLeads = useCallback(async (statusId) => {
        setLoadingLeadStatusId(statusId);
        try {
            const statusGroup = leadGroups.find(g => g.statusId === statusId);
            if (!statusGroup)
                return;
            const skip = statusGroup.leads.length;
            const response = await pipelineService.getStatusLeads(statusId, skip, PIPELINE_PAGINATION_LIMIT);
            if (response.status && response.data) {
                setLeadGroups(prevGroups => prevGroups.map(group => {
                    if (group.statusId !== statusId)
                        return group;
                    const existingIds = new Set(group.leads.map(d => d.id));
                    const newLeads = response.data.items.filter(d => !existingIds.has(d.id));
                    return {
                        ...group,
                        leads: [...group.leads, ...newLeads],
                        count: response.data.count,
                    };
                }));
            }
        }
        catch (err) {
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err;
                setError(axiosErr.response?.data?.message || 'Failed to load more leads');
            }
            else if (err && typeof err === 'object' && 'message' in err) {
                setError(err.message);
            }
            else {
                setError('Network error. Please try again.');
            }
        }
        finally {
            setLoadingLeadStatusId(null);
        }
    }, [leadGroups]);
    const loadMoreTasks = useCallback(async (status) => {
        setLoadingTaskStatus(status);
        try {
            const taskGroup = taskGroups.find(g => g.status === status);
            if (!taskGroup)
                return;
            const skip = taskGroup.items.length;
            const response = await pipelineService.getStatusTasks(status, skip, PIPELINE_PAGINATION_LIMIT);
            if (response.status && response.data) {
                setTaskGroups(prevGroups => prevGroups.map(group => {
                    if (group.status !== status)
                        return group;
                    const existingIds = new Set(group.items.map(t => t.id));
                    const newTasks = response.data.items.filter(t => !existingIds.has(t.id));
                    return {
                        ...group,
                        items: [...group.items, ...newTasks],
                        count: response.data.count,
                    };
                }));
            }
        }
        catch (err) {
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err;
                setError(axiosErr.response?.data?.message || 'Failed to load more tasks');
            }
            else if (err && typeof err === 'object' && 'message' in err) {
                setError(err.message);
            }
            else {
                setError('Network error. Please try again.');
            }
        }
        finally {
            setLoadingTaskStatus(null);
        }
    }, [taskGroups]);
    return {
        searchQuery, setSearchQuery,
        showDateFilter, setShowDateFilter,
        dateFrom, setDateFrom,
        dateTo, setDateTo,
        selectedAgent, setSelectedAgent,
        selectedType, setSelectedType,
        isDrawerOpen, setIsDrawerOpen,
        activeView,
        statusGroups,
        leadGroups,
        taskGroups, loading, error,
        loadingStatusId,
        loadingLeadStatusId,
        loadingTaskStatus,
        fetchLeads, fetchDeals, fetchTasks,
        loadMoreDeals,
        loadMoreLeads,
        loadMoreTasks,
        filterRef,
        clearFilters, filteredStatusGroups, filteredLeadGroups, filteredTaskGroups, getStageTotal,
        handleDragStart, handleDragOver, handleDrop,
        handleSaveDeal, getAvatarColor,
    };
}
//# sourceMappingURL=useSalesPipelineData.js.map