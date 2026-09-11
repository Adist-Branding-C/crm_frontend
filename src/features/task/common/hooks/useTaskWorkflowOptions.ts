import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { taskWorkflowService } from '../../../task-settings/task-workflow/services/taskworkflow.service';
import type { TaskWorkflowItem } from '../../../task-settings/task-workflow/types/interface';
import type { LabelValuePair } from '../../../../shared/types/common';

function bySortOrder(a: { sortOrder: number }, b: { sortOrder: number }): number {
  return a.sortOrder - b.sortOrder;
}

/**
 * Loads the company's task workflows for the Workflow dropdown and fetches the
 * selected workflow's stages on demand for the dependent Stage dropdown.
 *
 * Used by:
 * - GenericTaskForm (shared across the Task / Call Task / Campaign Task / Deal Task drawers)
 *
 * Notes:
 * - The workflow list endpoint (getAllWorkflows) does not include stages, so
 *   `loadStages` reuses the existing detail endpoint `GET /task-workflows/:id`
 *   (getWorkflow) to fetch a workflow's stages whenever the selected workflow
 *   changes - in-flight responses are guarded so a trailing request can never
 *   overwrite a newer selection's stages.
 * - Mirrors the DealForm pipeline/stage dependent-dropdown interaction pattern,
 *   reusing the existing task-workflow service instead of the Deal feature's
 *   own pipeline/status hooks.
 */
export function useTaskWorkflowOptions() {
  const [workflows, setWorkflows] = useState<TaskWorkflowItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stageOptions, setStageOptions] = useState<LabelValuePair[]>([]);
  const [isLoadingStages, setIsLoadingStages] = useState(false);
  const activeWorkflowIdRef = useRef('');

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      setWorkflows(await taskWorkflowService.getAllWorkflows());
    } catch {
      setWorkflows([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const loadStages = useCallback(async (workflowId: string) => {
    const id = String(workflowId ?? '');
    activeWorkflowIdRef.current = id;
    if (!id) {
      setStageOptions([]);
      setIsLoadingStages(false);
      return;
    }
    setIsLoadingStages(true);
    try {
      const workflow = await taskWorkflowService.getWorkflow(Number(id));
      if (activeWorkflowIdRef.current !== id) return;
      setStageOptions(
        (workflow.stages ?? [])
          .slice()
          .sort(bySortOrder)
          .map((stage) => ({ value: stage.id, label: stage.name })),
      );
    } catch {
      if (activeWorkflowIdRef.current !== id) return;
      setStageOptions([]);
    } finally {
      if (activeWorkflowIdRef.current === id) setIsLoadingStages(false);
    }
  }, []);

  const workflowOptions = useMemo<LabelValuePair[]>(
    () =>
      workflows.map((workflow) => ({
        value: workflow.id,
        label: workflow.isDefault ? `${workflow.name} (Default)` : workflow.name,
      })),
    [workflows],
  );

  const defaultWorkflowId = useMemo(() => {
    const defaultWorkflow = workflows.find((workflow) => workflow.isDefault) ?? workflows[0];
    return defaultWorkflow ? String(defaultWorkflow.id) : '';
  }, [workflows]);

  return {
    workflows,
    isLoading,
    workflowOptions,
    defaultWorkflowId,
    stageOptions,
    isLoadingStages,
    loadStages,
  };
}