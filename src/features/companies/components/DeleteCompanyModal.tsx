import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { ACTION_CANCEL } from '../../../shared/constants/actionLabels';

const COUNTDOWN_SECONDS = 10;

interface Props {
  isOpen: boolean;
  companyName?: string | undefined;
  onConfirm: () => Promise<void> | void;
  onClose: () => void;
}

/**
 * Delete-company confirmation - a heavier flow than the generic AdminDeleteModal
 * because deleting a company also cascades to its staff and auth accounts.
 * Requires typing an exact confirmation phrase (paste blocked) and checking an
 * acknowledgement box before a cancellable 10s countdown fires the real delete.
 *
 * Used by:
 * - CompaniesPage
 */
const DeleteCompanyModal: React.FC<Props> = ({ isOpen, companyName, onConfirm, onClose }) => {
  const [typedText, setTypedText] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [phase, setPhase] = useState<'confirm' | 'countdown'>('confirm');
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const requiredPhrase = `I am aware to delete ${companyName ?? ''}`;

  const clearCountdown = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetState = () => {
    clearCountdown();
    setTypedText('');
    setAgreed(false);
    setPhase('confirm');
    setSecondsLeft(COUNTDOWN_SECONDS);
  };

  useEffect(() => {
    if (!isOpen) resetState();
    return clearCountdown;
  }, [isOpen]);

  useEffect(() => {
    if (phase !== 'countdown') return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return clearCountdown;
  }, [phase]);

  useEffect(() => {
    if (phase === 'countdown' && secondsLeft <= 0) {
      clearCountdown();
      onConfirm();
    }
  }, [phase, secondsLeft, onConfirm]);

  if (!isOpen) return null;

  const canSubmit = typedText === requiredPhrase && agreed;

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleStartCountdown = () => {
    if (!canSubmit) return;
    setSecondsLeft(COUNTDOWN_SECONDS);
    setPhase('countdown');
  };

  const handleUndo = () => {
    clearCountdown();
    setPhase('confirm');
    setSecondsLeft(COUNTDOWN_SECONDS);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5>Delete Company</h5>
          <button type="button" className="modal-close" onClick={handleClose}><X size={20} /></button>
        </div>

        {phase === 'confirm' ? (
          <>
            <div className="modal-body">
              <p className="delete-warning">
                This will permanently delete <strong>{companyName}</strong>, along with its admin staff and login account. This cannot be undone once the countdown below completes.
              </p>
              <div className="form-group">
                <label>Type <strong>{requiredPhrase}</strong> to confirm</label>
                <input
                  type="text"
                  value={typedText}
                  onChange={(e) => setTypedText(e.target.value)}
                  onPaste={(e) => e.preventDefault()}
                  placeholder={requiredPhrase}
                  autoComplete="off"
                />
              </div>
              <div className="checkbox-group">
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  I understand the related staff and auth accounts will also be deleted.
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={handleStartCountdown} disabled={!canSubmit}>
                Delete
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                {ACTION_CANCEL}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="modal-body">
              <p className="delete-warning">
                Deleting <strong>{companyName}</strong> in <strong>{secondsLeft}</strong> second{secondsLeft === 1 ? '' : 's'}...
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleUndo}>
                Undo
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteCompanyModal;
