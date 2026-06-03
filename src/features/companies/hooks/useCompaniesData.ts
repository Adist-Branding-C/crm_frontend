import { useState, useMemo, useCallback } from 'react';
import { SAMPLE_COMPANIES } from '../constants';
import type { Company, CompanyFilters, CompanyStats } from '../types';

export function useCompaniesData() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<CompanyFilters>({ plan: '', status: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [viewingCompany, setViewingCompany] = useState<Company | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const [renewalData, setRenewalData] = useState({ staffCount: '', perStaffPrice: '', plan: 'Basic' });
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [newCompany, setNewCompany] = useState({ name: '', email: '', phone: '', plan: 'Basic', status: 'active' });

  const handleRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  }, []);

  const filteredCompanies = useMemo(() => {
    let result = [...SAMPLE_COMPANIES];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q));
    }
    if (filters.plan) result = result.filter(c => c.plan === filters.plan);
    if (filters.status) result = result.filter(c => c.status === filters.status);
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key as keyof Company];
        const bVal = b[sortConfig.key as keyof Company];
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [searchQuery, filters, sortConfig]);

  const stats: CompanyStats = useMemo(() => {
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    return {
      totalCompanies: SAMPLE_COMPANIES.length,
      expiredCustomers: SAMPLE_COMPANIES.filter(c => c.status === 'expired').length,
      soonExpire: SAMPLE_COMPANIES.filter(c => c.status !== 'expired' && new Date(c.expiryDate) <= thirtyDaysFromNow).length,
      totalStaff: SAMPLE_COMPANIES.reduce((sum, c) => sum + c.staffCount, 0),
      totalRevenue: SAMPLE_COMPANIES.reduce((sum, c) => sum + c.revenue, 0),
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(filteredCompanies.length / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * rowsPerPage;
  const paginatedCompanies = filteredCompanies.slice(startIndex, startIndex + rowsPerPage);

  const handleSelectAll = useCallback(() => {
    setSelectedRows(prev => prev.length === paginatedCompanies.length ? [] : paginatedCompanies.map(c => c.id));
  }, [paginatedCompanies]);

  const handleSelectRow = useCallback((id: number) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  }, []);

  const handleSort = useCallback((key: string) => {
    setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));
  }, []);

  const handleDelete = useCallback((id: number) => {
    if (confirm('Are you sure you want to delete this company?')) console.log('Delete company:', id);
  }, []);

  const handleEdit = useCallback((company: Company) => {
    setEditingCompany(company);
    setNewCompany({ name: company.name, email: company.email, phone: company.phone, plan: company.plan, status: company.status });
    setShowAddModal(true);
  }, []);

  const handleView = useCallback((company: Company) => {
    setViewingCompany(company);
    setIsViewDrawerOpen(true);
  }, []);

  const handleAddCompany = useCallback(() => {
    setEditingCompany(null);
    setNewCompany({ name: '', email: '', phone: '', plan: 'Basic', status: 'active' });
    setShowAddModal(true);
  }, []);

  const handleSaveCompany = useCallback(() => {
    if (editingCompany) console.log('Edit company:', editingCompany.id, newCompany);
    else console.log('Add company:', newCompany);
    setShowAddModal(false);
    setEditingCompany(null);
    setNewCompany({ name: '', email: '', phone: '', plan: 'Basic', status: 'active' });
  }, [editingCompany, newCompany]);

  return {
    searchQuery, setSearchQuery,
    currentPage: safePage, setCurrentPage,
    rowsPerPage, handleRowsPerPageChange,
    sortConfig, handleSort,
    selectedRows, handleSelectAll, handleSelectRow,
    showFilters, setShowFilters,
    filters, setFilters,
    filteredCompanies, stats, totalPages, startIndex, paginatedCompanies,
    showAddModal, setShowAddModal,
    isViewDrawerOpen, setIsViewDrawerOpen,
    viewingCompany, setViewingCompany,
    activeTab, setActiveTab,
    showRenewalModal, setShowRenewalModal,
    renewalData, setRenewalData,
    editingCompany,
    newCompany, setNewCompany,
    handleDelete, handleEdit, handleView, handleAddCompany, handleSaveCompany,
  };
}
