import type { useDealStatus } from '../hooks/useDealStatus';
import type { useDealStatusDrawer } from '../hooks/useDealStatusDrawer';

export interface UseDealStatusActionsParams {
  feature: ReturnType<typeof useDealStatus>;
  drawer: ReturnType<typeof useDealStatusDrawer>;
  refetch: () => void;
}
