import AgentMultiSelect from './AgentMultiSelect';
import { FILTER_BY_OPTIONS, SORT_BY_OPTIONS } from '../constants/campaign.constants';
import type { DataPoolFieldsProps } from '../types/data-pool-fields.types';

const DataPoolFields = ({ poolName, poolAgents, filterBy, sortBy, errors, agents, isLoadingAgents, onChange, onAgentChange }: DataPoolFieldsProps) => (
  <>
    <div className="form-group">
      <label>Pool Name *</label>
      <input type="text" name="poolName" placeholder="Enter pool name" value={poolName} onChange={(e) => onChange(e.target.name, e.target.value)} />
      {errors.poolName && <span className="error-text">{errors.poolName}</span>}
    </div>
    <div className="form-group">
      <label>Pool Agents</label>
      <AgentMultiSelect agents={agents} selected={poolAgents} onChange={onAgentChange} isLoading={isLoadingAgents} />
    </div>
    <div className="form-group">
      <label>Filter by</label>
      <select name="filterBy" value={filterBy} onChange={(e) => onChange(e.target.name, e.target.value)}>
        <option value="">Select</option>
        {FILTER_BY_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
    <div className="form-group">
      <label>Sort by</label>
      <select name="sortBy" value={sortBy} onChange={(e) => onChange(e.target.name, e.target.value)}>
        <option value="">Select</option>
        {SORT_BY_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  </>
);

export default DataPoolFields;
