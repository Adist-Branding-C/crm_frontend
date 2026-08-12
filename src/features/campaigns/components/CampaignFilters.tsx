import { ACTION_FILTER, ACTION_CLEAR } from '../../../shared/constants/actionLabels';
import { CAMPAIGN_TYPE_OPTIONS } from '../constants';
import type { CampaignFiltersProps } from '../types';


const CampaignFilters = ({ filters, onFilterChange, onClearFilters, onClose, agentOptions, agentOptionsLoading }: CampaignFiltersProps) => (
  <div className="filters-panel">
    <div className="filter-row">
      <div className="filter-group">
        <label>Type</label>
        <select value={filters.type ?? ''} onChange={(e) => onFilterChange({ type: e.target.value || undefined })}>
          <option value="">All</option>
          {CAMPAIGN_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Agent</label>
        <select
          value={filters.agentId ?? ''}
          onChange={(e) => onFilterChange({ agentId: e.target.value || undefined })}
          disabled={agentOptionsLoading}
        >
          <option value="">All</option>
          {agentOptions.map((agent) => (
            <option key={agent.id} value={agent.id}>{agent.name}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Created By</label>
        <select
          value={filters.createdBy ?? ''}
          onChange={(e) => onFilterChange({ createdBy: e.target.value || undefined })}
          disabled={agentOptionsLoading}
        >
          <option value="">All</option>
          {agentOptions.map((agent) => (
            <option key={agent.id} value={agent.id}>{agent.name}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Date Range</label>
        <div className="date-range-input">
          <input
            type="date"
            value={filters.startDate ?? ''}
            onChange={(e) => onFilterChange({ startDate: e.target.value || undefined })}
          />
          <span>to</span>
          <input
            type="date"
            value={filters.endDate ?? ''}
            onChange={(e) => onFilterChange({ endDate: e.target.value || undefined })}
          />
        </div>
      </div>
    </div>

    <div className="filter-row">
      <div className="filter-actions">
        <button type="button" className="btn btn-primary" onClick={onClose}>{ACTION_FILTER}</button>
        <button type="button" className="btn btn-secondary" onClick={onClearFilters}>{ACTION_CLEAR}</button>
      </div>
    </div>
  </div>
);

export default CampaignFilters;
