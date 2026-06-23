import { useState, useCallback, useEffect } from 'react';
import { useCampaign } from './useCampaign';
import { useCampaignDrawer } from './useCampaignDrawer';
import { useCampaignForm } from './useCampaignForm';
import { useCampaignDropdown } from './useCampaignDropdown';
import { useCampaignTypeFilter } from './useCampaignTypeFilter';
import { useCampaignFilters } from './useCampaignFilters';
import { useCampaignActions } from './useCampaignActions';
import { CAMPAIGN_TYPES } from '../constants/campaign.constants';
import type { Campaign } from '../types/campaign.types';

export function useCampaignPage() {
  const campaign = useCampaign();
  const drawer = useCampaignDrawer();
  const form = useCampaignForm();
  const dropdown = useCampaignDropdown();
  const typeFilter = useCampaignTypeFilter();
  const filters = useCampaignFilters();
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });

  const buildParams = useCallback(
    () => {
      const params = filters.buildParams(filters.currentPage, filters.rowsPerPage, filters.debouncedSearch);
      if (sortConfig.key) {
        params.sortBy = sortConfig.key;
        params.sortOrder = sortConfig.direction;
      }
      return params;
    },
    [filters.currentPage, filters.rowsPerPage, filters.debouncedSearch, filters.buildParams, sortConfig]
  );

  const actions = useCampaignActions({
    campaign: { ...campaign, fetchCampaigns: campaign.fetchCampaigns },
    drawer: { ...drawer, validate: form.validate, buildPayload: form.buildPayload },
    filters: { actionMenuOpen: dropdown.actionMenuOpen, setActionMenuOpen: dropdown.setActionMenuOpen },
    buildParams,
  });

  const fetchCampaigns = useCallback(() => {
    campaign.fetchCampaigns(buildParams());
  }, [campaign.fetchCampaigns, buildParams]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const handleOpenAdd = useCallback(() => {
    drawer.openAdd();
    form.resetForm();
    typeFilter.setSelectedType('');
  }, [drawer, form, typeFilter]);

  const handleOpenEdit = useCallback((c: Campaign) => {
    drawer.openEdit(c);
    typeFilter.setSelectedType(c.type);
    form.populateForm({
      type: c.type,
      name: c.type === CAMPAIGN_TYPES.LEAD_CAMPAIGN ? c.name : '',
      startDate: c.startDate ? c.startDate.split('T')[0] ?? '' : '',
      endDate: c.endDate ? c.endDate.split('T')[0] ?? '' : '',
      description: c.description || '',
      poolName: c.type === CAMPAIGN_TYPES.DATA_POOL ? c.name : (c.poolName || ''),
      poolAgents: c.poolAgents || [],
      filterBy: c.filterBy || '',
      sortBy: c.sortBy || '',
    });
  }, [drawer, form, typeFilter]);

  const handleClose = useCallback(() => {
    drawer.close();
    form.resetForm();
  }, [drawer, form]);

  const handleTypeChange = useCallback((type: string) => {
    form.handleTypeChange(type);
    typeFilter.setSelectedType(type);
  }, [form, typeFilter]);

  const handleSort = useCallback((key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const totalPages = Math.ceil(campaign.totalItems / filters.rowsPerPage) || 1;
  const startIndex = (filters.currentPage - 1) * filters.rowsPerPage;

  return {
    campaigns: campaign.campaigns,
    totalItems: campaign.totalItems,
    loading: campaign.loading,
    search: filters.search,
    currentPage: filters.currentPage,
    rowsPerPage: filters.rowsPerPage,
    totalPages,
    startIndex,
    sortConfig,
    actionMenuOpen: dropdown.actionMenuOpen,
    isOpen: drawer.isOpen,
    mode: drawer.mode,
    formData: form.formData,
    errors: form.errors,
    agents: typeFilter.agents,
    isLoadingAgents: typeFilter.isLoading,
    handleSearchChange: filters.handleSearchChange,
    handleRowsPerPageChange: filters.handleRowsPerPageChange,
    handleSort,
    setCurrentPage: filters.setCurrentPage,
    setActionMenuOpen: dropdown.setActionMenuOpen,
    handleDelete: actions.handleDelete,
    handleExport: actions.handleExport,
    handleSubmit: actions.handleSubmit,
    successMessage: actions.successMessage,
    fetchCampaigns,
    openAdd: handleOpenAdd,
    openEdit: handleOpenEdit,
    close: handleClose,
    handleFieldChange: form.handleFieldChange,
    handleTypeChange,
    handleAgentChange: form.handleAgentChange,
  };
}
