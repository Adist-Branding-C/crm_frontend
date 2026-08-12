import { useCallback, useState } from 'react';
import { useDeleteConfirmation } from '../../../shared/hooks/useDeleteConfirmation';
import type { CampaignLeadItem } from '../types/campaign-lead';

export function useCampaignLeadRemoveConfirm(
  removeLead: (leadId: string) => Promise<boolean>,
) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = useCallback(
    async (item: CampaignLeadItem) => {
      setIsRemoving(true);
      try {
        return await removeLead(String(item.leadId));
      } finally {
        setIsRemoving(false);
      }
    },
    [removeLead],
  );

  const confirmation = useDeleteConfirmation<CampaignLeadItem>(handleRemove);

  return { ...confirmation, isRemoving };
}
