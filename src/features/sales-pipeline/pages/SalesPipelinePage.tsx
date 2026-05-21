import React, { useState, useRef, useEffect } from 'react';
import { Plus, MoreHorizontal, Search, Filter, ChevronRight, ChevronDown, DollarSign, Calendar, X } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import AddDealDrawer from '../../../shared/components/drawers/AddDealDrawer';
import { salesAgents, dealTypes, pipelineStages, sampleDeals } from '../constants';
import type { Deal } from '../types';
import '../../../pages/SalesPipeline.css';

const SalesPipelinePage: React.FC = () => {
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

  const clearFilters = () => {
    setDateFrom('');
    setDateTo('');
    setSelectedAgent(1);
    setSelectedType(1);
  };

  const filteredDeals = deals.filter(deal => {
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
  });

  const getDealsForStage = (stageId: number) => {
    return filteredDeals.filter(deal => deal.stage === stageId);
  };

  const getStageTotal = (stageId: number) => {
    const stageDeals = getDealsForStage(stageId);
    return stageDeals.reduce((sum, deal) => sum + deal.value, 0);
  };

  const handleDragStart = (_e: React.DragEvent, deal: Deal) => {
    setDraggedDeal(deal);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, stageId: number) => {
    e.preventDefault();
    if (draggedDeal) {
      setDeals(prevDeals =>
        prevDeals.map(deal =>
          deal.id === draggedDeal.id
            ? { ...deal, stage: stageId }
            : deal
        )
      );
      setDraggedDeal(null);
    }
  };

  const handleSaveDeal = (_formData: Record<string, unknown>) => {
    // Deal saved via drawer; integration with pipeline state can be added later
  };

  const getAvatarColor = (name: string) => {
    const colors = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#ec4899'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <PageContainer>
      <PageHeader
        title="Sales Pipeline"
        description="Manage deals through your sales pipeline stages"
      />

      <div className="pipeline-toolbar">
        <div className="pipeline-left">
          <div className="pipeline-search">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search deals..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="date-filter-wrapper" ref={filterRef}>
            <button
              className={`btn-filter ${showDateFilter ? 'active' : ''}`}
              onClick={() => setShowDateFilter(!showDateFilter)}
            >
              <Filter size={18} />
              Filter
              {showDateFilter ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {showDateFilter && (
              <div className="date-filter-dropdown">
                <div className="date-filter-header">
                  <span>Filters</span>
                  <button className="clear-filter" onClick={(e) => { e.stopPropagation(); clearFilters(); setShowDateFilter(false); }}>
                    <X size={14} />
                  </button>
                </div>
                <div className="date-filter-inputs">
                  <div className="date-input-group">
                    <label>Sales Agent</label>
                    <select
                      value={selectedAgent}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedAgent(parseInt(e.target.value))}
                      className="date-input"
                    >
                      {salesAgents.map(agent =>
                        <option key={agent.id} value={agent.id}>{agent.name}</option>
                      )}
                    </select>
                  </div>
                  <div className="date-input-group">
                    <label>Deal Type</label>
                    <select
                      value={selectedType}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedType(parseInt(e.target.value))}
                      className="date-input"
                    >
                      {dealTypes.map(type =>
                        <option key={type.id} value={type.id}>{type.name}</option>
                      )}
                    </select>
                  </div>
                  <div className="date-input-group">
                    <label>From Date</label>
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateFrom(e.target.value)}
                      className="date-input"
                    />
                  </div>
                  <div className="date-input-group">
                    <label>To Date</label>
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateTo(e.target.value)}
                      className="date-input"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="pipeline-actions">
          <button className="btn-primary" onClick={() => setIsDrawerOpen(true)}>
            <Plus size={18} />
            Add Deal
          </button>
        </div>
      </div>

      <div className="pipeline-board">
        {pipelineStages.map(stage =>
          <div
            key={stage.id}
            className="pipeline-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            <div className="column-header" style={{ borderTopColor: stage.color }}>
              <div className="column-title">
                <span className="column-name">{stage.name}</span>
                <span className="column-count">{getDealsForStage(stage.id).length}</span>
              </div>
              <span className="column-value">${getStageTotal(stage.id).toLocaleString()}</span>
            </div>
            <div className="column-cards">
              {getDealsForStage(stage.id).map(deal =>
                <div
                  key={deal.id}
                  className="deal-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, deal)}
                >
                  <div className="deal-header">
                    <span className="deal-company">{deal.company}</span>
                    <MoreHorizontal size={16} className="deal-menu" />
                  </div>
                  <div className="deal-title">{deal.title}</div>
                  <div className="deal-value">
                    <DollarSign size={14} />
                    {deal.value.toLocaleString()}
                  </div>
                  <div className="deal-footer">
                    <div className="deal-contact">
                      <div
                        className="contact-avatar"
                        style={{ background: getAvatarColor(deal.contact) }}
                      >
                        {deal.contact.charAt(0)}
                      </div>
                      <span>{deal.contact}</span>
                    </div>
                    <div className="deal-probability" style={{ color: deal.probability === 100 ? '#10b981' : deal.probability === 0 ? '#ef4444' : '#6b7280' }}>
                      {deal.probability}%
                    </div>
                  </div>
                  <div className="deal-due">
                    <Calendar size={12} />
                    <span>{deal.dueDate}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <AddDealDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onSave={handleSaveDeal} />
    </PageContainer>
  );
};

export default SalesPipelinePage;
