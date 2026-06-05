import type { ChangeEvent, FormEvent } from 'react';
import type { CheckoutNoteFormData } from '../types/checkoutNote.types';

interface CheckoutNoteFormProps {
  formData: CheckoutNoteFormData
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const CheckoutNoteForm = ({ formData, onChange, onSubmit }: CheckoutNoteFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Title <span className="text-danger">*</span></label>
        <input type="text" name="title" className="form-control" placeholder="Enter title" value={formData.title || ''} onChange={onChange} />
      </div>
      <div className="form-group">
        <label>Note <span className="text-danger">*</span></label>
        <textarea name="note" className="form-control" placeholder="Enter checkout note" rows={4} value={formData.note || ''} onChange={onChange} />
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

export default CheckoutNoteForm;
