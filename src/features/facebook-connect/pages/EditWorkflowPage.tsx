import { Navigate, useNavigate } from 'react-router-dom';
import PageHeader from '../../../shared/components/layout/PageHeader';
import ToastNotification from '../../../shared/components/ToastNotification';
import { useEditWorkflowPage } from '../hooks/useEditWorkflowPage';
import FieldMappingBuilder from '../components/FieldMappingBuilder';
import DefaultValuesSection from '../components/DefaultValuesSection';
import '../../../pages/FacebookWorkflows.css';

const EditWorkflowPage = () => {
  const navigate = useNavigate();
  const {
    workflow,
    mappingOptions,
    selectedForm,
    loading,
    notFound,
    name,
    setName,
    status,
    setStatus,
    sourceName,
    setSourceName,
    statusName,
    setStatusName,
    mapping,
    errors,
    submitting,
    handleSubmit,
    handleDelete,
    toast,
  } = useEditWorkflowPage();

  if (notFound) {
    return <Navigate to="/facebook/workflows" replace />;
  }

  if (loading || !workflow) {
    return (
      <div className="create-workflow-page">
        <div className="workflow-form-card"><p>Loading…</p></div>
      </div>
    );
  }

  return (
    <div className="create-workflow-page">
      <div className="page-header-with-toggle">
        <div className="header-content">
          <PageHeader
            title="Edit Workflow"
            description="Edit the Facebook lead workflow"
            breadcrumb={[
              { label: 'Facebook Integration', link: '/facebook/workflows' },
              { label: 'Edit Workflow', link: null },
            ]}
          />
        </div>
        <div className="header-actions">
          <label className="toggle-switch">
            <input type="checkbox" checked={status === 'active'} onChange={(e) => setStatus(e.target.checked ? 'active' : 'inactive')} />
            <span className="toggle-slider" />
            <span className="toggle-label">{status === 'active' ? 'On' : 'Off'}</span>
          </label>
        </div>
      </div>

      <div className="workflow-form-card">
        <div className="form-group">
          <label>Workflow Name <span className="required">*</span></label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={errors.name ? 'error' : ''} />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Facebook Page</label>
            <input type="text" value={workflow.pageName ?? ''} disabled />
          </div>
          <div className="form-group">
            <label>Lead Form</label>
            <input type="text" value={workflow.facebookFormName} disabled />
          </div>
        </div>

        <DefaultValuesSection
          mappingOptions={mappingOptions}
          sourceName={sourceName}
          onSourceChange={setSourceName}
          statusName={statusName}
          onStatusChange={setStatusName}
          sourceError={errors.sourceName}
        />

        <div className="form-group">
          <label>Field Mapping</label>
          <FieldMappingBuilder
            rows={mapping.rows}
            form={selectedForm}
            mappingOptions={mappingOptions}
            onAddRow={mapping.addRow}
            onUpdateRow={mapping.updateRow}
            onRemoveRow={mapping.removeRow}
          />
          {errors.mappings && <span className="error-message">{errors.mappings}</span>}
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Saving…' : 'Save Changes'}
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/facebook/workflows')}>Cancel</button>
          <button className="btn btn-danger" onClick={handleDelete}>Delete Workflow</button>
        </div>
      </div>

      <ToastNotification isVisible={toast.showToast} type={toast.toastType} message={toast.toastMessage} onDismiss={() => toast.setShowToast(false)} />
    </div>
  );
};

export default EditWorkflowPage;
