import type { useDealAdditionalField } from '../hooks/useDealAdditionalField';
import type { useDealAdditionalFieldDrawer } from '../hooks/useDealAdditionalFieldDrawer';

export interface UseDealAdditionalFieldActionsParams {
  feature: ReturnType<typeof useDealAdditionalField>;
  drawer: ReturnType<typeof useDealAdditionalFieldDrawer>;
  refetch: () => void;
}
