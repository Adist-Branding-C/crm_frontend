import { useState, useCallback, useEffect, useRef } from 'react';
import { taskApiService } from '../../task/task/services/index';
import { ListResponseMapper } from '../../../shared/mappers/list-response.mapper';
import type { TaskItem } from '../../task/task/types/interface';
import type { LeadTaskItem, LeadTaskFormData } from '../types';
import { ERROR_MESSAGES } from '../constants/messages';

/**
 * useLeadTasks talks to the same backend Task API as the Call/Deal/Campaign
 * Task pages (taskApiService), but the lead drawer's Task tab uses its own,
 * flatter LeadTaskItem/LeadTaskFormData shapes (category/assignedTo as plain
 * strings rather than {id,name} objects, and no separate entityType/entityId
 * pair - the leadId is passed straight into the create/update payload). These
 * two small mappers translate between the two shapes at the boundary.
 */
function toLeadTaskItem(task: TaskItem): LeadTaskItem {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    category: task.category?.name ?? '',
    scheduledDate: task.scheduledDate,
    scheduledTime: task.scheduledTime,
    assignedBy: task.assignedBy,
    assignedTo: task.assignedTo?.name ?? '',
    priority: task.priority,
    status: task.status,
  };
}

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
      const response = await taskApiService.getAll({ pageNumber: 1, limit: 100, leadId: String(leadId) });
      if (response.status) {
        const { items } = ListResponseMapper.toPagedResult<TaskItem>(response);
        setTasks(items.map(toLeadTaskItem));
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
      const response = await taskApiService.create({
        title: data.title,
        description: data.description,
        categoryId: data.category,
        scheduledDate: data.scheduledDate,
        scheduledTime: data.scheduledTime,
        assignedTo: data.assignedTo,
        leadId: String(leadId),
        priority: data.priority,
        status: data.status,
      });
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
    if (!leadId) return false;
    setError(null);
    try {
      const response = await taskApiService.update(id, {
        title: data.title,
        description: data.description,
        categoryId: data.category,
        scheduledDate: data.scheduledDate,
        scheduledTime: data.scheduledTime,
        assignedTo: data.assignedTo,
        leadId: String(leadId),
        priority: data.priority,
        status: data.status,
      });
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
  }, [leadId, fetchTasks]);

  const deleteTask = useCallback(async (id: number): Promise<boolean> => {
    try {
      const response = await taskApiService.delete(id);
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
