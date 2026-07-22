import type { FormikHelpers } from 'formik';
import type { WhatsappTemplateItem, WhatsappTemplateFormData } from './whatsapp-template.types';

export interface UseWhatsappTemplateActionsParams {
  whatsappTemplate: {
    handleAddWhatsappTemplate: (values: WhatsappTemplateFormData, helpers: FormikHelpers<WhatsappTemplateFormData>) => Promise<boolean>;
    handleUpdateWhatsappTemplate: (id: number, values: WhatsappTemplateFormData, helpers: FormikHelpers<WhatsappTemplateFormData>) => Promise<boolean>;
    handleDeleteWhatsappTemplate: (id: number) => Promise<boolean>;
  };
  drawer: {
    editingItem: WhatsappTemplateItem | null;
    closeDrawer: () => void;
  };
}
