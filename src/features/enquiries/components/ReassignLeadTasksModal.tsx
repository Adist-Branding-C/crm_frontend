import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { REASSIGN_TASKS_PROMPT } from '../constants/messages';
import type { ReassignLeadTasksModalProps } from '../types/modal.types';

const MODAL_Z_INDEX = 10000;

const ReassignLeadTasksModal = ({
  isOpen, taskCount, fromName, toName, onReassignWithTasks, onReassignLeadOnly, onCancel,
}: ReassignLeadTasksModalProps) => {
  const titleId = useId();
  const leadOnlyRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    leadOnlyRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const from = fromName || REASSIGN_TASKS_PROMPT.FALLBACK_FROM;
  const to = toName || REASSIGN_TASKS_PROMPT.FALLBACK_TO;
  const message = taskCount === null
    ? REASSIGN_TASKS_PROMPT.WITHOUT_COUNT(from, to)
    : REASSIGN_TASKS_PROMPT.WITH_COUNT(taskCount, from, to);

  return createPortal(
    <div className="modal-overlay" style={{ zIndex: MODAL_Z_INDEX }} onClick={onCancel}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h5 id={titleId}>{REASSIGN_TASKS_PROMPT.TITLE}</h5>
          <button className="modal-close" onClick={onCancel} aria-label={REASSIGN_TASKS_PROMPT.CLOSE}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            {REASSIGN_TASKS_PROMPT.SCOPE_NOTE}
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onReassignWithTasks}>
            {REASSIGN_TASKS_PROMPT.CONFIRM_WITH_TASKS}
          </button>
          <button ref={leadOnlyRef} className="btn btn-secondary" onClick={onReassignLeadOnly}>
            {REASSIGN_TASKS_PROMPT.CONFIRM_LEAD_ONLY}
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            {REASSIGN_TASKS_PROMPT.CANCEL}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ReassignLeadTasksModal;
