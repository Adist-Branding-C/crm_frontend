import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { STAFF_DATA } from '../constants';
import type { StaffMember } from '../types';

export const useStaffPerformanceData = () => {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const staff: StaffMember | null = (() => {
    if (!id) return null;
    const staffId = parseInt(id, 10);
    return !isNaN(staffId) && staffId > 0 ? STAFF_DATA.find(s => s.id === staffId) ?? null : null;
  })();

  const filteredStaff = STAFF_DATA.filter(s => {
    const matchesSearch = searchQuery === '' ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const clearFilters = () => {
    setDateFrom('');
    setDateTo('');
    setShowFilters(false);
  };

  return {
    id,
    staff,
    searchQuery,
    setSearchQuery,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    showFilters,
    setShowFilters,
    filterRef,
    filteredStaff,
    clearFilters,
  };
};
