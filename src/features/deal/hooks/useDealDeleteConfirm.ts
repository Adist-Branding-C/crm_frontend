import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../shared/hooks/useDeleteConfirmation';
import type { DealItem } from '../types';

export function useDealDeleteConfirm(handleDeleteDeal: (dealId: string) => Promise<boolean>) {
  const deleteDeal = useCallback(
    (item: DealItem) => (item.dealId ? handleDeleteDeal(item.dealId) : Promise.resolve(false)),
    [handleDeleteDeal],
  );
  return useDeleteConfirmation<DealItem>(deleteDeal);
}
