import { useTableData } from './useTableData';
import { whatsappTemplateService } from '../../features/account-settings/whatsapp-template/services/whatsappTemplate.service';
import type { WhatsappTemplateItem } from '../../features/account-settings/whatsapp-template/types/whatsapp-template.types';

const PICKER_ROWS_PER_PAGE = 10;

export function useWhatsappTemplatePicker() {
  return useTableData<WhatsappTemplateItem>({
    initialLimit: PICKER_ROWS_PER_PAGE,
    fetchFn: async (params) => {
      const response = await whatsappTemplateService.getAllWhatsappTemplates({
        ...params,
        status: 'Active',
      } as unknown as Record<string, string | number | undefined>);
      if (!response.status) {
        throw new Error(response.message || 'Failed to fetch WhatsApp templates');
      }
      const data = response.data as { items?: WhatsappTemplateItem[]; pagination?: { total?: number } } | WhatsappTemplateItem[] | undefined;
      if (Array.isArray(data)) {
        return { items: data, total: data.length };
      }
      const items = data?.items ?? [];
      const total = data?.pagination?.total ?? items.length;
      return { items, total };
    },
  });
}
