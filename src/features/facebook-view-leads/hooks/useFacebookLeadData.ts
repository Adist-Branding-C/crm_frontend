import { useState, useMemo, useCallback } from 'react';
import { sampleLeads, workflowsList } from '../constants';
import type { FacebookLead, Filters, LeadStats } from '../types';
import { FacebookLeadStatus } from '../../../shared/constants/enums';

export function useFacebookLeadData() {
  const [filters, setFilters] = useState<Filters>({
    dateFrom: '2026-04-25',
    dateTo: '2026-04-25',
    workflow: '',
    search: ''
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<FacebookLead | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleFilterChange = useCallback((field: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  }, []);

  const handleClear = useCallback(() => {
    setFilters({
      dateFrom: '2026-04-25',
      dateTo: '2026-04-25',
      workflow: '',
      search: ''
    });
    setCurrentPage(1);
    setShowClearConfirm(false);
  }, []);

  const handleViewDetails = useCallback((lead: FacebookLead) => {
    setSelectedLead(lead);
    setShowDetailsModal(true);
  }, []);

  const filteredLeads = useMemo(() => {
    let filtered = [...sampleLeads];
    if (filters.workflow) {
      filtered = filtered.filter(l => l.workflowName === filters.workflow);
    }
    if (filters.search && filters.search.length >= 3) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(l =>
        l.name.toLowerCase().includes(searchLower) ||
        l.phone.includes(searchLower)
      );
    }
    return filtered;
  }, [filters]);

  const stats: LeadStats = useMemo(() => ({
    total: filteredLeads.length,
    success: filteredLeads.filter(l => l.status === FacebookLeadStatus.SUCCESS).length,
    failed: filteredLeads.filter(l => l.status === FacebookLeadStatus.FAILED).length,
    new: filteredLeads.filter(l => l.leadStatus === 'New').length,
    duplicate: filteredLeads.filter(l => l.leadStatus === 'Duplicate').length,
    pending: filteredLeads.filter(l => l.status === FacebookLeadStatus.PENDING).length,
  }), [filteredLeads]);

  const totalPages = Math.ceil(filteredLeads.length / rowsPerPage);

  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredLeads.slice(start, start + rowsPerPage);
  }, [filteredLeads, currentPage, rowsPerPage]);

  const handleRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  }, []);

  return {
    filters, setFilters, handleFilterChange, handleClear,
    rowsPerPage, handleRowsPerPageChange,
    currentPage, setCurrentPage,
    showDetailsModal, setShowDetailsModal,
    selectedLead, setSelectedLead,
    showClearConfirm, setShowClearConfirm,
    handleViewDetails,
    filteredLeads, paginatedLeads, stats, totalPages,
  };
}
