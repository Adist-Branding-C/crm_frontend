import { useCallback, useEffect, useState } from 'react';
import { useAutomationData } from '../context/AutomationDataContext';
import { automationRulesApi } from '../services/automationRulesApi';
import { mapApiWebhookHistoryToUI } from '../mappers/automationRuleMapper';
import { DEFAULT_ROWS_PER_PAGE } from '../../../shared/constants/pagination';
import type { WebhookAttemptStatus, WebhookHistoryEntry } from '../types';

export function useWebhookHistoryPage() {
  const { webhookEndpoints } = useAutomationData();

  const [entries, setEntries] = useState<WebhookHistoryEntry[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [statusFilter, setStatusFilterRaw] = useState<WebhookAttemptStatus | ''>('');
  const [fromDate, setFromDateRaw] = useState('');
  const [toDate, setToDateRaw] = useState('');
  const [endpointFilter, setEndpointFilterRaw] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  const loadEntries = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await automationRulesApi.getWebhookHistoryList({
        pageNumber: currentPage,
        limit: rowsPerPage,
        ...(statusFilter ? { status: statusFilter } : {}),
        ...(fromDate ? { dateFrom: fromDate } : {}),
        ...(toDate ? { dateTo: toDate } : {}),
        ...(endpointFilter ? { webhookEndpointId: Number(endpointFilter) } : {}),
      });
      const items = response.data?.items ?? [];
      setEntries(items.map(mapApiWebhookHistoryToUI));
      setTotalItems(response.data?.pagination.total ?? 0);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, rowsPerPage, statusFilter, fromDate, toDate, endpointFilter]);

  useEffect(() => { loadEntries(); }, [loadEntries]);

  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));

  const handleRowsPerPageChange = useCallback((value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  }, []);

  const setStatusFilter = useCallback((value: WebhookAttemptStatus | '') => {
    setStatusFilterRaw(value);
    setCurrentPage(1);
  }, []);
  const setFromDate = useCallback((value: string) => {
    setFromDateRaw(value);
    setCurrentPage(1);
  }, []);
  const setToDate = useCallback((value: string) => {
    setToDateRaw(value);
    setCurrentPage(1);
  }, []);
  const setEndpointFilter = useCallback((value: string) => {
    setEndpointFilterRaw(value);
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setStatusFilterRaw('');
    setFromDateRaw('');
    setToDateRaw('');
    setEndpointFilterRaw('');
    setCurrentPage(1);
  }, []);

  return {
    entries,
    totalItems,
    isEmpty: !isLoading && !statusFilter && !fromDate && !toDate && !endpointFilter && totalItems === 0,
    isLoading,
    statusFilter,
    setStatusFilter,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    endpointFilter,
    setEndpointFilter,
    endpointOptions: webhookEndpoints,
    showFilters,
    setShowFilters,
    clearFilters,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    handleRowsPerPageChange,
    totalPages,
  };
}
