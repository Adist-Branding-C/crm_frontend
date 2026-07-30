import { useCallback, useEffect, useState } from 'react';
import { whatsappTemplateService } from '../../features/account-settings/whatsapp-template/services/whatsappTemplate.service';

// Cheap existence check only (limit=1) - used to decide whether the WhatsApp
// quick-action should open the template picker at all, or fail open straight
// to a plain send. The picker itself (WhatsappTemplatePickerOverlay) owns its
// own paginated fetch once it's actually opened.
export function useActiveWhatsappTemplates() {
  const [hasTemplates, setHasTemplates] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const checkTemplates = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const response = await whatsappTemplateService.getAllWhatsappTemplates({
        status: 'Active',
        pageNumber: 1,
        limit: 1,
      });
      if (!response.status) {
        throw new Error(response.message || 'Failed to fetch WhatsApp templates');
      }
      const data = response.data as { items?: unknown[]; pagination?: { total?: number } } | unknown[] | undefined;
      const total = Array.isArray(data)
        ? data.length
        : (data?.pagination?.total ?? data?.items?.length ?? 0);
      setHasTemplates(total > 0);
    } catch {
      setHasError(true);
      setHasTemplates(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkTemplates();
  }, [checkTemplates]);

  return { hasTemplates, isLoading, hasError, refetch: checkTemplates };
}
