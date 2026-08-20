import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../../../shared/components/layout/PageHeader';
import ToastNotification from '../../../shared/components/ToastNotification';
import { useCreateWorkflowPage } from '../hooks/useCreateWorkflowPage';
import FieldMappingBuilder from '../components/FieldMappingBuilder';
import DefaultValuesSection from '../components/DefaultValuesSection';
import '../../../pages/FacebookWorkflows.css';

const CreateWorkflowPage = () => {
  const navigate = useNavigate();

  const {
    browse,
    name,
    setName,
    connectionId,
    pageId,
    formId,
    selectedForm,
    sourceName,
    setSourceName,
    statusName,
    setStatusName,
    mapping,
    errors,
    submitting,
    handleConnectionChange,
    handlePageChange,
    handleFormChange,
    handleSubmit,
    toast,
  } = useCreateWorkflowPage();

  return (
    <div className="create-workflow-page">
      <PageHeader
        title="Create Workflow"
        description="Create a new Facebook lead workflow"
        breadcrumb={[
          { label: 'Facebook Integration', link: '/facebook/workflows' },
          { label: 'Create Workflow', link: null },
        ]}
      />

      <div className="workflow-form-card">
        {!browse.initializing && browse.connections.length === 0 ? (
          <div className="empty-state">
            <h3>No Facebook account connected yet</h3>
            <p>Connect a Facebook Business account before creating a Workflow.</p>
            <Link className="btn btn-primary" to="/facebook/connections">Go to Facebook Connections</Link>
          </div>
        ) : (
          <>
            <div className="form-group">
              <label>Workflow Name <span className="required">*</span></label>
              <input
                type="text"
                placeholder="Enter workflow name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Facebook Account <span className="required">*</span></label>
                <select value={connectionId} onChange={(e) => handleConnectionChange(e.target.value)} className={errors.connectionId ? 'error' : ''}>
                  <option value="">Select Account</option>
                  {browse.connections.map((connection) => (
                    <option key={connection.id} value={connection.id}>{connection.facebookBusinessId}</option>
                  ))}
                </select>
                {errors.connectionId && <span className="error-message">{errors.connectionId}</span>}
              </div>

              <div className="form-group">
                <label>Choose Facebook Page <span className="required">*</span></label>
                <select
                  value={pageId}
                  onChange={(e) => handlePageChange(e.target.value)}
                  disabled={!connectionId || browse.loadingPages}
                  className={errors.pageId ? 'error' : ''}
                >
                  <option value="">{browse.loadingPages ? 'Loading pages…' : 'Select Facebook Page'}</option>
                  {browse.pages.map((page) => (
                    <option key={page.id} value={page.id}>{page.name}</option>
                  ))}
                </select>
                {errors.pageId && <span className="error-message">{errors.pageId}</span>}
              </div>

              <div className="form-group">
                <label>Select Lead Form <span className="required">*</span></label>
                <select
                  value={formId}
                  onChange={(e) => handleFormChange(e.target.value)}
                  disabled={!pageId || browse.loadingForms}
                  className={errors.formId ? 'error' : ''}
                >
                  <option value="">{browse.loadingForms ? 'Loading forms…' : 'Select Lead Form'}</option>
                  {browse.forms.map((form) => (
                    <option key={form.id} value={form.id}>{form.name}</option>
                  ))}
                </select>
                {errors.formId && <span className="error-message">{errors.formId}</span>}
              </div>
            </div>

            <DefaultValuesSection
              mappingOptions={browse.mappingOptions}
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
                mappingOptions={browse.mappingOptions}
                onAddRow={mapping.addRow}
                onUpdateRow={mapping.updateRow}
                onRemoveRow={mapping.removeRow}
              />
              {errors.mappings && <span className="error-message">{errors.mappings}</span>}
            </div>

            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
                {submitting ? 'Saving…' : 'Save Workflow'}
              </button>
              <button className="btn btn-outline" onClick={() => navigate('/facebook/workflows')}>Cancel</button>
            </div>
          </>
        )}
      </div>

      <ToastNotification isVisible={toast.showToast} type={toast.toastType} message={toast.toastMessage} onDismiss={() => toast.setShowToast(false)} />
    </div>
  );
};

export default CreateWorkflowPage;
