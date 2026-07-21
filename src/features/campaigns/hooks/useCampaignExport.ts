import { useCallback, useState } from 'react';
import { exportToCsv } from '../../../shared/helpers/csvExport.helper';
import { CAMPAIGN_CSV_COLUMNS } from '../constants';
import { campaignApiService } from '../services';
import type { Campaign } from '../types';


export function useCampaignExport(searchQuery?: string) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const handleExportCSV = useCallback(async () => {
    setExportError(null);
    setIsExporting(true);
    try {
      const blob = await campaignApiService.export(
        searchQuery ? { search: searchQuery } : undefined,
      );
      const items: Campaign[] = JSON.parse(await blob.text());
      const rows = items.map((item, index) => ({ ...item, slNo: index + 1 }));
      exportToCsv(rows, CAMPAIGN_CSV_COLUMNS, 'campaigns.csv');
    } catch {
      setExportError('Failed to export campaigns. Please try again.');
    } finally {
      setIsExporting(false);
    }
  }, [searchQuery]);

  return { handleExportCSV, isExporting, exportError };
}
