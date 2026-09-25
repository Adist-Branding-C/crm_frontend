import { X } from 'lucide-react';
import ToastNotification from '../../../shared/components/ToastNotification';
import type { useCloneWorkflowModal } from '../hooks/useCloneWorkflowModal';

type CloneWorkflowModalProps = ReturnType<typeof useCloneWorkflowModal>;

// Facebook only allows one Workflow per Lead Form, so the clone can't reuse
// the original's Form - the admin picks a different one here; everything
// else (field mappings, status) is carried over by the backend.
const CloneWorkflowModal = ({
  source,
  close,
  browse,
  name,
  setName,
  connectionId,
  pageId,
  formId,
  errors,
  submitting,
  handleConnectionChange,
  handlePageChange,
  setFormId,
  handleSubmit,
  toast,
}: CloneWorkflowModalProps) => {
  return (
    <>
      {source && (
        <div className="modal-overlay" onClick={close}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Clone Workflow</h2>
              <button className="modal-close" onClick={close}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <p className="hint-text">
                Creating a copy of <strong>{source.name}</strong>. Facebook only allows one workflow per Lead Form, so
                choose a different Lead Form for the copy.
              </p>

              {(!source.connectionId || !source.facebookPageId) && (
                <p className="error-message">
                  This Workflow's Facebook Page could not be found (it may have been disconnected). Pick a Facebook
                  Account and Page below to continue.
                </p>
              )}

              <div className="form-group">
                <label>Workflow Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={`${source.name} - Copy`} />
              </div>

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
                {connectionId && !browse.loadingPages && browse.pages.length === 0 && (
                  <span className="hint-text">No Facebook Pages found for this account.</span>
                )}
              </div>

              <div className="form-group">
                <label>Select Lead Form <span className="required">*</span></label>
                <select
                  value={formId}
                  onChange={(e) => setFormId(e.target.value)}
                  disabled={!pageId || browse.loadingForms}
                  className={errors.formId ? 'error' : ''}
                >
                  <option value="">{browse.loadingForms ? 'Loading forms…' : 'Select Lead Form'}</option>
                  {browse.forms
                    .filter((form) => form.id !== source.facebookFormId)
                    .map((form) => (
                      <option key={form.id} value={form.id}>{form.name}</option>
                    ))}
                </select>
                {errors.formId && <span className="error-message">{errors.formId}</span>}
                {pageId && !browse.loadingForms && browse.forms.length === 0 && (
                  <span className="hint-text">No other Lead Forms found for this Page.</span>
                )}
              </div>

              <div className="modal-actions">
                <button className="btn btn-outline" onClick={close}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? 'Cloning…' : 'Clone Workflow'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastNotification isVisible={toast.showToast} type={toast.toastType} message={toast.toastMessage} onDismiss={() => toast.setShowToast(false)} />
    </>
  );
};

export default CloneWorkflowModal;
