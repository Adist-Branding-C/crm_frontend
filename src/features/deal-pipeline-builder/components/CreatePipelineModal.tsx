import { useState } from 'react';
import Modal from '../../../shared/components/Modal';
import ErrorMessage from '../../../shared/components/ErrorMessage';

interface CreatePipelineModalProps {
  isOpen: boolean;
  isSubmitting: boolean;
  error: string;
  onSubmit: (name: string) => void;
  onClose: () => void;
}

function CreatePipelineModal({ isOpen, isSubmitting, error, onSubmit, onClose }: CreatePipelineModalProps) {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Pipeline">
      <div style={{ padding: 'var(--space-4)' }}>
        {error && <ErrorMessage message={error} />}
        <div className="form-group">
          <label>Pipeline name <span className="text-danger">*</span></label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Enterprise Sales"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-primary"
            disabled={!name.trim() || isSubmitting}
            onClick={() => onSubmit(name.trim())}
          >
            Create
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

export default CreatePipelineModal;
