import React from 'react';
import { Plus, MoreHorizontal, Search, Filter, ChevronRight, ChevronDown, DollarSign, Calendar, X } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import AddDealDrawer from '../../../shared/components/drawers/AddDealDrawer';
import { pipelineStages, salesAgents, dealTypes } from '../constants';
import { useSalesPipelineData } from '../hooks/useSalesPipelineData';
import './SalesPipelinePage.css';

const SalesPipelinePage: React.FC = () => {
  const {
    searchQuery, setSearchQuery,
    showDateFilter, setShowDateFilter,
    dateFrom, setDateFrom,
    dateTo, setDateTo,
    selectedAgent, setSelectedAgent,
    selectedType, setSelectedType,
    isDrawerOpen, setIsDrawerOpen,
    filterRef,
    clearFilters, filteredDeals,
    getDealsForStage, getStageTotal,
    handleDragStart, handleDragOver, handleDrop,
    handleSaveDeal, getAvatarColor,
  } = useSalesPipelineData();

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
                    <select value={selectedAgent} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedAgent(parseInt(e.target.value))} className="date-input">
                      {salesAgents.map(agent => <option key={agent.id} value={agent.id}>{agent.name}</option>)}
                    </select>
                  </div>
                  <div className="date-input-group">
                    <label>Deal Type</label>
                    <select value={selectedType} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedType(parseInt(e.target.value))} className="date-input">
                      {dealTypes.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
                    </select>
                  </div>
                  <div className="date-input-group">
                    <label>From Date</label>
                    <input type="date" value={dateFrom} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateFrom(e.target.value)} className="date-input" />
                  </div>
                  <div className="date-input-group">
                    <label>To Date</label>
                    <input type="date" value={dateTo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateTo(e.target.value)} className="date-input" />
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
                      <div className="contact-avatar" style={{ background: getAvatarColor(deal.contact) }}>
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
