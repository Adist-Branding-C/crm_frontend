import { useCallback, useRef, useState } from 'react';
import { taskReportService } from '../services/taskReportService';
import { triggerBlobDownload } from '../../../../shared/utils/blobDownload.util';
import type { GetTaskActivityParams } from '../types';

const DEFAULT_ERROR_MESSAGE = 'Failed to export task activity report';

/**
 * Exports the full filtered Task Activity dataset (not just the current page)
 * as an Excel file via export=true on the activity endpoint, and triggers a
 * client-side download of the returned blob through a temporary <a> element.
 *
 * Used by:
 * - TaskActivityReport (Export Excel button)
 *
 * Notes:
 * - Reuses the same filter params as the table, omitting pageNumber/limit so
 *   the whole matching set is exported.
 * - `isExporting` both drives the button's loading state and guards against a
 *   second export firing while one is still in flight.
 * - API errors (e.g. the row-count export cap) arrive as JSON blobs; the
 *   service parses them so the backend's message surfaces to the page instead
 *   of a generic failure.
 */
export function useTaskActivityExport() {
  const [isExporting, setIsExporting] = useState(false);
  const isExportingRef = useRef(false);

  const exportExcel = useCallback(
    async (params: GetTaskActivityParams): Promise<string | null> => {
      if (isExportingRef.current) return DEFAULT_ERROR_MESSAGE;
      isExportingRef.current = true;
      setIsExporting(true);

      try {
        const { blob, filename } = await taskReportService.exportActivityExcel(params);
        if (blob.type && blob.type.toLowerCase().includes('json')) {
          const text = await blob.text();
          const parsed = text ? (JSON.parse(text) as { message?: string }) : undefined;
          throw new Error(parsed?.message || DEFAULT_ERROR_MESSAGE);
        }
        triggerBlobDownload(blob, filename);
        return null;
      } catch (error) {
        if (error instanceof Error && error.message) return error.message;
        return DEFAULT_ERROR_MESSAGE;
      } finally {
        isExportingRef.current = false;
        setIsExporting(false);
      }
    },
    [],
  );

  return { isExporting, exportExcel };
}