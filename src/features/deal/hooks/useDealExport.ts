import { useCallback } from 'react';
import { exportToCsv } from '../../../shared/helpers/csvExport.helper';
import { DEAL_CSV_COLUMNS } from '../constants/deal.constants';
import type { DealItem } from '../types';

export function useDealExport(dealList: DealItem[]) {
  const handleExportCSV = useCallback(() => {
    exportToCsv(dealList, DEAL_CSV_COLUMNS, 'deals.csv');
  }, [dealList]);

  return { handleExportCSV };
}
