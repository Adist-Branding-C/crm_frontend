import { useState, useCallback, useEffect, useRef } from 'react';
import { taskService } from '../../shared/services/taskService';
import { dealService } from '../services/deal.service';
import { addDealTaskValidationSchema, editDealTaskValidationSchema } from '../validations/dealTask.validation';
import { ADD_DEAL_TASK_INITIAL_VALUES } from '../constants/dealTask.constants';
import type { DealTaskItem, DealTaskFormData, DealOption } from '../types/dealTask.types';

export function useDealTask() {
  const [dealTaskList, setDealTaskList] = useState<DealTaskItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [deals, setDeals] = useState<DealOption[]>([]);
  const [dealListLoading, setDealListLoading] = useState(false);
  const [staffOptions, setStaffOptions] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const paginationRef = useRef({ pageNumber: 1, limit: 10 });
  useEffect(() => { paginationRef.current = { pageNumber: page, limit }; }, [page, limit]);

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

  const fetchDealTasks = useCallback(async (params: Record<string, string | number | undefined> = {}) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await taskService.getTasks({ ...params, category: 'deal_task' });
      if (response.status) {
        const data = response.data && typeof response.data === 'object'
          ? (response.data as Record<string, unknown>)
          : {};
        const rawData = 'items' in data
          ? (data.items as DealTaskItem[])
          : Array.isArray(response.data)
            ? response.data
            : [];
        setDealTaskList(Array.isArray(rawData) ? rawData : []);
        const staff = data.staff;
        if (Array.isArray(staff)) setStaffOptions(staff as string[]);
        const apiTotalPages = data.totalPages ?? data.totalPages ?? 1;
        const apiTotalItems = data.totalItems ?? data.total ?? data.totalRecords ?? 0;
        if (typeof apiTotalPages === 'number') setTotalPages(apiTotalPages);
        if (typeof apiTotalItems === 'number') setTotalItems(apiTotalItems);
      } else {
        setError(response.message || 'Failed to fetch deal tasks');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to fetch deal tasks');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchDeals = useCallback(async () => {
    setDealListLoading(true);
    const dealList = await dealService.getAll();
    setDeals(dealList);
    setDealListLoading(false);
  }, []);

  useEffect(() => {
    const params: Record<string, string | number | undefined> = { pageNumber: page, limit };
    if (debouncedSearch) params.search = debouncedSearch;
    fetchDealTasks(params);
    fetchDeals();
  }, [fetchDealTasks, fetchDeals, page, limit, debouncedSearch]);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleLimitChange = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  }, []);

  const handleAdd = useCallback(async (values: DealTaskFormData) => {
    setError('');
    setIsLoading(true);
    try {
      const payload = { ...values, category: 'deal_task' };
      const response = await taskService.createTask(payload);
      if (response.status) {
        const data = response.data as { id?: number } | undefined;
        if (data?.id) {
          setDealTaskList(prev => [...prev, { id: data.id, ...values, amount: Number(values.amount) || 0 } as unknown as DealTaskItem]);
        } else {
          fetchDealTasks(paginationRef.current);
        }
        return true;
      } else {
        setError(response.message || 'Failed to add deal task');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to add deal task');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [fetchDealTasks, paginationRef]);

  const handleUpdate = useCallback(async (id: number, values: DealTaskFormData) => {
    setError('');
    setIsLoading(true);
    try {
      const payload = { ...values, category: 'deal_task' };
      const response = await taskService.updateTask(id, payload);
      if (response.status) {
        setDealTaskList(prev => prev.map(item =>
          item.id === id ? { ...item, ...values, amount: Number(values.amount) || 0 } as unknown as DealTaskItem : item
        ));
        return true;
      } else {
        setError(response.message || 'Failed to update deal task');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to update deal task');
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
        setDealTaskList(prev => prev.filter(item => item.id !== id));
        return true;
      } else {
        setError(response.message || 'Failed to delete deal task');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to delete deal task');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    dealTaskList,
    isLoading,
    error,
    deals,
    dealListLoading,
    staffOptions,
    page,
    limit,
    totalPages,
    totalItems,
    search,
    handleSearchChange,
    fetchDealTasks,
    handleAdd,
    handleUpdate,
    handleDelete,
    handlePageChange,
    handleLimitChange,
    validationSchema: addDealTaskValidationSchema,
    editValidationSchema: editDealTaskValidationSchema,
    initialValues: ADD_DEAL_TASK_INITIAL_VALUES,
  };
}
