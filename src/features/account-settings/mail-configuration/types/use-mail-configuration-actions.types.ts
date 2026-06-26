import type { FormikHelpers } from 'formik';
import type { MailConfigItem, MailConfigFormData } from '../types';

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
