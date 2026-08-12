import React, { useState } from 'react';
import Drawer from '../Drawer';
import DealForm from '../../../features/deal/components/DealForm';
import { dealValidationSchema } from '../../../features/deal/validations';
import { combineMobileValue } from '../../../features/deal/utils/mobileFormat';
import { DEFAULT_COUNTRY_CODE } from '../../constants/countryCodes';
import type { AddDealDrawerProps } from '../../types/drawers';
import PreviewCanvas, { PreviewSection } from '../preview/PreviewCanvas';
import { dealDataService } from '../../../features/deal/services/dealDataService';
import { draftService } from '../../services/draftService';
import { useToast } from '../../hooks/useToast';
import type { DealPreviewData } from '../../../features/deal/types/component.types';

const AddDealDrawer = ({ isOpen, onClose, deal = null, draftId: initialDraftId, onSave }: AddDealDrawerProps) => {
  const isEditing = !!deal;
  
  const [view, setView] = useState<'form' | 'preview'>('form');
  const [previewData, setPreviewData] = useState<DealPreviewData | null>(null);
  const [draftId, setDraftId] = useState<string | null>(initialDraftId || null);
  const [loadedDraftValues, setLoadedDraftValues] = useState<Record<string, unknown> | null>(null);

  React.useEffect(() => {
    if (initialDraftId && isOpen) {
      const draft = draftService.getDrafts('deal').find(d => d.id === initialDraftId);
      if (draft) {
        setLoadedDraftValues(draft.payload);
        setDraftId(draft.id);
      }
    } else if (!isOpen) {
      setLoadedDraftValues(null);
      setDraftId(null);
    }
  }, [initialDraftId, isOpen]);

  const [isSaving, setIsSaving] = useState(false);

  const handlePreviewRequest = (data: DealPreviewData) => {
    setPreviewData(data);
    setView('preview');
  };

  const handleEdit = () => {
    setView('form');
  };

  const handleClose = () => {
    setView('form');
    setPreviewData(null);
    setDraftId(null);
    onClose();
  };

  const handleSave = async () => {
    if (!previewData) return;
    
    setIsSaving(true);
    try {
      const values = previewData.payload;
      await onSave({ ...values, mobile: combineMobileValue(values.mobileCountryCode, values.mobileNumber) });
      
      if (draftId) {
        draftService.deleteDraft(draftId);
      }
      
      handleClose();
    } finally {
      setIsSaving(false);
    }
  };

  if (view === 'preview' && previewData) {
    return (
      <PreviewCanvas
        isOpen={isOpen}
        title={isEditing ? 'Preview Edit' : 'Preview Deal'}
        subtitle="Review the details before saving"
        sections={previewData.sections}
        isSaving={isSaving}
        onClose={handleClose}
        onEdit={handleEdit}
        onSave={handleSave}
      />
    );
  }

  return (
    <Drawer isOpen={isOpen} onClose={handleClose} title={isEditing ? 'Edit Deal' : 'Add Deal'} overlayClassName="drawer-overlay" panelClassName="drawer-panel">
      <DealForm
        editingItem={deal}
        draftId={draftId}
        initialDraftValues={loadedDraftValues || previewData?.formValues}
        onDraftSaved={setDraftId}
        onPreviewRequest={handlePreviewRequest}
        validationSchema={dealValidationSchema}
        initialValues={deal ?? { dealName: '', lead: '', mobile: '', mobileCountryCode: DEFAULT_COUNTRY_CODE, mobileNumber: '', amount: '', status: '', type: '', startDate: '', endDate: '', assignAgent: '' }}
        onSubmit={async (values) => {
          await onSave({ ...values, mobile: combineMobileValue(values.mobileCountryCode, values.mobileNumber) });
          handleClose();
          return true;
        }}
        onCancel={handleClose}
      />
    </Drawer>
  );
};

export default AddDealDrawer;
