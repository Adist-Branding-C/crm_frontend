import React from 'react';
import Drawer from '../Drawer';
import AdminForm from './AdminForm';
import { ACTION_EDIT, ACTION_ADD } from '../../constants/actionLabels';
import type { AdminFormDrawerProps } from '../../types/crud';

/**
 * Shell (Drawer) + content (AdminForm) composition.
 *
 * Notes:
 * - Kept as a thin, backward-compatible wrapper for existing consumers that pass the flat
 *   isOpen/title/fields/formData/... prop list. New call sites can compose Drawer + AdminForm
 *   directly instead of going through this wrapper.
 */
const AdminFormDrawer: React.FC<AdminFormDrawerProps> = ({ isOpen, title, onClose, isEditing, ...formProps }) => (
  <Drawer isOpen={isOpen} title={`${isEditing ? ACTION_EDIT : ACTION_ADD} ${title}`} onClose={onClose}>
    <AdminForm onClose={onClose} isEditing={isEditing} {...formProps} />
  </Drawer>
);

export default AdminFormDrawer;
