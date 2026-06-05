import type { ChangeEvent, FormEvent } from 'react';
import type { DesignationFormData } from '../types/designation.types';

interface DesignationFormProps {
  formData: DesignationFormData
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const DesignationForm = ({ formData, onChange, onSubmit }: DesignationFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Designation Name <span className="text-danger">*</span></label>
        <input type="text" name="designationName" className="form-control" placeholder="Enter designation name" value={formData.designationName || ''} onChange={onChange} />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea name="description" className="form-control" placeholder="Enter description" value={formData.description || ''} onChange={onChange} />
      </div>
      <div className="form-group">
        <label>Status <span className="text-danger">*</span></label>
        <select name="status" className="form-control" value={formData.status || ''} onChange={onChange}>
          <option value="">Select status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Save</button>
      </div>
    </form>
  );
};

export default DesignationForm;
