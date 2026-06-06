import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { AgentFormData, DesignationOption } from './agent.types';

export interface AddAgentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: AgentFormData;
  onSubmit: (values: AgentFormData, helpers: FormikHelpers<AgentFormData>) => void | Promise<void>;
  isLoading: boolean;
  error: string;
  isEditing: boolean;
  designationOptions: DesignationOption[];
  onFetchDesignations: () => void;
}
