import type { FormikHelpers } from 'formik';
import type { AgentItem, AgentFormData } from './agent.types';

export interface UseAgentActionsParams {
  agent: {
    handleAddAgent: (values: AgentFormData, helpers: FormikHelpers<AgentFormData>) => Promise<boolean>;
    handleUpdateAgent: (staffId: string, values: AgentFormData, helpers: FormikHelpers<AgentFormData>) => Promise<boolean>;
    handleDeleteAgent: (staffId: string) => Promise<boolean>;
  };
  drawer: {
    editingItem: AgentItem | null;
    closeDrawer: () => void;
  };
}
