import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';

export interface MailConfigItem {
  id: number;
  driver: string;
  host?: string;
  port: number;
  encryption: string;
  username?: string;
  password?: string;
  fromEmail?: string;
  fromName?: string;
  auth: string;
  active: boolean;
}

export interface MailConfigFormData {
  driver: string;
  host: string;
  port: string;
  encryption: string;
  username: string;
  password: string;
  fromEmail: string;
  fromName: string;
}

export interface AddMailConfigurationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: MailConfigFormData;
  onSubmit: (values: MailConfigFormData, helpers: FormikHelpers<MailConfigFormData>) => void | Promise<void>;
  isLoading: boolean;
  error: string;
  isEditing: boolean;
}

export interface UseMailConfigurationActionsParams {
  mailConfig: {
    handleAddMailConfig: (values: MailConfigFormData, helpers: FormikHelpers<MailConfigFormData>) => Promise<boolean>;
    handleUpdateMailConfig: (id: number, values: MailConfigFormData, helpers: FormikHelpers<MailConfigFormData>) => Promise<boolean>;
    handleDeleteMailConfig: (id: number) => Promise<boolean>;
  };
  drawer: {
    editingItem: MailConfigItem | null;
    closeDrawer: () => void;
  };
}
