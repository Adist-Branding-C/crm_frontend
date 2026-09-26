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
import { useLeadAssigneeChange } from '../../../features/enquiries/hooks/useLeadAssigneeChange';
import ReassignLeadTasksModal from '../../../features/enquiries/components/ReassignLeadTasksModal';
import { SUCCESS_MESSAGES } from '../../../features/enquiries/constants/messages';
import './AddLeadDrawer.css';

const AddLeadDrawer = ({ isOpen, onClose, onSaved, lead, draftId: initialDraftId }: AddLeadDrawerProps) => {
  const isEditing = !!lead;
  const { showToast, toastType, toastMessage, showToastMessage, setShowToast } = useToast();
  const assigneeChange = useLeadAssigneeChange();

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
    let reassignedTaskCount: number | undefined;
    try {
      if (isEditing && lead) {
        const assignedToField = previewData.sections
          .flatMap((section) => section.fields)
          .find((field) => field.label === 'Assigned To')?.value;
        const toName = typeof assignedToField === 'string' ? assignedToField : undefined;
        const payload = await assigneeChange.resolvePayload(lead.leadId, previewData.payload, {
          fromName: lead.assignedTo,
          toName,
        });
        if (!payload) return;
        const res = await leadDataService.updateLead(lead.leadId, payload);
        reassignedTaskCount = res.data?.reassignedTaskCount;
      } else {
        await leadDataService.createLead(previewData.payload);
      }

      // Clear draft on successful save
      if (draftId) {
        draftService.deleteDraft(draftId);
      }

      onSaved?.(isEditing ? 'updated' : 'created');
      handleClose();
      showToastMessage(
        reassignedTaskCount
          ? SUCCESS_MESSAGES.LEAD_UPDATED_WITH_TASKS(reassignedTaskCount)
          : `Lead successfully ${isEditing ? 'updated' : 'created'}.`,
        'success',
      );
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
        <ReassignLeadTasksModal {...assigneeChange.modalProps} />
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
          initialDraftValues={previewData?.formValues ?? loadedDraftValues}
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
