import type { ChangeEventHandler, FormEventHandler } from 'react';

interface AgentFormProps {
  formData: {
    fullName?: string;
    phone?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isEditing: boolean;
}

const AgentForm = ({ formData, onChange, onSubmit, isEditing }: AgentFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Name <span className="text-danger">*</span></label>
        <input type="text" name="fullName" className="form-control" placeholder="Enter name" value={formData.fullName || ''} onChange={onChange} />
      </div>
      <div className="form-group">
        <label>Phone Number <span className="text-danger">*</span></label>
        <input type="text" name="phone" className="form-control" placeholder="Enter phone number" value={formData.phone || ''} onChange={onChange} />
      </div>
      <div className="form-group">
        <label>Email <span className="text-danger">*</span></label>
        <input type="email" name="email" className="form-control" placeholder="Enter email" value={formData.email || ''} onChange={onChange} />
      </div>
      {!isEditing && (
        <>
          <div className="form-group">
            <label>Password <span className="text-danger">*</span></label>
            <input type="password" name="password" className="form-control" placeholder="Enter password" value={formData.password || ''} onChange={onChange} />
          </div>
          <div className="form-group">
            <label>Confirm Password <span className="text-danger">*</span></label>
            <input type="password" name="confirmPassword" className="form-control" placeholder="Enter confirm password" value={formData.confirmPassword || ''} onChange={onChange} />
          </div>
        </>
      )}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Save</button>
      </div>
    </form>
  );
};

export default AgentForm;
