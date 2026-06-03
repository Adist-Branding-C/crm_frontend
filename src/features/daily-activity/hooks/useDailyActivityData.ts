import { useState, useMemo } from 'react';
import { staffList, activityTypes, sampleActivities } from '../constants';
import { DEFAULT_ROWS_PER_PAGE } from '../../../shared/constants/pagination';
import type { Filters } from '../types';

export const useDailyActivityData = () => {
  const [filters, setFilters] = useState<Filters>({
    date: '2026-04-25',
    startTime: '',
    endTime: '',
    staff: 1,
    type: 1,
  });
  const [activityTypeFilter, setActivityTypeFilter] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showStaffDropdown, setShowStaffDropdown] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [completedActivities, setCompletedActivities] = useState<number[]>([]);
  const rowsPerPage = DEFAULT_ROWS_PER_PAGE;

  const filteredActivities = useMemo(() => {
    let filtered = [...sampleActivities];

    if (filters.staff !== 1) {
      const staff = staffList.find(s => s.id === filters.staff);
      if (staff) filtered = filtered.filter(a => a.user === staff.name);
    }

    if (activityTypeFilter !== 1) {
      const type = activityTypes.find(t => t.id === activityTypeFilter);
      if (type) filtered = filtered.filter(a => a.type === type.name);
    }

    if (filters.date) {
      filtered = filtered.filter(a => a.timestamp.startsWith(filters.date));
    }

    if (filters.startTime) {
      filtered = filtered.filter(a => {
        const time = a.timestamp.split(' ')[1] ?? '';
        return time >= filters.startTime;
      });
    }

    if (filters.endTime) {
      filtered = filtered.filter(a => {
        const time = a.timestamp.split(' ')[1] ?? '';
        return time <= filters.endTime;
      });
    }

    if (searchQuery) {
      filtered = filtered.filter(a =>
        a.relatedLead.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [filters, activityTypeFilter, searchQuery]);

  const totalActivities = filteredActivities.length;
  const totalPages = Math.ceil(totalActivities / rowsPerPage);
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleFilterChange = (field: keyof Filters, value: string | number) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleReset = () => {
    setFilters({ date: '2026-04-25', startTime: '', endTime: '', staff: 1, type: 1 });
    setActivityTypeFilter(1);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleMarkComplete = (activityId: number) => {
    if (!completedActivities.includes(activityId)) {
      setCompletedActivities([...completedActivities, activityId]);
    }
  };

  const selectedStaffName = staffList.find(s => s.id === filters.staff)?.name || 'All Staff';

  const getPageNumbers = () => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  };

  return {
    filters,
    setFilters,
    activityTypeFilter,
    setActivityTypeFilter,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    showStaffDropdown,
    setShowStaffDropdown,
    localSearchQuery,
    setLocalSearchQuery,
    completedActivities,
    rowsPerPage,
    filteredActivities,
    totalActivities,
    totalPages,
    paginatedActivities,
    selectedStaffName,
    handleFilterChange,
    handleReset,
    handleMarkComplete,
    getPageNumbers,
  };
};
