import { useCallback, useEffect, useState } from 'react';
import { taskKanbanService } from '../services/taskKanbanService';
import { TASK_BOARD_WORKFLOW_STORAGE_KEY } from '../constants/taskBoard.constants';
import type { TaskWorkflowItem } from '../../../task-settings/task-workflow/types/interface';

function readStoredWorkflowId(): string | null {
  try {
    return localStorage.getItem(TASK_BOARD_WORKFLOW_STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeWorkflowId(id: string): void {
  try {
    localStorage.setItem(TASK_BOARD_WORKFLOW_STORAGE_KEY, id);
  } catch {
    // Private browsing — picker still works this session.
  }
}

export function useSelectedWorkflow() {
  const [workflows, setWorkflows] = useState<TaskWorkflowItem[]>([]);
  const [selectedWorkflowId, setSelectedWorkflowIdState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    taskKanbanService
      .getWorkflows()
      .then((items) => {
        if (cancelled) return;
        setWorkflows(items);
        const stored = readStoredWorkflowId();
        const storedIsValid = stored !== null && items.some((w) => w.id === stored);
        const fallback = items.find((w) => w.isDefault) ?? items[0];
        setSelectedWorkflowIdState(storedIsValid ? stored : fallback ? fallback.id : null);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const setSelectedWorkflowId = useCallback((id: string) => {
    setSelectedWorkflowIdState(id);
    storeWorkflowId(id);
  }, []);

  return { workflows, selectedWorkflowId, setSelectedWorkflowId, isLoading };
}
