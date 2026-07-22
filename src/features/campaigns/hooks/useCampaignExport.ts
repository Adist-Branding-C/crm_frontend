import { useCallback } from 'react';
import { exportToCsv } from '../../../shared/helpers/csvExport.helper';
import { CAMPAIGN_CSV_COLUMNS } from '../constants';
import type { Campaign } from '../types';

export function useCampaignExport(campaignList: Campaign[]) {
  const handleExportCSV = useCallback(() => {
    exportToCsv(campaignList, CAMPAIGN_CSV_COLUMNS, 'campaigns.csv');
  }, [campaignList]);

  return { handleExportCSV };
}
