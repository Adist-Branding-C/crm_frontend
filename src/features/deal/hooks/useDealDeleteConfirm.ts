import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../shared/hooks/useDeleteConfirmation';
import type { DealItem } from '../types/interface';

export function useDealDeleteConfirm(deleteDeal: (dealId: string) => Promise<boolean>) {
  const handleDelete = useCallback(
    (item: DealItem) => (item.dealId ? deleteDeal(item.dealId) : Promise.resolve(false)),
    [deleteDeal],
  );
  return useDeleteConfirmation<DealItem>(handleDelete);
}
