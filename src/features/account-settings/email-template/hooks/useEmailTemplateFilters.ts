import type { EmailTemplateItem } from '../types';

export function useEmailTemplateFilters(emailTemplateList: EmailTemplateItem[]) {
  return {
    filteredData: emailTemplateList,
  };
}
