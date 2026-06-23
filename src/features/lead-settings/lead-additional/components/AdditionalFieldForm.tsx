import { Plus, Loader2 } from 'lucide-react';
import { FIELD_TYPE_OPTIONS } from '../../../../shared/constants/fieldTypes';
import DropdownValuesInput from './DropdownValuesInput';
import ValidationAlert from '../../../../shared/components/ValidationAlert';
import type { FormData, LeadPurposeOption, LeadAdditionalItem } from '../types';
import './AdditionalFieldForm.css';

interface AdditionalFieldFormProps {
  formData: FormData;
  purposes: LeadPurposeOption[];
  editingItem: LeadAdditionalItem | null;
  isSaving: boolean;
  error: string | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onDropdownValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddDropdownValue: () => void;
  onRemoveDropdownValue: (index: number) => void;
  onClearError?: () => void;
}

const AdditionalFieldForm = ({
  formData,
  purposes,
  editingItem,
  isSaving,
  error,
  onInputChange,
  onSubmit,
  onDropdownValueChange,
  onAddDropdownValue,
  onRemoveDropdownValue,
  onClearError,
}: AdditionalFieldFormProps) => (
  <div className="additional-form-panel">
    <div className="card">
      <div className="card-header">
        <h5>{editingItem ? 'Edit Field' : 'Add Field'}</h5>
      </div>
      <div className="card-body">
        <ValidationAlert message={error} onClose={onClearError} />
        <form onSubmit={onSubmit}>
          <div className="checkbox-group">
            <label className="checkbox-item">
              <input
                type="checkbox"
                name="showInFilter"
                checked={formData.showInFilter}
                onChange={onInputChange}
              />
              Is Shown in filter
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                name="showInList"
                checked={formData.showInList}
                onChange={onInputChange}
              />
              Show in list
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                name="isRequired"
                checked={formData.isRequired}
                onChange={onInputChange}
              />
              Is Required?
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                name="connectWithLeadPurpose"
                checked={formData.connectWithLeadPurpose}
                onChange={onInputChange}
              />
              Connect with lead purpose?
            </label>
          </div>
          <div className="form-group">
            <label>Field Name <span className="text-danger">*</span></label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter field name"
              value={formData.name}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group">
            <label>Select Type <span className="text-danger">*</span></label>
            <select
              name="fieldType"
              className="form-control"
              value={formData.fieldType}
              onChange={onInputChange}
            >
              <option value="">Select Type</option>
              {FIELD_TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          {formData.connectWithLeadPurpose && (
            <div className="form-group">
              <label>Select Purpose <span className="text-danger">*</span></label>
              <select
                name="purposeId"
                className="form-control"
                value={formData.purposeId}
                onChange={onInputChange}
              >
                <option value="">Select Purpose</option>
                {purposes.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
            </div>
          )}
          {(formData.fieldType === 'dropdown' || formData.fieldType === 'checkbox') && (
            <DropdownValuesInput
              currentValue={formData.currentDropdownValue}
              values={formData.dropdownValues}
              onChange={onDropdownValueChange}
              onAdd={onAddDropdownValue}
              onRemove={onRemoveDropdownValue}
            />
          )}
          <button type="submit" className="btn btn-primary" disabled={isSaving}>
            {isSaving ? (
              <><Loader2 size={16} className="spin" /> Saving...</>
            ) : (
              <><Plus size={16} /> {editingItem ? 'Update' : 'Add Field'}</>
            )}
          </button>
        </form>
      </div>
    </div>
  </div>
);

export default AdditionalFieldForm;
