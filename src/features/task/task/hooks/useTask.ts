import { useState, useCallback, useEffect, useRef } from 'react';
import { taskService } from '../../shared/services/taskService';
import { addTaskValidationSchema, editTaskValidationSchema } from '../validations/task.validation';
import { ADD_TASK_INITIAL_VALUES } from '../constants/task.constants';
import type { TaskItem, TaskFormData } from '../types/task.types';

export function useTask() {
  const [taskList, setTaskList] = useState<TaskItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
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

  const fetchTasks = useCallback(async (params: Record<string, string | number | undefined> = {}) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await taskService.getTasks(params);
      if (response.status) {
        const data = response.data && typeof response.data === 'object'
          ? (response.data as Record<string, unknown>)
          : {};
        const rawData = 'items' in data
          ? (data.items as TaskItem[])
          : Array.isArray(response.data)
            ? response.data
            : [];
        setTaskList(Array.isArray(rawData) ? rawData : []);
        const categories = data.categories;
        if (Array.isArray(categories)) setCategoryOptions(categories as string[]);
        const staff = data.staff;
        if (Array.isArray(staff)) setStaffOptions(staff as string[]);
        const apiTotalPages = data.totalPages ?? data.totalPages ?? 1;
        const apiTotalItems = data.totalItems ?? data.total ?? data.totalRecords ?? 0;
        if (typeof apiTotalPages === 'number') setTotalPages(apiTotalPages);
        if (typeof apiTotalItems === 'number') setTotalItems(apiTotalItems);
      } else {
        setError(response.message || 'Failed to fetch tasks');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to fetch tasks');
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
    fetchTasks(params);
  }, [fetchTasks, page, limit, debouncedSearch]);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleLimitChange = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  }, []);

  const handleAdd = useCallback(async (values: TaskFormData) => {
    setError('');
    setIsLoading(true);
    try {
      const response = await taskService.createTask(values);
      if (response.status) {
        const data = response.data as { id?: number } | undefined;
        if (data?.id) {
          setTaskList(prev => [...prev, { id: data.id, ...values } as unknown as TaskItem]);
        } else {
          fetchTasks(paginationRef.current);
        }
        return true;
      } else {
        setError(response.message || 'Failed to add task');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to add task');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [fetchTasks, paginationRef]);

  const handleUpdate = useCallback(async (id: number, values: TaskFormData) => {
    setError('');
    setIsLoading(true);
    try {
      const response = await taskService.updateTask(id, values);
      if (response.status) {
        setTaskList(prev => prev.map(item =>
          item.id === id ? { ...item, ...values } as unknown as TaskItem : item
        ));
        return true;
      } else {
        setError(response.message || 'Failed to update task');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to update task');
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
        setTaskList(prev => prev.filter(item => item.id !== id));
        return true;
      } else {
        setError(response.message || 'Failed to delete task');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to delete task');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    taskList,
    isLoading,
    error,
    categoryOptions,
    staffOptions,
    page,
    limit,
    totalPages,
    totalItems,
    search,
    handleSearchChange,
    fetchTasks,
    handleAdd,
    handleUpdate,
    handleDelete,
    handlePageChange,
    handleLimitChange,
    validationSchema: addTaskValidationSchema,
    editValidationSchema: editTaskValidationSchema,
    initialValues: ADD_TASK_INITIAL_VALUES,
  };
}
