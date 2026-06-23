import { CAMPAIGN_TYPES, CAMPAIGN_TYPE_OPTIONS } from '../constants/campaign.constants';
import LeadCampaignFields from './LeadCampaignFields';
import DataPoolFields from './DataPoolFields';
import type { CampaignFormProps } from '../types/campaign-form.types';

const CampaignForm = ({ mode, formData, errors, agents, isLoadingAgents, onFieldChange, onAgentChange, onTypeChange, onSubmit, onCancel }: CampaignFormProps) => (
  <div className="drawer-body">
    <div className="form-section-title">Campaign Information</div>
    <form className="lead-form">
      <div className="form-group">
        <label>Type *</label>
        <select value={formData.type} onChange={(e) => onTypeChange(e.target.value)}>
          <option value="">Select</option>
          {CAMPAIGN_TYPE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.type && <span className="error-text">{errors.type}</span>}
      </div>

      {formData.type === CAMPAIGN_TYPES.LEAD_CAMPAIGN && (
        <LeadCampaignFields
          name={formData.name}
          startDate={formData.startDate}
          endDate={formData.endDate}
          description={formData.description}
          errors={errors}
          onChange={onFieldChange}
        />
      )}

      {formData.type === CAMPAIGN_TYPES.DATA_POOL && (
        <DataPoolFields
          poolName={formData.poolName}
          poolAgents={formData.poolAgents}
          filterBy={formData.filterBy}
          sortBy={formData.sortBy}
          errors={errors}
          agents={agents}
          isLoadingAgents={isLoadingAgents}
          onChange={onFieldChange}
          onAgentChange={onAgentChange}
        />
      )}
    </form>
    <div className="drawer-footer">
      <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      <button className="btn btn-primary" type="button" onClick={onSubmit}>
        {mode === 'edit' ? 'Update Campaign' : 'Save Campaign'}
      </button>
    </div>
  </div>
);

export default CampaignForm;
