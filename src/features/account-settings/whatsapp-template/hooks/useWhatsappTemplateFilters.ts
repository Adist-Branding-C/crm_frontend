import type { WhatsappTemplateItem } from '../types';

export function useWhatsappTemplateFilters(whatsappTemplateList: WhatsappTemplateItem[]) {
  return {
    filteredData: whatsappTemplateList,
  };
}
