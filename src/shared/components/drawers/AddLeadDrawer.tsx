import React, { useState, useEffect } from 'react';
import Drawer from './Drawer';
import LeadForm, { PreviewData } from '../../../features/enquiries/components/LeadForm';
import PreviewCanvas from '../preview/PreviewCanvas';
import type { AddLeadDrawerProps } from '../../types/drawers';
import { leadDataService } from '../../../features/enquiries/services/leadDataService';
import { draftService } from '../../services/draftService';
import { useToast } from '../../hooks/useToast';
import ToastNotification from '../ToastNotification';
import { getErrorMessage } from '../../../shared/utils/error';
import './AddLeadDrawer.css';

const AddLeadDrawer = ({ isOpen, onClose, onSaved, lead, draftId: initialDraftId }: AddLeadDrawerProps) => {
  const isEditing = !!lead;
  const { showToast, toastType, toastMessage, showToastMessage, setShowToast } = useToast();

  // State for toggling between form and preview
  const [view, setView] = useState<'form' | 'preview'>('form');
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [draftId, setDraftId] = useState<string | null>(initialDraftId || null);
  const [loadedDraftValues, setLoadedDraftValues] = useState<any>(null);

  useEffect(() => {
    if (!isOpen) {
      setLoadedDraftValues(null);
      setDraftId(null);
      return;
    }

    if (initialDraftId) {
      const draft = draftService.getDrafts('lead').find(d => d.id === initialDraftId);
      if (draft) {
        setLoadedDraftValues(draft.payload);
        setDraftId(draft.id);
      }
      return;
    }

    setDraftId(prev => prev ?? crypto.randomUUID());
  }, [initialDraftId, isOpen]);
  const [isSaving, setIsSaving] = useState(false);

  const handlePreviewRequest = (data: PreviewData) => {
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
      if (isEditing && lead) {
        await leadDataService.updateLead(lead.leadId, previewData.payload);
      } else {
        await leadDataService.createLead(previewData.payload);
      }

      // Clear draft on successful save
      if (draftId) {
        draftService.deleteDraft(draftId);
      }

      onSaved?.(isEditing ? 'updated' : 'created');
      handleClose();
      showToastMessage(`Lead successfully ${isEditing ? 'updated' : 'created'}.`, 'success');
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Failed to save lead');
      showToastMessage(errorMessage, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (view === 'preview' && previewData) {
    return (
      <>
        <PreviewCanvas
          isOpen={isOpen}
          title={isEditing ? 'Preview Edit' : 'Preview Lead'}
          subtitle="Review the details before saving"
          sections={previewData.sections}
          isSaving={isSaving}
          error={toastType === 'error' ? toastMessage : null}
          onClose={handleClose}
          onEdit={handleEdit}
          onSave={handleSave}
        />
        <ToastNotification isVisible={showToast} type={toastType} message={toastMessage} onDismiss={() => setShowToast(false)} />
      </>
    );
  }

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={handleClose}
        title={isEditing ? 'Edit Lead' : 'Add New Lead'}
        overlayClassName="drawer-overlay"
        panelClassName="drawer-panel"
      >
        <LeadForm
          lead={lead}
          draftId={draftId}
          initialDraftValues={loadedDraftValues || previewData?.formValues}
          onDraftSaved={setDraftId}
          onSaved={onSaved}
          onPreviewRequest={handlePreviewRequest}
          onClose={handleClose}
        />
      </Drawer>
      <ToastNotification isVisible={showToast} type={toastType} message={toastMessage} onDismiss={() => setShowToast(false)} />
    </>
  );
};

export default AddLeadDrawer;
