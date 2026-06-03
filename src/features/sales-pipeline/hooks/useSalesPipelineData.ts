import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { salesAgents, sampleDeals } from '../constants';
import type { Deal } from '../types';

export function useSalesPipelineData() {
  const [searchQuery, setSearchQuery] = useState('');
  const [draggedDeal, setDraggedDeal] = useState<Deal | null>(null);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(1);
  const [selectedType, setSelectedType] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deals, setDeals] = useState<Deal[]>(sampleDeals);
  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowDateFilter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearFilters = useCallback(() => {
    setDateFrom('');
    setDateTo('');
    setSelectedAgent(1);
    setSelectedType(1);
  }, []);

  const filteredDeals = useMemo(() =>
    deals.filter(deal => {
      const matchesSearch = searchQuery === '' ||
        deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.contact.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesDate = true;
      if (dateFrom && dateTo) {
        matchesDate = deal.dueDate >= dateFrom && deal.dueDate <= dateTo;
      } else if (dateFrom) {
        matchesDate = deal.dueDate >= dateFrom;
      } else if (dateTo) {
        matchesDate = deal.dueDate <= dateTo;
      }

      const matchesAgent = selectedAgent === 1 || deal.contact === salesAgents.find(a => a.id === selectedAgent)?.name;
      return matchesSearch && matchesDate && matchesAgent;
    }),
    [deals, searchQuery, dateFrom, dateTo, selectedAgent]
  );

  const getDealsForStage = useCallback((stageId: number) =>
    filteredDeals.filter(deal => deal.stage === stageId),
    [filteredDeals]
  );

  const getStageTotal = useCallback((stageId: number) => {
    const stageDeals = getDealsForStage(stageId);
    return stageDeals.reduce((sum, deal) => sum + deal.value, 0);
  }, [getDealsForStage]);

  const handleDragStart = useCallback((_e: React.DragEvent, deal: Deal) => {
    setDraggedDeal(deal);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, stageId: number) => {
    e.preventDefault();
    if (draggedDeal) {
      setDeals(prevDeals =>
        prevDeals.map(deal =>
          deal.id === draggedDeal.id ? { ...deal, stage: stageId } : deal
        )
      );
      setDraggedDeal(null);
    }
  }, [draggedDeal]);

  const handleSaveDeal = useCallback(() => {
    // Deal saved via drawer; integration with pipeline state can be added later
  }, []);

  const getAvatarColor = useCallback((name: string) => {
    const colors = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#ec4899'];
    return colors[name.charCodeAt(0) % colors.length] || '#6b7280';
  }, []);

  return {
    searchQuery, setSearchQuery,
    draggedDeal, setDraggedDeal,
    showDateFilter, setShowDateFilter,
    dateFrom, setDateFrom,
    dateTo, setDateTo,
    selectedAgent, setSelectedAgent,
    selectedType, setSelectedType,
    isDrawerOpen, setIsDrawerOpen,
    deals, setDeals,
    filterRef,
    clearFilters, filteredDeals,
    getDealsForStage, getStageTotal,
    handleDragStart, handleDragOver, handleDrop,
    handleSaveDeal, getAvatarColor,
  };
}
