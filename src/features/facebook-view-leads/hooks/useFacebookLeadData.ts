import { useCallback, useEffect, useState } from 'react';
import { facebookApi } from '../../facebook-connect/services/facebook.service';
import type { FacebookLead, Filters, LeadStats, Workflow } from '../types';

const DEFAULT_FILTERS: Filters = { dateFrom: '', dateTo: '', workflow: '', status: '' };
const EMPTY_STATS: LeadStats = { total: 0, processed: 0, failed: 0, processing: 0, received: 0 };

export function useFacebookLeadData() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<FacebookLead | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const [leads, setLeads] = useState<FacebookLead[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState<LeadStats>(EMPTY_STATS);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    facebookApi.listWorkflows().then((response) => {
      setWorkflows((response.data ?? []).map((w) => ({ id: w.id, name: w.name })));
    });
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await facebookApi.getLeads({
        status: filters.status || undefined,
        workflowId: filters.workflow || undefined,
        from: filters.dateFrom || undefined,
        to: filters.dateTo || undefined,
        pageNumber: currentPage,
        limit: rowsPerPage,
      });
      const data = response.data;
      const workflowNameById = new Map(workflows.map((w) => [w.id, w.name]));
      setLeads(
        (data?.items ?? []).map((lead) => ({
          id: lead.id,
          leadgenId: lead.leadgenId,
          workflowId: lead.workflowId,
          workflowName: (lead.workflowId && workflowNameById.get(lead.workflowId)) || '-',
          status: lead.status,
          leadId: lead.leadId,
          errorCode: lead.errorCode,
          errorMessage: lead.errorMessage,
          rawFieldData: lead.rawFieldData,
          createdAt: lead.createdAt,
        })),
      );
      setTotalItems(data?.pagination.total ?? 0);
      setTotalPages(data?.pagination.total_pages ?? 1);
      setStats({
        total: data?.pagination.total ?? 0,
        processed: data?.statistics.processed ?? 0,
        failed: data?.statistics.failed ?? 0,
        processing: data?.statistics.processing ?? 0,
        received: data?.statistics.received ?? 0,
      });
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, currentPage, rowsPerPage, workflows]);

  useEffect(() => {
    load();
  }, [load]);

  const handleFilterChange = useCallback((field: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  }, []);

  const handleClear = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
    setShowClearConfirm(false);
  }, []);

  const handleViewDetails = useCallback((lead: FacebookLead) => {
    setSelectedLead(lead);
    setShowDetailsModal(true);
  }, []);

  const handleRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  }, []);

  return {
    filters,
    handleFilterChange,
    handleClear,
    rowsPerPage,
    handleRowsPerPageChange,
    currentPage,
    setCurrentPage,
    showDetailsModal,
    setShowDetailsModal,
    selectedLead,
    setSelectedLead,
    showClearConfirm,
    setShowClearConfirm,
    handleViewDetails,
    leads,
    totalItems,
    totalPages,
    stats,
    workflows,
    loading,
  };
}
