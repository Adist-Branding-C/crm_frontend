const WhatsappTemplateForm = ({ formData, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Template Name <span className="text-danger">*</span></label>
        <input type="text" name="templateName" className="form-control" placeholder="Enter template name" value={formData.templateName || ''} onChange={onChange} />
      </div>
      <div className="form-group">
        <label>Message <span className="text-danger">*</span></label>
        <textarea name="message" className="form-control" placeholder="Enter WhatsApp message" rows={4} value={formData.message || ''} onChange={onChange} />
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

export default WhatsappTemplateForm;
