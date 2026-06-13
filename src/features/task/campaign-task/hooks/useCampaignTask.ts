import { useState, useCallback, useEffect, useRef } from 'react';
import { taskService } from '../../shared/services/taskService';
import { addCampaignTaskValidationSchema, editCampaignTaskValidationSchema } from '../validations/campaignTask.validation';
import { ADD_CAMPAIGN_TASK_INITIAL_VALUES } from '../constants/campaignTask.constants';
import type { CampaignTaskItem, CampaignTaskFormData } from '../types/campaignTask.types';

export function useCampaignTask() {
  const [campaignTaskList, setCampaignTaskList] = useState<CampaignTaskItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [staffOptions, setStaffOptions] = useState<string[]>([]);
  const [campaignOptions, setCampaignOptions] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const paginationRef = useRef({ page: 1, limit: 10 });
  useEffect(() => { paginationRef.current = { page, limit }; }, [page, limit]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search]);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const fetchCampaignTasks = useCallback(async (params: Record<string, string | number | undefined> = {}) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await taskService.getTasks({ ...params, category: 'campaign_task' });
      if (response.status) {
        const data = response.data && typeof response.data === 'object'
          ? (response.data as Record<string, unknown>)
          : {};
        const rawData = 'items' in data
          ? (data.items as CampaignTaskItem[])
          : Array.isArray(response.data)
            ? response.data
            : [];
        setCampaignTaskList(Array.isArray(rawData) ? rawData : []);
        const staff = data.staff;
        if (Array.isArray(staff)) setStaffOptions(staff as string[]);
        const campaigns = data.campaigns;
        if (Array.isArray(campaigns)) setCampaignOptions((campaigns as { name?: string }[]).map(c => c.name || ''));
        const apiTotalPages = data.totalPages ?? data.totalPages ?? 1;
        const apiTotalItems = data.totalItems ?? data.total ?? data.totalRecords ?? 0;
        if (typeof apiTotalPages === 'number') setTotalPages(apiTotalPages);
        if (typeof apiTotalItems === 'number') setTotalItems(apiTotalItems);
      } else {
        setError(response.message || 'Failed to fetch campaign tasks');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to fetch campaign tasks');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const params: Record<string, string | number | undefined> = { page, limit };
    if (debouncedSearch) params.search = debouncedSearch;
    fetchCampaignTasks(params);
  }, [fetchCampaignTasks, page, limit, debouncedSearch]);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleLimitChange = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  }, []);

  const handleAdd = useCallback(async (values: CampaignTaskFormData) => {
    setError('');
    setIsLoading(true);
    try {
      const payload = { ...values, category: 'campaign_task' };
      const response = await taskService.createTask(payload);
      if (response.status) {
        const data = response.data as { id?: number } | undefined;
        if (data?.id) {
          setCampaignTaskList(prev => [...prev, { id: data.id, ...values } as unknown as CampaignTaskItem]);
        } else {
          fetchCampaignTasks(paginationRef.current);
        }
        return true;
      } else {
        setError(response.message || 'Failed to add campaign task');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to add campaign task');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [fetchCampaignTasks, paginationRef]);

  const handleUpdate = useCallback(async (id: number, values: CampaignTaskFormData) => {
    setError('');
    setIsLoading(true);
    try {
      const payload = { ...values, category: 'campaign_task' };
      const response = await taskService.updateTask(id, payload);
      if (response.status) {
        setCampaignTaskList(prev => prev.map(item =>
          item.id === id ? { ...item, ...values } as unknown as CampaignTaskItem : item
        ));
        return true;
      } else {
        setError(response.message || 'Failed to update campaign task');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to update campaign task');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    setError('');
    try {
      const response = await taskService.deleteTask(id);
      if (response.status) {
        setCampaignTaskList(prev => prev.filter(item => item.id !== id));
        return true;
      } else {
        setError(response.message || 'Failed to delete campaign task');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to delete campaign task');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    campaignTaskList,
    isLoading,
    error,
    staffOptions,
    campaignOptions,
    page,
    limit,
    totalPages,
    totalItems,
    search,
    handleSearchChange,
    fetchCampaignTasks,
    handleAdd,
    handleUpdate,
    handleDelete,
    handlePageChange,
    handleLimitChange,
    validationSchema: addCampaignTaskValidationSchema,
    editValidationSchema: editCampaignTaskValidationSchema,
    initialValues: ADD_CAMPAIGN_TASK_INITIAL_VALUES,
  };
}
