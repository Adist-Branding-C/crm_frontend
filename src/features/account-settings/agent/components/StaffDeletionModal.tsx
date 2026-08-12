import React, { useEffect, useState } from 'react';
import { Loader2, X, AlertTriangle } from 'lucide-react';
import { agentService } from '../services/agent.service';
import { staffService } from '../../../deal/services/staff.service';
import type { AgentItem, StaffDeletionDependencies } from '../types/agent.types';
import type { LabelValuePair } from '../../../../shared/types/common';

export interface StaffDeletionModalProps {
  isOpen: boolean;
  staff: AgentItem | null;
  onClose: () => void;
  onDelete: (staffId: string) => Promise<boolean>;
}

/**
 * Staff-deletion confirmation, upgraded from a plain "are you sure" once the
 * staff member has leads/tasks/automation still referencing them:
 * - Leads: must be reassigned to another staff member inline before deleting.
 * - Tasks: must be deleted or reassigned inline before deleting.
 * - Automation: display-only - listed so the admin knows what to go fix in
 *   Automation Rules settings themselves; this modal never touches automation
 *   rules on its own.
 * Falls back to a plain confirm when there's nothing to resolve.
 */
const StaffDeletionModal: React.FC<StaffDeletionModalProps> = ({ isOpen, staff, onClose, onDelete }) => {
  const [isLoadingDependencies, setIsLoadingDependencies] = useState(false);
  const [dependencies, setDependencies] = useState<StaffDeletionDependencies | null>(null);
  const [staffOptions, setStaffOptions] = useState<LabelValuePair[]>([]);
  const [leadsTarget, setLeadsTarget] = useState('');
  const [leadsResolved, setLeadsResolved] = useState(false);
  const [isReassigningLeads, setIsReassigningLeads] = useState(false);
  const [tasksMode, setTasksMode] = useState<'reassign' | 'delete'>('reassign');
  const [tasksTarget, setTasksTarget] = useState('');
  const [tasksResolved, setTasksResolved] = useState(false);
  const [isResolvingTasks, setIsResolvingTasks] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const staffId = staff?.staff_id;
  const staffName = staff?.fullName || staff?.name || '';

  useEffect(() => {
    if (!isOpen || !staffId) return;
    setDependencies(null);
    setLeadsResolved(false);
    setTasksResolved(false);
    setLeadsTarget('');
    setTasksTarget('');
    setTasksMode('reassign');
    setError(null);
    setIsLoadingDependencies(true);

    Promise.all([
      agentService.getDeletionDependencies(staffId),
      staffService.getStaff(),
    ]).then(([depsRes, staffRes]) => {
      if (depsRes.status && depsRes.data) setDependencies(depsRes.data);
      else setError(depsRes.message || 'Failed to check staff dependencies');

      const raw = staffRes?.data;
      const items = Array.isArray(raw) ? raw : raw?.items ?? [];
      setStaffOptions(
        items
          .filter((s: { staff_id?: string }) => s.staff_id && s.staff_id !== staffId)
          .map((s: { staff_id?: string; name: string }) => ({ value: s.staff_id ?? '', label: s.name })),
      );
    }).catch(() => setError('Failed to check staff dependencies'))
      .finally(() => setIsLoadingDependencies(false));
  }, [isOpen, staffId]);

  if (!isOpen || !staff) return null;

  const hasAutomationRefs = (dependencies?.automationActions.length ?? 0) > 0;
  const leadsDone = !dependencies || dependencies.leadCount === 0 || leadsResolved;
  const tasksDone = !dependencies || dependencies.taskCount === 0 || tasksResolved;
  const canDelete = !isLoadingDependencies && leadsDone && tasksDone && !hasAutomationRefs;

  const handleReassignLeads = async () => {
    if (!staffId || !leadsTarget) return;
    setIsReassigningLeads(true);
    setError(null);
    try {
      const res = await agentService.reassignLeads(staffId, leadsTarget);
      if (res.status) setLeadsResolved(true);
      else setError(res.message || 'Failed to reassign leads');
    } catch {
      setError('Failed to reassign leads');
    } finally {
      setIsReassigningLeads(false);
    }
  };

  const handleResolveTasks = async () => {
    if (!staffId) return;
    if (tasksMode === 'reassign' && !tasksTarget) return;
    setIsResolvingTasks(true);
    setError(null);
    try {
      const res = await agentService.resolveTasks(staffId, tasksMode, tasksMode === 'reassign' ? tasksTarget : undefined);
      if (res.status) setTasksResolved(true);
      else setError(res.message || 'Failed to resolve tasks');
    } catch {
      setError('Failed to resolve tasks');
    } finally {
      setIsResolvingTasks(false);
    }
  };

  const handleFinalDelete = async () => {
    if (!staffId) return;
    setIsDeleting(true);
    setError(null);
    const success = await onDelete(staffId);
    setIsDeleting(false);
    if (!success) setError('Failed to delete staff member');
  };

  const nothingToResolve = dependencies && dependencies.leadCount === 0 && dependencies.taskCount === 0 && !hasAutomationRefs;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5>Delete Staff Member</h5>
          <button type="button" className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="modal-body">
          {isLoadingDependencies ? (
            <p><Loader2 size={16} className="spin" /> Checking for leads, tasks, and automation rules referencing {staffName}...</p>
          ) : nothingToResolve ? (
            <p className="delete-warning">Are you sure you want to delete <strong>{staffName}</strong>?</p>
          ) : (
            <>
              <p className="delete-warning">
                <strong>{staffName}</strong> can't be deleted yet - resolve the items below first.
              </p>

              {dependencies && dependencies.leadCount > 0 && (
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label>{dependencies.leadCount} lead(s) assigned to {staffName}</label>
                  {leadsResolved ? (
                    <p style={{ color: 'var(--success, #16a34a)', fontSize: '0.875rem' }}>Reassigned ✓</p>
                  ) : (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <select value={leadsTarget} onChange={(e) => setLeadsTarget(e.target.value)} disabled={isReassigningLeads} style={{ flex: 1 }}>
                        <option value="">Reassign all to...</option>
                        {staffOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                      <button className="btn btn-secondary" onClick={handleReassignLeads} disabled={!leadsTarget || isReassigningLeads} type="button">
                        {isReassigningLeads ? <Loader2 size={14} className="spin" /> : 'Reassign'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {dependencies && dependencies.taskCount > 0 && (
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label>{dependencies.taskCount} task(s) assigned to {staffName}</label>
                  {tasksResolved ? (
                    <p style={{ color: 'var(--success, #16a34a)', fontSize: '0.875rem' }}>Resolved ✓</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <input type="radio" checked={tasksMode === 'reassign'} onChange={() => setTasksMode('reassign')} /> Reassign
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <input type="radio" checked={tasksMode === 'delete'} onChange={() => setTasksMode('delete')} /> Delete
                        </label>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {tasksMode === 'reassign' && (
                          <select value={tasksTarget} onChange={(e) => setTasksTarget(e.target.value)} disabled={isResolvingTasks} style={{ flex: 1 }}>
                            <option value="">Reassign all to...</option>
                            {staffOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                          </select>
                        )}
                        <button
                          className="btn btn-secondary"
                          onClick={handleResolveTasks}
                          disabled={isResolvingTasks || (tasksMode === 'reassign' && !tasksTarget)}
                          type="button"
                        >
                          {isResolvingTasks ? <Loader2 size={14} className="spin" /> : tasksMode === 'delete' ? 'Delete Tasks' : 'Reassign'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {hasAutomationRefs && (
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <p style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#92400e', background: '#fef3c7', padding: '0.75rem', borderRadius: 'var(--border-radius-sm)' }}>
                    <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                    <span>
                      {staffName} is still used in {dependencies!.automationActions.length} automation rule action(s):{' '}
                      {[...new Set(dependencies!.automationActions.map((a) => a.ruleName))].join(', ')}.
                      Remove {staffName} from these in Automation Rules settings, then try deleting again.
                    </span>
                  </p>
                </div>
              )}
            </>
          )}

          {error && <p className="delete-warning" style={{ color: 'var(--danger, #dc2626)' }}>{error}</p>}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" onClick={handleFinalDelete} disabled={!canDelete || isDeleting}>
            {isDeleting ? <Loader2 size={14} className="spin" /> : 'Delete'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default StaffDeletionModal;
