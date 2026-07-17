import { useCallback } from 'react';
import { dealService } from '../services/deal.service';
import { parseErrorMessage } from '../utils/parseErrorMessage';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants/messages';
import type { DealFormData } from '../types/interface';
import type { UseDealCrudParams, UseDealCrudReturn } from '../types/hook.types';

export function useDealCrud({ pagination }: UseDealCrudParams): UseDealCrudReturn {
  const handleAddDeal = useCallback(async (values: DealFormData): Promise<boolean> => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const response = await dealService.createDeal(values);
      if (response.status) {
        pagination.refresh();
        return true;
      }
      pagination.setError(response.message || ERROR_MESSAGES.CREATE_DEAL);
      return false;
    } catch (err: unknown) {
      pagination.setError(parseErrorMessage(err, ERROR_MESSAGES.CREATE_DEAL));
      return false;
    } finally {
      pagination.setIsLoading(false);
    }
  }, [pagination]);

  const handleUpdateDeal = useCallback(async (dealId: string, values: DealFormData): Promise<boolean> => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const response = await dealService.updateDeal(dealId, values);
      if (response.status) {
        pagination.refresh();
        return true;
      }
      pagination.setError(response.message || ERROR_MESSAGES.UPDATE_DEAL);
      return false;
    } catch (err: unknown) {
      pagination.setError(parseErrorMessage(err, ERROR_MESSAGES.UPDATE_DEAL));
      return false;
    } finally {
      pagination.setIsLoading(false);
    }
  }, [pagination]);

  const handleDeleteDeal = useCallback(async (dealId: string): Promise<boolean> => {
    pagination.setError('');

    try {
      const response = await dealService.deleteDeal(dealId);
      if (response.status) {
        pagination.refresh();
        return true;
      }
      pagination.setError(response.message || ERROR_MESSAGES.DELETE_DEAL);
      return false;
    } catch (err: unknown) {
      pagination.setError(parseErrorMessage(err, ERROR_MESSAGES.DELETE_DEAL));
      return false;
    }
  }, [pagination]);

  return { handleAddDeal, handleUpdateDeal, handleDeleteDeal };
}
