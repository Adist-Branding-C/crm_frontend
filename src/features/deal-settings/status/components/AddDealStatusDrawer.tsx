import React from 'react';
import AdminFormDrawer from '../../../../shared/components/crud/AdminFormDrawer';
import { DEAL_STATUS_FORM_FIELDS } from '../constants/deal-status.constants';
import { dealStatusValidationSchema } from '../validations/dealStatus.validation';
import type { AddDealStatusDrawerProps } from '../types/add-deal-status-drawer.types';

const AddDealStatusDrawer: React.FC<AddDealStatusDrawerProps> = ({
  isOpen, formData, onChange, onSave, onClose, isEditing,
}) => (
  <AdminFormDrawer isOpen={isOpen} title="Deal Status" fields={DEAL_STATUS_FORM_FIELDS}
    formData={formData} onChange={onChange} onSave={onSave}
    onClose={onClose} isEditing={isEditing} validationSchema={dealStatusValidationSchema} />
);

export default AddDealStatusDrawer;
