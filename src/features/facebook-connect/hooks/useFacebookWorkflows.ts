import { useCallback, useEffect, useMemo, useState } from 'react';
import { facebookApi } from '../services/facebook.service';
import { useToast } from '../../../shared/hooks/useToast';
import type { Workflow } from '../types';

export const useFacebookWorkflows = () => {
  const toast = useToast();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await facebookApi.listWorkflows();
      setWorkflows(response.data ?? []);
    } catch {
      toast.showToastMessage('Failed to load Facebook workflows', 'error');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleStatus = async (workflow: Workflow) => {
    const nextStatus = workflow.status === 'active' ? 'inactive' : 'active';
    try {
      await facebookApi.updateWorkflow(workflow.id, { status: nextStatus });
      toast.showToastMessage(`Workflow turned ${nextStatus}`, 'success');
      await load();
    } catch {
      toast.showToastMessage('Failed to update this Workflow', 'error');
    }
  };

  const remove = async (workflowId: string) => {
    try {
      await facebookApi.deleteWorkflow(workflowId);
      toast.showToastMessage('Workflow deleted', 'success');
      await load();
    } catch {
      toast.showToastMessage('Failed to delete this Workflow', 'error');
    }
  };

  const filteredWorkflows = useMemo(() => {
    return workflows.filter((workflow) => {
      const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
      const matchesStatus = !statusFilter || workflow.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [workflows, searchQuery, statusFilter]);

  return {
    workflows: filteredWorkflows,
    loading,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    toggleStatus,
    remove,
    toast,
    reload: load,
  };
};
