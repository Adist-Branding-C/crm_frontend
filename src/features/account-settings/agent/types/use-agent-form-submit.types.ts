import type { FormikHelpers } from 'formik';
import type { AgentItem, AgentFormData } from './agent.types';

export interface UseAgentFormSubmitParams {
  editingItem: AgentItem | null;
  closeDrawer: () => void;
  handleAddAgent: (values: AgentFormData, helpers: FormikHelpers<AgentFormData>) => Promise<boolean>;
  handleUpdateAgent: (staffId: string, values: AgentFormData, helpers: FormikHelpers<AgentFormData>) => Promise<boolean>;
}
