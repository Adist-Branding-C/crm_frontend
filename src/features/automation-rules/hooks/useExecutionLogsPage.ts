import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAutomationData } from '../context/AutomationDataContext';
import { useToast } from '../../../shared/hooks/useToast';
import { automationRulesApi } from '../services/automationRulesApi';
import { mapApiExecutionLogToUI } from '../mappers/automationRuleMapper';
import { DEFAULT_ROWS_PER_PAGE } from '../../../shared/constants/pagination';
import type { AutomationRule, ExecutionLog, ExecutionStatus } from '../types';

export function useExecutionLogsPage() {
  const { id } = useParams<{ id: string }>();
  const { getRuleById, fetchRuleById } = useAutomationData();
  const toast = useToast();

  const [rule, setRule] = useState<AutomationRule | undefined>(() => (id ? getRuleById(id) : undefined));
  const [logs, setLogs] = useState<ExecutionLog[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [statusFilter, setStatusFilterRaw] = useState<ExecutionStatus | ''>('');
  const [fromDate, setFromDateRaw] = useState('');
  const [toDate, setToDateRaw] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [retryTarget, setRetryTarget] = useState<string | null>(null);

  // Always fetch the single-rule detail, even if a partial rule already exists from the
  // bulk list fetch — GET /automation-rules (list) doesn't eager-load `actions`, only
  // GET /automation-rules/:id does, and actions are required to resolve each log's
  // actionType (the raw ExecutionLog entity has no such field of its own).
  useEffect(() => {
    if (!id) return;
    fetchRuleById(id).then((r) => setRule(r));
  }, [id, fetchRuleById]);

  const actionTypeById = useMemo(() => {
    const map = new Map<number, ExecutionLog['actionType']>();
    rule?.actions.forEach((action) => map.set(Number(action.id), action.actionType));
    return map;
  }, [rule]);

  const loadLogs = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const response = await automationRulesApi.getExecutionLogs(Number(id), {
        pageNumber: currentPage,
        limit: rowsPerPage,
        ...(statusFilter ? { status: statusFilter } : {}),
        ...(fromDate ? { dateFrom: fromDate } : {}),
        ...(toDate ? { dateTo: toDate } : {}),
      });
      const items = response.data?.items ?? [];
      setLogs(items.map((item) => mapApiExecutionLogToUI(item, (actionId) => actionTypeById.get(actionId))));
      setTotalItems(response.data?.pagination.total ?? 0);
    } finally {
      setIsLoading(false);
    }
  }, [id, currentPage, rowsPerPage, statusFilter, fromDate, toDate, actionTypeById]);

  useEffect(() => { loadLogs(); }, [loadLogs]);

  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));

  const toggleExpanded = useCallback((logId: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(logId)) next.delete(logId); else next.add(logId);
      return next;
    });
  }, []);

  const handleRowsPerPageChange = useCallback((value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  }, []);

  const setStatusFilter = useCallback((value: ExecutionStatus | '') => {
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

  const clearFilters = useCallback(() => {
    setStatusFilterRaw('');
    setFromDateRaw('');
    setToDateRaw('');
    setCurrentPage(1);
  }, []);

  const requestRetry = useCallback((logId: string) => setRetryTarget(logId), []);
  const cancelRetry = useCallback(() => setRetryTarget(null), []);
  const confirmRetry = useCallback(async () => {
    if (!retryTarget) return;
    try {
      await automationRulesApi.retryExecutionLog(Number(retryTarget));
      toast.showToastMessage('Retry queued', 'success');
      setRetryTarget(null);
      loadLogs();
    } catch {
      toast.showToastMessage('Failed to queue retry', 'error');
    }
  }, [retryTarget, toast, loadLogs]);

  return {
    rule,
    logs,
    totalItems,
    isEmpty: !isLoading && !statusFilter && !fromDate && !toDate && totalItems === 0,
    isLoading,
    statusFilter,
    setStatusFilter,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    showFilters,
    setShowFilters,
    clearFilters,
    expandedIds,
    toggleExpanded,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    handleRowsPerPageChange,
    totalPages,
    retryTarget,
    requestRetry,
    cancelRetry,
    confirmRetry,
    toast,
  };
}
