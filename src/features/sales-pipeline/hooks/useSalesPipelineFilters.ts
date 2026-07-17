import { useState, useCallback } from 'react';
import { useClickOutside } from '../../../shared/hooks/useClickOutside';


export function useSalesPipelineFilters() {
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const filterRef = useClickOutside<HTMLDivElement>(() =>
    setShowDateFilter(false),
  );

  const clearFilters = useCallback(() => {
    setDateFrom('');
    setDateTo('');
    setSelectedAgent('');
  }, []);

  return {
    showDateFilter,
    setShowDateFilter,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    selectedAgent,
    setSelectedAgent,
    filterRef,
    clearFilters,
  };
}
