import type { ChangeEvent, FormEvent } from 'react';

interface CheckoutNoteFormProps {
  formData: { note: string };
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent) => void;
}

const CheckoutNoteForm = ({ formData, onChange, onSubmit }: CheckoutNoteFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Note <span className="text-danger">*</span></label>
        <textarea name="note" className="form-control" placeholder="Enter checkout note" value={formData.note || ''} onChange={onChange} rows={4} />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Save</button>
      </div>
    </form>
  );
};

export default CheckoutNoteForm;
