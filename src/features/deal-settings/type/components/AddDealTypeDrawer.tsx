import React from 'react';
import AdminFormDrawer from '../../../../shared/components/crud/AdminFormDrawer';
import { DEAL_TYPE_FORM_FIELDS } from '../constants/deal-type.constants';
import type { AddDealTypeDrawerProps } from '../types/add-deal-type-drawer.types';

const AddDealTypeDrawer: React.FC<AddDealTypeDrawerProps> = ({
  isOpen, formData, onChange, onSave, onClose, isEditing,
}) => (
  <AdminFormDrawer isOpen={isOpen} title="Deal Type" fields={DEAL_TYPE_FORM_FIELDS}
    formData={formData} onChange={onChange} onSave={onSave}
    onClose={onClose} isEditing={isEditing} />
);

export default AddDealTypeDrawer;
