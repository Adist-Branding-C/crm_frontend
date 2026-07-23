import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { buildAdditionalFieldsPayload } from '../utils/additionalFields';
import { combineMobileValue } from '../utils/mobileFormat';
import type { DealFormData as DealDrawerFormData } from '../../../shared/types/drawers';
import type { DealFormData } from '../types/interface';
import type { UseDealFormSubmitParams, UseDealFormSubmitReturn } from '../types/hook.types';

export function useDealFormSubmit({ editingItem, closeDrawer, handleAddDeal, handleUpdateDeal, dealAdditionalFieldDefs }: UseDealFormSubmitParams): UseDealFormSubmitReturn {
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
      mobile: combineMobileValue(values.mobileCountryCode, values.mobileNumber),
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
      mobile: combineMobileValue(values.mobileCountryCode, values.mobileNumber),
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
