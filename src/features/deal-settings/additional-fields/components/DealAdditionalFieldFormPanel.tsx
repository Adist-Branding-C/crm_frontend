import React from 'react';
import { Plus } from 'lucide-react';
import { FIELD_TYPE_OPTIONS } from '../../../../shared/constants/fieldTypes';
import type { AddDealAdditionalFieldFormPanelProps } from '../types/add-deal-additional-field-form-panel.types';

const DealAdditionalFieldFormPanel: React.FC<AddDealAdditionalFieldFormPanelProps> = ({
  formData, editingItem, onInputChange, onSubmit,
}) => (
  <div className="card">
    <div className="card-header">
      <h5>Add Field</h5>
    </div>
    <div className="card-body">
      <form onSubmit={onSubmit}>
        <div className="checkbox-group">
          <label className="checkbox-item">
            <input type="checkbox" name="inFilter" checked={formData.inFilter} onChange={onInputChange} />
            Is Shown in filter
          </label>
          <label className="checkbox-item">
            <input type="checkbox" name="inList" checked={formData.inList} onChange={onInputChange} />
            Show in list
          </label>
          <label className="checkbox-item">
            <input type="checkbox" name="required" checked={formData.required} onChange={onInputChange} />
            Is Required?
          </label>
        </div>
        <div className="form-group">
          <label>Field Name <span className="text-danger">*</span></label>
          <input type="text" name="fieldName" className="form-control" placeholder="Enter field name"
            value={formData.fieldName} onChange={onInputChange} />
        </div>
        <div className="form-group">
          <label>Select Type <span className="text-danger">*</span></label>
          <select name="fieldType" className="form-control" value={formData.fieldType} onChange={onInputChange}>
            <option value="">Select Type</option>
            {FIELD_TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          <Plus size={16} /> {editingItem ? 'Update' : 'Add Field'}
        </button>
      </form>
    </div>
  </div>
);

export default DealAdditionalFieldFormPanel;
