import { useState, useCallback, useEffect } from 'react';
import { taskService } from '../services/task.service';
import { addTaskValidationSchema, editTaskValidationSchema } from '../validations/task.validation';
import { ADD_TASK_INITIAL_VALUES } from '../constants/task.constants';
import type { TaskItem, TaskFormData } from '../types/task.types';

export function useTask() {
  const [taskList, setTaskList] = useState<TaskItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTasks = useCallback(async (params: Record<string, string | number | undefined> = {}) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await taskService.getAll(params);
      if (response.status) {
        const rawData = response.data && typeof response.data === 'object' && 'items' in response.data
          ? (response.data as { items: TaskItem[] }).items
          : Array.isArray(response.data)
            ? response.data
            : [];
        setTaskList(Array.isArray(rawData) ? rawData : []);
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
    fetchTasks();
  }, [fetchTasks]);

  const handleAdd = useCallback(async (values: TaskFormData) => {
    setError('');
    setIsLoading(true);
    try {
      const response = await taskService.create(values);
      if (response.status) {
        const data = response.data as { id?: number } | undefined;
        if (data?.id) {
          setTaskList(prev => [...prev, { id: data.id, ...values, amount: Number(values.amount) || 0 } as unknown as TaskItem]);
        } else {
          fetchTasks();
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
  }, [fetchTasks]);

  const handleUpdate = useCallback(async (id: number, values: TaskFormData) => {
    setError('');
    setIsLoading(true);
    try {
      const response = await taskService.update(id, values);
      if (response.status) {
        setTaskList(prev => prev.map(item =>
          item.id === id ? { ...item, ...values, amount: Number(values.amount) || 0 } as unknown as TaskItem : item
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
      const response = await taskService.delete(id);
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
    fetchTasks,
    handleAdd,
    handleUpdate,
    handleDelete,
    validationSchema: addTaskValidationSchema,
    editValidationSchema: editTaskValidationSchema,
    initialValues: ADD_TASK_INITIAL_VALUES,
  };
}
