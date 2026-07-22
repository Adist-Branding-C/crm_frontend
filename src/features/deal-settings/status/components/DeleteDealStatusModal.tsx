import React from 'react';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import type { DeleteDealStatusModalProps } from '../types/delete-deal-status-modal.types';

const DeleteDealStatusModal: React.FC<DeleteDealStatusModalProps> = ({
  isOpen, itemName, onConfirm, onClose,
}) => (
  <AdminDeleteModal isOpen={isOpen} itemName={itemName}
    onConfirm={onConfirm} onClose={onClose} />
);

export default DeleteDealStatusModal;
