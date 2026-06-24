import type { EmailTemplateItem } from '../types/emailTemplate.types';

export function useEmailTemplateFilters(emailTemplateList: EmailTemplateItem[]) {
  return {
    filteredData: emailTemplateList,
  };
}
