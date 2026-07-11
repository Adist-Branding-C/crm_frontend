import { useState, useCallback, useEffect, useRef } from 'react';
import { taskService } from '../../task/shared/services/taskService';
import { ERROR_MESSAGES } from '../constants/messages';
export function useLeadTasks(leadId, isOpen, activeTab) {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchedRef = useRef(false);
    const fetchTasks = useCallback(async () => {
        if (!leadId)
            return;
        setIsLoading(true);
        setError(null);
        try {
            const response = await taskService.getTasks({ entityType: 'lead', entityId: leadId });
            if (response.status) {
                const data = response.data || {};
                const items = data.items || [];
                setTasks(Array.isArray(items) ? items : []);
            }
            else {
                setError(response.message || ERROR_MESSAGES.FETCH_TASKS);
            }
        }
        catch {
            setError(ERROR_MESSAGES.FETCH_TASKS);
        }
        finally {
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
    const addTask = useCallback(async (data) => {
        setError(null);
        try {
            const response = await taskService.createTask({ ...data, entityType: 'lead', entityId: leadId });
            if (response.status) {
                await fetchTasks();
                return true;
            }
            else {
                setError(response.message || ERROR_MESSAGES.ADD_TASK);
                return false;
            }
        }
        catch {
            setError(ERROR_MESSAGES.ADD_TASK);
            return false;
        }
    }, [leadId, fetchTasks]);
    const updateTask = useCallback(async (id, data) => {
        setError(null);
        try {
            const response = await taskService.updateTask(id, data);
            if (response.status) {
                await fetchTasks();
                return true;
            }
            else {
                setError(response.message || ERROR_MESSAGES.UPDATE_TASK);
                return false;
            }
        }
        catch {
            setError(ERROR_MESSAGES.UPDATE_TASK);
            return false;
        }
    }, [fetchTasks]);
    const deleteTask = useCallback(async (id) => {
        try {
            const response = await taskService.deleteTask(id);
            if (response.status) {
                await fetchTasks();
                return true;
            }
            else {
                setError(response.message || ERROR_MESSAGES.DELETE_TASK);
                return false;
            }
        }
        catch {
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
//# sourceMappingURL=useLeadTasks.js.map