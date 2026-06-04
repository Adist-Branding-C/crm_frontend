const EmailTemplateForm = ({ formData, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Template Name <span className="text-danger">*</span></label>
        <input type="text" name="templateName" className="form-control" placeholder="Enter template name" value={formData.templateName || ''} onChange={onChange} />
      </div>
      <div className="form-group">
        <label>Subject <span className="text-danger">*</span></label>
        <input type="text" name="subject" className="form-control" placeholder="Enter email subject" value={formData.subject || ''} onChange={onChange} />
      </div>
      <div className="form-group">
        <label>Content <span className="text-danger">*</span></label>
        <textarea name="content" className="form-control" placeholder="Enter template content" rows={6} value={formData.content || ''} onChange={onChange} />
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

export default EmailTemplateForm;
