import { useState, useMemo, useCallback } from 'react';
import { useTablePagination } from '../../../shared/hooks/useTablePagination';
import { useTableSelection } from '../../../shared/hooks/useTableSelection';
import { useSearchFilter } from '../../../shared/hooks/useSearchFilter';
import { SAMPLE_SPOTLIGHT_DATA, INITIAL_FILTERS } from '../constants';
import type { SpotlightLead, SpotlightFilters } from '../types';
import { SortDirection } from '../../../shared/constants/enums/sortDirection';

export function useSpotlightData() {
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: SortDirection }>({ key: null, direction: SortDirection.ASC });
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [selectedLead, setSelectedLead] = useState<SpotlightLead | null>(null);
  const [filters, setFilters] = useState<SpotlightFilters>(INITIAL_FILTERS);

  const { filteredData: searchedData, setQuery: setSearchQuery, query: searchQuery } = useSearchFilter(
    SAMPLE_SPOTLIGHT_DATA,
    ['name', 'phone', 'assignedTo' as keyof SpotlightLead]
  );

  const filteredByFilters = useMemo(() => {
    let data = searchedData;
    if (filters.enquirySource) data = data.filter(item => item.source === filters.enquirySource);
    if (filters.enquiryPurpose) data = data.filter(item => item.purpose === filters.enquiryPurpose);
    if (filters.leadStatus) data = data.filter(item => item.status === filters.leadStatus);
    if (filters.assignedTo) data = data.filter(item => item.assignedTo === filters.assignedTo);
    if (filters.leadType) data = data.filter(item => item.type === filters.leadType);
    return data;
  }, [searchedData, filters]);

  const filteredData = useMemo(() => {
    let data = [...filteredByFilters];
    if (sortConfig.key) {
      data.sort((a, b) => {
        const aVal = a[sortConfig.key as keyof SpotlightLead];
        const bVal = b[sortConfig.key as keyof SpotlightLead];
        if (aVal < bVal) return sortConfig.direction === SortDirection.ASC ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === SortDirection.ASC ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [filteredByFilters, sortConfig]);

  const { currentPage, setCurrentPage, rowsPerPage, handleRowsPerPageChange, totalPages, startIndex, paginatedData } =
    useTablePagination(filteredData, 10);

  const paginatedIds = useMemo(
    () => paginatedData.map(item => item.id),
    [paginatedData]
  );

  const { selectedIds, handleSelectAll, handleSelectRow } = useTableSelection();

  const handleSort = useCallback((key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC
    }));
  }, []);

  const handleSortDirection = useCallback((key: string, direction: SortDirection) => {
    setSortConfig({ key, direction });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setShowFilters(false);
  }, []);

  return {
    searchQuery, setSearchQuery,
    showFilters, setShowFilters,
    filters, setFilters, clearFilters,
    sortConfig, handleSort, handleSortDirection,
    setSortConfig,
    currentPage, setCurrentPage,
    rowsPerPage, handleRowsPerPageChange, totalPages, startIndex,
    selectedIds, handleSelectAll, handleSelectRow,
    actionMenuOpen, setActionMenuOpen,
    showSortDropdown, setShowSortDropdown,
    showActionsDropdown, setShowActionsDropdown,
    selectedLead, setSelectedLead,
    paginatedData, paginatedIds, filteredData,
  };
}
