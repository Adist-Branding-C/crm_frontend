import { useState, useMemo } from 'react';
import { SAMPLE_CAMPAIGNS } from '../constants';
import type { Campaign, CampaignFilters } from '../types';

export const useCampaignsData = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>(SAMPLE_CAMPAIGNS);
  const [filters, setFilters] = useState<CampaignFilters>({
    type: '',
    createdBy: '',
    dateRange: { start: '', end: '' },
  });

  const filteredData = useMemo(() => {
    let data = [...campaigns];
    if (searchQuery) {
      data = data.filter(
        item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filters.type) data = data.filter(item => item.type === filters.type);
    if (filters.createdBy) data = data.filter(item => item.createdBy === filters.createdBy);
    if (sortConfig.key) {
      data.sort((a, b) => {
        const aVal = a[sortConfig.key as keyof Campaign];
        const bVal = b[sortConfig.key as keyof Campaign];
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [searchQuery, filters, sortConfig, campaigns]);

  const stats = useMemo(() => ({
    total: filteredData.length,
    active: filteredData.filter(c => c.completedPercent < 100).length,
    completed: filteredData.filter(c => c.completedPercent === 100).length,
  }), [filteredData]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleSort = (key: string) => setSortConfig(prev => ({
    key,
    direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
  }));

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedRows(paginatedData.map(item => item.id));
    else setSelectedRows([]);
  };

  const handleSelectRow = (id: number) => setSelectedRows(prev =>
    prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
  );

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({ type: '', createdBy: '', dateRange: { start: '', end: '' } });
    setShowFilters(false);
  };

  const handleDeleteCampaign = (id: number) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
    setActionMenuOpen(null);
  };

  const handleExportCSV = () => {
    const headers = ['Sl No', 'Name', 'Type', 'Total Tasks', 'Completed Tasks', 'Completed %', 'Created By', 'Created At'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(c =>
        [c.slNo, `"${c.name}"`, c.type, c.totalTasks, c.completedTasks, c.completedPercent + '%', c.createdBy, c.createdAt].join(',')
      ),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'campaigns.csv';
    link.click();
  };

  const handleDrawerSave = (data: any) => {
    setCampaigns(prev => [...prev, { ...data, id: Date.now(), slNo: prev.length + 1 }]);
  };

  const handleDrawerClose = () => setIsDrawerOpen(false);
  const handleDrawerOpen = () => setIsDrawerOpen(true);

  return {
    searchQuery,
    setSearchQuery,
    showFilters,
    setShowFilters,
    selectedRows,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    sortConfig,
    actionMenuOpen,
    setActionMenuOpen,
    isDrawerOpen,
    showSortDropdown,
    setShowSortDropdown,
    setRowsPerPage,
    filters,
    setFilters,
    filteredData,
    stats,
    totalPages,
    startIndex,
    paginatedData,
    handleSort,
    handleSelectAll,
    handleSelectRow,
    handleRowsPerPageChange,
    clearFilters,
    handleDeleteCampaign,
    handleExportCSV,
    handleDrawerSave,
    handleDrawerClose,
    handleDrawerOpen,
  };
};
