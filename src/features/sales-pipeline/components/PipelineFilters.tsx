import React from 'react';
import { Filter, ChevronRight, ChevronDown, X } from 'lucide-react';
import { salesAgents, dealTypes } from '../constants';
import type { PipelineFiltersProps } from '../types/pipeline.types';

const PipelineFilters: React.FC<PipelineFiltersProps> = ({
  showDateFilter, setShowDateFilter,
  dateFrom, setDateFrom,
  dateTo, setDateTo,
  selectedAgent, setSelectedAgent,
  selectedType, setSelectedType,
  filterRef, clearFilters,
}) => {
  return (
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
  );
};

export default PipelineFilters;
