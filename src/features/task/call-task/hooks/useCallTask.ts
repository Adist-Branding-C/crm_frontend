import { useState, useCallback, useEffect, useRef } from 'react';
import { taskService } from '../../shared/services/taskService';
import { addCallTaskValidationSchema, editCallTaskValidationSchema } from '../validations/callTask.validation';
import { ADD_CALL_TASK_INITIAL_VALUES } from '../constants/callTask.constants';
import type { CallTaskItem, CallTaskFormData } from '../types/callTask.types';

export function useCallTask() {
  const [callTaskList, setCallTaskList] = useState<CallTaskItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [staffOptions, setStaffOptions] = useState<string[]>([]);
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

  const fetchCallTasks = useCallback(async (params: Record<string, string | number | undefined> = {}) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await taskService.getTasks({ ...params, category: 'call_task' });
      if (response.status) {
        const data = response.data && typeof response.data === 'object'
          ? (response.data as Record<string, unknown>)
          : {};
        const rawData = 'items' in data
          ? (data.items as CallTaskItem[])
          : Array.isArray(response.data)
            ? response.data
            : [];
        setCallTaskList(Array.isArray(rawData) ? rawData : []);
        const staff = data.staff;
        if (Array.isArray(staff)) setStaffOptions(staff as string[]);
        const apiTotalPages = data.totalPages ?? data.totalPages ?? 1;
        const apiTotalItems = data.totalItems ?? data.total ?? data.totalRecords ?? 0;
        if (typeof apiTotalPages === 'number') setTotalPages(apiTotalPages);
        if (typeof apiTotalItems === 'number') setTotalItems(apiTotalItems);
      } else {
        setError(response.message || 'Failed to fetch call tasks');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to fetch call tasks');
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
    fetchCallTasks(params);
  }, [fetchCallTasks, page, limit, debouncedSearch]);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleLimitChange = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  }, []);

  const handleAdd = useCallback(async (values: CallTaskFormData) => {
    setError('');
    setIsLoading(true);
    try {
      const payload = { ...values, category: 'call_task' };
      const response = await taskService.createTask(payload);
      if (response.status) {
        const data = response.data as { id?: number } | undefined;
        if (data?.id) {
          setCallTaskList(prev => [...prev, { id: data.id, ...values } as unknown as CallTaskItem]);
        } else {
          fetchCallTasks(paginationRef.current);
        }
        return true;
      } else {
        setError(response.message || 'Failed to add call task');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to add call task');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [fetchCallTasks, paginationRef]);

  const handleUpdate = useCallback(async (id: number, values: CallTaskFormData) => {
    setError('');
    setIsLoading(true);
    try {
      const payload = { ...values, category: 'call_task' };
      const response = await taskService.updateTask(id, payload);
      if (response.status) {
        setCallTaskList(prev => prev.map(item =>
          item.id === id ? { ...item, ...values } as unknown as CallTaskItem : item
        ));
        return true;
      } else {
        setError(response.message || 'Failed to update call task');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to update call task');
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
        setCallTaskList(prev => prev.filter(item => item.id !== id));
        return true;
      } else {
        setError(response.message || 'Failed to delete call task');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to delete call task');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    callTaskList,
    isLoading,
    error,
    staffOptions,
    page,
    limit,
    totalPages,
    totalItems,
    search,
    handleSearchChange,
    fetchCallTasks,
    handleAdd,
    handleUpdate,
    handleDelete,
    handlePageChange,
    handleLimitChange,
    validationSchema: addCallTaskValidationSchema,
    editValidationSchema: editCallTaskValidationSchema,
    initialValues: ADD_CALL_TASK_INITIAL_VALUES,
  };
}
