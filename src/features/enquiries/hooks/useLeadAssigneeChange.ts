import { useCallback, useEffect, useRef, useState } from 'react';
import { leadDataService } from '../services/leadDataService';
import type { UpdateLeadPayload } from '../types/request';
import type { ReassignLeadTasksModalProps } from '../types/modal.types';

export interface AssigneeChangeNames {
  fromName?: string | undefined;
  toName?: string | undefined;
}

type Decision = 'withTasks' | 'leadOnly' | 'cancel';

interface PendingDecision extends AssigneeChangeNames {
  payload: UpdateLeadPayload;
  taskCount: number | null;
  resolve: (payload: UpdateLeadPayload | null) => void;
}

export interface UseLeadAssigneeChangeReturn {
  resolvePayload: (leadId: string, payload: UpdateLeadPayload, names?: AssigneeChangeNames) => Promise<UpdateLeadPayload | null>;
  modalProps: ReassignLeadTasksModalProps;
}

export function useLeadAssigneeChange(): UseLeadAssigneeChangeReturn {
  const [pending, setPending] = useState<PendingDecision | null>(null);
  const pendingRef = useRef<PendingDecision | null>(null);

  const settle = useCallback((decision: Decision) => {
    const current = pendingRef.current;
    if (!current) return;
    pendingRef.current = null;
    setPending(null);
    if (decision === 'cancel') current.resolve(null);
    else if (decision === 'leadOnly') current.resolve(current.payload);
    else current.resolve({ ...current.payload, reassignOpenTasks: true });
  }, []);

  useEffect(() => () => {
    pendingRef.current?.resolve(null);
    pendingRef.current = null;
  }, []);

  const resolvePayload = useCallback(async (
    leadId: string,
    payload: UpdateLeadPayload,
    names: AssigneeChangeNames = {},
  ): Promise<UpdateLeadPayload | null> => {
    const newAgentId = payload.agentId;
    if (!newAgentId) return payload;

    let taskCount: number | null = null;
    try {
      const res = await leadDataService.getReassignableTaskCount(leadId);
      if (res.status && res.data) {
        const { currentAgentId, openTaskCount } = res.data;
        if (!currentAgentId || currentAgentId === newAgentId || openTaskCount === 0) return payload;
        taskCount = openTaskCount;
      }
    } catch {
    }

    pendingRef.current?.resolve(null);
    return new Promise<UpdateLeadPayload | null>((resolve) => {
      const next: PendingDecision = { payload, taskCount, ...names, resolve };
      pendingRef.current = next;
      setPending(next);
    });
  }, []);

  const onReassignWithTasks = useCallback(() => settle('withTasks'), [settle]);
  const onReassignLeadOnly = useCallback(() => settle('leadOnly'), [settle]);
  const onCancel = useCallback(() => settle('cancel'), [settle]);

  return {
    resolvePayload,
    modalProps: {
      isOpen: pending !== null,
      taskCount: pending?.taskCount ?? null,
      fromName: pending?.fromName,
      toName: pending?.toName,
      onReassignWithTasks,
      onReassignLeadOnly,
      onCancel,
    },
  };
}
