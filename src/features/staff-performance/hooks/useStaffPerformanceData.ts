import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { staffPerformanceService } from '../services/staffPerformance.service';
import type { StaffPerformanceItem } from '../types';

export const useStaffPerformanceData = () => {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [staffList, setStaffList] = useState<StaffPerformanceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const fetchStaffPerformance = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await staffPerformanceService.getStaffPerformance(
        dateFrom || undefined,
        dateTo || undefined,
      );
      setStaffList(response.data ?? []);
    } catch {
      setError('Failed to load staff performance data');
    } finally {
      setLoading(false);
    }
  }, [dateFrom, dateTo]);

  useEffect(() => {
    fetchStaffPerformance();
  }, [fetchStaffPerformance]);

  const staff: StaffPerformanceItem | null = id
    ? staffList.find((s) => s.staffId === id) ?? null
    : null;

  const filteredStaff = staffList.filter((s) => {
    const matchesSearch =
      searchQuery === '' ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.designation ?? '').toLowerCase().includes(searchQuery.toLowerCase());
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
    loading,
    error,
  };
};
