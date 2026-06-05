import type { DepartmentFormData } from '../types/department.types';

interface DepartmentFormProps {
  formData: DepartmentFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const DepartmentForm = ({ formData, onChange, onSubmit }: DepartmentFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Department Name <span className="text-danger">*</span></label>
        <input type="text" name="departmentName" className="form-control" placeholder="Enter department name" value={formData.departmentName || ''} onChange={onChange} />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea name="description" className="form-control" placeholder="Enter description" rows={4} value={formData.description || ''} onChange={onChange} />
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

export default DepartmentForm;
