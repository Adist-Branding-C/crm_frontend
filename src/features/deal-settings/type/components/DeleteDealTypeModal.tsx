import React from 'react';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import type { DeleteDealTypeModalProps } from '../types/delete-deal-type-modal.types';

const DeleteDealTypeModal: React.FC<DeleteDealTypeModalProps> = ({
  isOpen, itemName, onConfirm, onClose,
}) => (
  <AdminDeleteModal isOpen={isOpen} itemName={itemName}
    onConfirm={onConfirm} onClose={onClose} />
);

export default DeleteDealTypeModal;
