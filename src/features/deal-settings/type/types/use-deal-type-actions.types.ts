import type { useDealType } from '../hooks/useDealType';
import type { useDealTypeDrawer } from '../hooks/useDealTypeDrawer';

export interface UseDealTypeActionsParams {
  feature: ReturnType<typeof useDealType>;
  drawer: ReturnType<typeof useDealTypeDrawer>;
  refetch: () => void;
}
