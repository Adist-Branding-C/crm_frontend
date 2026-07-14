import { useCallback } from 'react';
import { dealService } from '../services/deal.service';
import { parseErrorMessage } from '../utils/parseErrorMessage';
import type { DealFormData, UseDealCrudParams } from '../types';

export function useDealCrud({ pagination }: UseDealCrudParams) {
  const handleAddDeal = useCallback(async (values: DealFormData): Promise<boolean> => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const response = await dealService.createDeal(values);
      if (response.status) {
        pagination.refresh();
        return true;
      }
      pagination.setError(response.message || 'Failed to add deal');
      return false;
    } catch (err: unknown) {
      pagination.setError(parseErrorMessage(err, 'Failed to add deal'));
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
      pagination.setError(response.message || 'Failed to update deal');
      return false;
    } catch (err: unknown) {
      pagination.setError(parseErrorMessage(err, 'Failed to update deal'));
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
      pagination.setError(response.message || 'Failed to delete deal');
      return false;
    } catch (err: unknown) {
      pagination.setError(parseErrorMessage(err, 'Failed to delete deal'));
      return false;
    }
  }, [pagination]);

  return { handleAddDeal, handleUpdateDeal, handleDeleteDeal };
}
