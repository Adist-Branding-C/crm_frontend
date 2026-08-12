import { useCallback } from 'react';
import { dealService } from '../services/deal.service';
import { parseErrorMessage } from '../utils/parseErrorMessage';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants/messages';
import type { DealFormData } from '../types/interface';
import type { UseDealCrudParams, UseDealCrudReturn } from '../types/hook.types';

export function useDealCrud({ pagination, showToastMessage }: UseDealCrudParams): UseDealCrudReturn {
  const handleAddDeal = useCallback(async (values: DealFormData): Promise<boolean> => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const response = await dealService.createDeal(values);
      if (response.status) {
        pagination.refresh();
        showToastMessage(SUCCESS_MESSAGES.DEAL_CREATED, 'success');
        return true;
      }
      const message = response.message || ERROR_MESSAGES.CREATE_DEAL;
      pagination.setError(message);
      showToastMessage(message, 'error');
      return false;
    } catch (err: unknown) {
      const message = parseErrorMessage(err, ERROR_MESSAGES.CREATE_DEAL);
      pagination.setError(message);
      showToastMessage(message, 'error');
      return false;
    } finally {
      pagination.setIsLoading(false);
    }
  }, [pagination, showToastMessage]);

  const handleUpdateDeal = useCallback(async (dealId: string, values: DealFormData): Promise<boolean> => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const response = await dealService.updateDeal(dealId, values);
      if (response.status) {
        pagination.refresh();
        showToastMessage(SUCCESS_MESSAGES.DEAL_UPDATED, 'success');
        return true;
      }
      const message = response.message || ERROR_MESSAGES.UPDATE_DEAL;
      pagination.setError(message);
      showToastMessage(message, 'error');
      return false;
    } catch (err: unknown) {
      const message = parseErrorMessage(err, ERROR_MESSAGES.UPDATE_DEAL);
      pagination.setError(message);
      showToastMessage(message, 'error');
      return false;
    } finally {
      pagination.setIsLoading(false);
    }
  }, [pagination, showToastMessage]);

  const handleDeleteDeal = useCallback(async (dealId: string): Promise<boolean> => {
    pagination.setError('');

    try {
      const response = await dealService.deleteDeal(dealId);
      if (response.status) {
        pagination.refresh();
        showToastMessage(SUCCESS_MESSAGES.DEAL_DELETED, 'success');
        return true;
      }
      const message = response.message || ERROR_MESSAGES.DELETE_DEAL;
      pagination.setError(message);
      showToastMessage(message, 'error');
      return false;
    } catch (err: unknown) {
      const message = parseErrorMessage(err, ERROR_MESSAGES.DELETE_DEAL);
      pagination.setError(message);
      showToastMessage(message, 'error');
      return false;
    }
  }, [pagination, showToastMessage]);

  return { handleAddDeal, handleUpdateDeal, handleDeleteDeal };
}
