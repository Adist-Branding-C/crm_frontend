import type { WhatsappTemplateItem } from '../types/whatsapp-template.types';

export function useWhatsappTemplateFilters(whatsappTemplateList: WhatsappTemplateItem[]) {
  return {
    filteredData: whatsappTemplateList,
  };
}
