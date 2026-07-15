import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { buildAdditionalFieldsPayload } from '../utils/additionalFields';
import type { DealFormData as DealDrawerFormData } from '../../../shared/types/drawers';
import type { DealFormData, UseDealFormSubmitParams } from '../types';

/**
 * Submit handlers for the Deal add/edit Formik form.
 *
 * Follows the same pattern as useCampaignSubmitHandlers:
 * - Receives FormikHelpers so it can call setSubmitting(false) in the finally block.
 * - Builds an ID-only payload from the form values before calling the CRUD handlers.
 * - On success the drawer is closed by the caller; on failure the page-level error
 *   is set by the CRUD handler.
 */
export function useDealFormSubmit({ editingItem, closeDrawer, handleAddDeal, handleUpdateDeal, dealAdditionalFieldDefs }: UseDealFormSubmitParams) {
  const handleAddSubmit = useCallback(async (
    values: DealDrawerFormData,
    { setSubmitting }: FormikHelpers<DealDrawerFormData>,
  ): Promise<boolean> => {
    const additionalFields = buildAdditionalFieldsPayload(values as unknown as Record<string, string>, dealAdditionalFieldDefs);
    const payload = {
      dealName: values.dealName,
      leadId: values.leadId,
      agentId: values.agentId,
      assignedTo: values.agentId,
      assignAgent: values.agentId,
      statusId: values.statusId,
      typeId: values.typeId,
      mobile: values.mobile,
      amount: values.amount,
      startDate: values.startDate,
      endDate: values.endDate,
      ...(additionalFields.length > 0 ? { additionalFields } : {}),
    };

    try {
      const featureValues = payload as unknown as DealFormData;
      const success = await handleAddDeal(featureValues);
      if (success) closeDrawer();
      return success;
    } finally {
      setSubmitting(false);
    }
  }, [handleAddDeal, closeDrawer, dealAdditionalFieldDefs]);

  const handleEditSubmit = useCallback(async (
    values: DealDrawerFormData,
    { setSubmitting }: FormikHelpers<DealDrawerFormData>,
  ): Promise<boolean> => {
    if (!editingItem?.dealId) return false;

    const additionalFields = buildAdditionalFieldsPayload(values as unknown as Record<string, string>, dealAdditionalFieldDefs);
    const payload = {
      dealName: values.dealName,
      leadId: values.leadId,
      agentId: values.agentId,
      assignedTo: values.agentId,
      assignAgent: values.agentId,
      statusId: values.statusId,
      typeId: values.typeId,
      mobile: values.mobile,
      amount: values.amount,
      startDate: values.startDate,
      endDate: values.endDate,
      ...(additionalFields.length > 0 ? { additionalFields } : {}),
    };

    try {
      const featureValues = payload as unknown as DealFormData;
      const success = await handleUpdateDeal(editingItem.dealId, featureValues);
      if (success) closeDrawer();
      return success;
    } finally {
      setSubmitting(false);
    }
  }, [editingItem, handleUpdateDeal, closeDrawer, dealAdditionalFieldDefs]);

  return { handleAddSubmit, handleEditSubmit };
}
