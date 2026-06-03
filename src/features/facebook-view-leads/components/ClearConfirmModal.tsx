import React from 'react';
import { ACTION_CANCEL, ACTION_CLEAR } from '../../../shared/constants/actionLabels';
import type { ClearConfirmModalProps } from '../types';

const ClearConfirmModal: React.FC<ClearConfirmModalProps> = ({ isOpen, onConfirm, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content confirm-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-body">
          <p>Are you sure you want to clear all filters?</p>
          <div className="modal-actions">
            <button className="btn btn-secondary" onClick={onClose}>{ACTION_CANCEL}</button>
            <button className="btn btn-primary" onClick={onConfirm}>{ACTION_CLEAR}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClearConfirmModal;
