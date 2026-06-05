import type { WorkModeFormData } from '../types/workMode.types';

interface WorkModeFormProps {
  formData: WorkModeFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const WorkModeForm = ({ formData, onChange, onSubmit }: WorkModeFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Work Mode Name <span className="text-danger">*</span></label>
        <input type="text" name="workModeName" className="form-control" placeholder="Enter work mode name" value={formData.workModeName || ''} onChange={onChange} />
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

export default WorkModeForm;
