import { useCallback, useRef, useState } from 'react';
import { dealService } from '../services/deal.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants/messages';
import type { GetDealsExportParams } from '../types/request';
import type { ToastType } from '../../../shared/types/toast.types';
import { DEFAULT_EXPORT_FILENAME } from '../constants/deal.constants';


/**
 * Reads the filename from a `Content-Disposition` header (`filename="..."` or the
 * RFC 5987 `filename*=UTF-8''...` form), falling back to the default export name
 * when the header is missing or unparsable.
 */
function extractFilename(contentDisposition?: string): string {
  if (!contentDisposition) return DEFAULT_EXPORT_FILENAME;

  const utf8Match = /filename\*=UTF-8''([^;]+)/i.exec(contentDisposition);
  if (utf8Match?.[1]) return decodeURIComponent(utf8Match[1]);

  const match = /filename="?([^"; ]+)"?/i.exec(contentDisposition);
  return match?.[1] || DEFAULT_EXPORT_FILENAME;
}

function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

/**
 * Exports the complete filtered Deal dataset (not just the current page) via the
 * dedicated Deal export endpoint, which returns an Excel (.xlsx) file, and triggers
 * a client-side download of that file.
 *
 * Used by:
 * - DealPage (Export button)
 *
 * Notes:
 * - Takes the current search text and active filters/sort (the same
 *   `Record<string, string | number>` DealPage already threads through
 *   fetchDeals/activeFiltersRef) and forwards them as query params, deliberately
 *   omitting pageNumber/limit since export always returns the whole filtered set.
 * - `isExporting` both drives the button's loading state and guards against a
 *   second export firing while one is still in flight.
 */
export function useDealExport(showToastMessage: (message: string, type: ToastType) => void) {
  const [isExporting, setIsExporting] = useState(false);
  const isExportingRef = useRef(false);

  const handleExportCSV = useCallback(async (
    search: string,
    activeFilters: Record<string, string | number>,
  ) => {
    if (isExportingRef.current) return;
    isExportingRef.current = true;
    setIsExporting(true);

    try {
      const params: GetDealsExportParams = { ...activeFilters };
      if (search) params.search = search;

      const { data: blob, headers } = await dealService.exportDeals(params);

      if (blob.type && blob.type.toLowerCase().includes('json')) {
        const text = await blob.text();
        const parsed = text ? JSON.parse(text) as { message?: string } : undefined;
        throw new Error(parsed?.message || ERROR_MESSAGES.EXPORT_DEALS);
      }

      const filename = extractFilename(headers?.['content-disposition']);
      triggerBlobDownload(blob, filename);

      showToastMessage(SUCCESS_MESSAGES.DEALS_EXPORTED, 'success');
    } catch {
      showToastMessage(ERROR_MESSAGES.EXPORT_DEALS, 'error');
    } finally {
      isExportingRef.current = false;
      setIsExporting(false);
    }
  }, [showToastMessage]);

  return { isExporting, handleExportCSV };
}
