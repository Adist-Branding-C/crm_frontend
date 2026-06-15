import type { LeadCampaignFieldsProps } from '../types/lead-campaign-fields.types';

const LeadCampaignFields = ({ name, startDate, endDate, description, errors, onChange }: LeadCampaignFieldsProps) => (
  <>
    <div className="form-group">
      <label>Name *</label>
      <input type="text" name="name" placeholder="Enter campaign name" value={name} onChange={(e) => onChange(e.target.name, e.target.value)} />
      {errors.name && <span className="error-text">{errors.name}</span>}
    </div>
    <div className="form-group">
      <label>Start Date *</label>
      <input type="date" name="startDate" value={startDate} onChange={(e) => onChange(e.target.name, e.target.value)} />
      {errors.startDate && <span className="error-text">{errors.startDate}</span>}
    </div>
    <div className="form-group">
      <label>End Date *</label>
      <input type="date" name="endDate" value={endDate} onChange={(e) => onChange(e.target.name, e.target.value)} />
      {errors.endDate && <span className="error-text">{errors.endDate}</span>}
    </div>
    <div className="form-group">
      <label>Description</label>
      <textarea name="description" placeholder="Enter description" value={description} onChange={(e) => onChange(e.target.name, e.target.value)} rows={3} />
    </div>
  </>
);

export default LeadCampaignFields;
