import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useTableSorting } from '../../../shared/hooks/useTableSorting';
import { useTablePagination } from '../../../shared/hooks/useTablePagination';
import { useTableSelection } from '../../../shared/hooks/useTableSelection';
import { useSearchFilter } from '../../../shared/hooks/useSearchFilter';
import { SAMPLE_LEADS, INITIAL_FILTERS } from '../constants';
import type { Lead, Filters } from '../types';
import { SortDirection } from '../../../shared/constants/enums/sortDirection';

export function useEnquiriesData() {
  const [showFilters, setShowFilters] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [actionMenuButtonRect, setActionMenuButtonRect] = useState<DOMRect | null>(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [sortDropdownClosing, setSortDropdownClosing] = useState(false);
  const [actionsDropdownClosing, setActionsDropdownClosing] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const sortDropdownRef = useRef<HTMLDivElement | null>(null);
  const actionsDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        if (showSortDropdown) {
          setSortDropdownClosing(true);
          setTimeout(() => { setShowSortDropdown(false); setSortDropdownClosing(false); }, 150);
        }
      }
      if (actionsDropdownRef.current && !actionsDropdownRef.current.contains(event.target as Node)) {
        if (showActionsDropdown) {
          setActionsDropdownClosing(true);
          setTimeout(() => { setShowActionsDropdown(false); setActionsDropdownClosing(false); }, 150);
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (showSortDropdown) {
          setSortDropdownClosing(true);
          setTimeout(() => { setShowSortDropdown(false); setSortDropdownClosing(false); }, 150);
        }
        if (showActionsDropdown) {
          setActionsDropdownClosing(true);
          setTimeout(() => { setShowActionsDropdown(false); setActionsDropdownClosing(false); }, 150);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showSortDropdown, showActionsDropdown]);

  const { filteredData: searchedData, setQuery: setSearchQuery, query: searchQuery } = useSearchFilter(
    SAMPLE_LEADS,
    ['name', 'phone', 'assignedTo' as keyof Lead]
  );

  const filteredByAll = useMemo(() => {
    let data = searchedData;
    if (filters.enquirySource) data = data.filter(item => item.source === filters.enquirySource);
    if (filters.enquiryPurpose) data = data.filter(item => item.purpose === filters.enquiryPurpose);
    if (filters.leadStatus) data = data.filter(item => item.status === filters.leadStatus);
    if (filters.assignedTo) data = data.filter(item => item.assignedTo === filters.assignedTo);
    if (filters.leadType) data = data.filter(item => item.type === filters.leadType);
    return data;
  }, [searchedData, filters]);

  const { sortedData, sortConfig, handleSort, setSortConfig } = useTableSorting(filteredByAll);
  const filteredData = sortedData;

  const { currentPage, setCurrentPage, rowsPerPage, handleRowsPerPageChange, totalPages, startIndex, paginatedData } =
    useTablePagination(filteredData, 5);

  const paginatedIds = useMemo(
    () => paginatedData.map(item => item.id),
    [paginatedData]
  );

  const { selectedIds, handleSelectAll, handleSelectRow } = useTableSelection();

  const closeSortDropdown = useCallback(() => {
    setSortDropdownClosing(true);
    setTimeout(() => { setShowSortDropdown(false); setSortDropdownClosing(false); }, 150);
  }, []);

  const closeActionsDropdown = useCallback(() => {
    setActionsDropdownClosing(true);
    setTimeout(() => { setShowActionsDropdown(false); setActionsDropdownClosing(false); }, 150);
  }, []);

  const handleSortDesc = useCallback((key: string) => { setSortConfig({ key, direction: SortDirection.DESC }); }, [setSortConfig]);
  const handleSortAsc = useCallback((key: string) => { setSortConfig({ key, direction: SortDirection.ASC }); }, [setSortConfig]);

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setShowFilters(false);
  }, []);

  return {
    searchQuery, setSearchQuery,
    showFilters, setShowFilters,
    filters, setFilters, clearFilters,
    sortConfig, handleSort, handleSortDesc, handleSortAsc,
    currentPage, setCurrentPage,
    rowsPerPage, handleRowsPerPageChange, totalPages, startIndex,
    selectedIds, handleSelectAll, handleSelectRow,
    actionMenuOpen, setActionMenuOpen,
    actionMenuButtonRect, setActionMenuButtonRect,
    isDrawerOpen, setIsDrawerOpen,
    showSortDropdown, setShowSortDropdown,
    showActionsDropdown, setShowActionsDropdown,
    sortDropdownClosing, setSortDropdownClosing,
    actionsDropdownClosing, setActionsDropdownClosing,
    selectedLead, setSelectedLead,
    sortDropdownRef, actionsDropdownRef,
    closeSortDropdown, closeActionsDropdown,
    paginatedData, paginatedIds, filteredData,
  };
}
