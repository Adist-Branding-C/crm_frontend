import { useState, useCallback } from 'react';
import { spotlightService } from '../services/SpotlightService';
import { exportToCsv } from '../../../shared/helpers/csvExport.helper';
import { getErrorMessage } from '../../../shared/utils/error';
import { SPOTLIGHT_CSV_COLUMNS } from '../constants';
import type { SpotlightRequestParams } from '../types';

/**
 * Exports the current (unpaginated) Spotlight lead set to CSV.
 *
 * Used by:
 * - useSpotlightData.
 */
export function useSpotlightExport(onError: (message: string) => void) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = useCallback(
    async (params: Partial<SpotlightRequestParams>) => {
      if (isExporting) return;
      setIsExporting(true);
      try {
        const response = await spotlightService.exportLeads(params);
        if (response.status && response.data) {
          exportToCsv(
            response.data,
            SPOTLIGHT_CSV_COLUMNS,
            `spotlight_leads_${new Date().toISOString().slice(0, 10)}.csv`,
          );
        } else {
          onError(response.message || 'Failed to export leads');
        }
      } catch (err: unknown) {
        onError(getErrorMessage(err, 'Failed to export leads'));
      } finally {
        setIsExporting(false);
      }
    },
    [onError, isExporting],
  );

  return { isExporting, handleExport };
}
