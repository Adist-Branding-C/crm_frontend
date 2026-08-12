import { useState, useCallback, useEffect, useRef } from 'react';
import type { LeadTaskItem, LeadTaskFormData } from '../types';
import { ERROR_MESSAGES } from '../constants/messages';
import { taskDataService } from '../../task/task/services/taskDataService';
import { toTaskCreatePayload, toTaskUpdatePayload } from '../utils/leadMapper';

export function useLeadTasks(leadId: number | undefined, isOpen: boolean, activeTab: string) {
  const [tasks, setTasks] = useState<LeadTaskItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  const fetchTasks = useCallback(async () => {
    if (!leadId) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await taskDataService.getAll({ pageNumber: 1, limit: 100, leadId: String(leadId) });
      if (response.status) {
        const items = (response.data as unknown as LeadTaskItem[]) || [];
        setTasks(Array.isArray(items) ? items : []);

      } else {
        setError(response.message || ERROR_MESSAGES.FETCH_TASKS);
      }
    } catch {
      setError(ERROR_MESSAGES.FETCH_TASKS);
    } finally {
      setIsLoading(false);
    }
  }, [leadId]);

  useEffect(() => {
    if (isOpen && activeTab === 'task' && leadId && !fetchedRef.current) {
      fetchedRef.current = true;
      fetchTasks();
    }
    if (!isOpen || activeTab !== 'task') {
      fetchedRef.current = false;
    }
  }, [isOpen, activeTab, leadId, fetchTasks]);

  const addTask = useCallback(async (data: LeadTaskFormData): Promise<boolean> => {
    if (!leadId) return false;
    setError(null);
    try {
      const response = await taskDataService.create(toTaskCreatePayload(data, leadId));
      if (response.status) {
        await fetchTasks();
        return true;
      } else {
        setError(response.message || ERROR_MESSAGES.ADD_TASK);
        return false;
      }
    } catch {
      setError(ERROR_MESSAGES.ADD_TASK);
      return false;
    }
  }, [leadId, fetchTasks]);

  const updateTask = useCallback(async (id: number, data: LeadTaskFormData): Promise<boolean> => {
    setError(null);
    try {
      const response = await taskDataService.update(id, toTaskUpdatePayload(data));
      if (response.status) {
        await fetchTasks();
        return true;
      } else {
        setError(response.message || ERROR_MESSAGES.UPDATE_TASK);
        return false;
      }
    } catch {
      setError(ERROR_MESSAGES.UPDATE_TASK);
      return false;
    }
  }, [fetchTasks]);

  const deleteTask = useCallback(async (id: number): Promise<boolean> => {
    try {
      const response = await taskDataService.delete(id);
      if (response.status) {
        await fetchTasks();
        return true;
      } else {
        setError(response.message || ERROR_MESSAGES.DELETE_TASK);
        return false;
      }
    } catch {
      setError(ERROR_MESSAGES.DELETE_TASK);
      return false;
    }
  }, [fetchTasks]);

  return {
    tasks,
    isLoading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
  };
}
