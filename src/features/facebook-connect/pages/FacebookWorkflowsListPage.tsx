import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Edit2, Trash2, X, AlertTriangle } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import ToastNotification from '../../../shared/components/ToastNotification';
import { useFacebookWorkflows } from '../hooks/useFacebookWorkflows';
import type { Workflow } from '../types';
import '../../../pages/FacebookWorkflows.css';

const FacebookWorkflowsListPage = () => {
  const navigate = useNavigate();
  const { workflows, loading, searchQuery, setSearchQuery, statusFilter, setStatusFilter, toggleStatus, remove, toast } = useFacebookWorkflows();
  const [deletingWorkflow, setDeletingWorkflow] = useState<Workflow | null>(null);

  const confirmDelete = async () => {
    if (!deletingWorkflow) return;
    await remove(deletingWorkflow.id);
    setDeletingWorkflow(null);
  };

  return (
    <div className="facebook-workflows-page">
      <PageHeader
        title="Facebook Integration"
        description="Manage Facebook lead form workflows and routing"
        breadcrumb={[{ label: 'Facebook Integration', link: null }]}
        action={
          <button className="btn btn-outline" onClick={() => navigate('/facebook/connections')}>
            Manage Connections
          </button>
        }
      />

      <div className="workflows-toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <Search size={16} />
            <input type="text" placeholder="Search by workflow name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <select className="status-filter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-primary" onClick={() => navigate('/facebook/workflows/create')}>
            <Plus size={16} />
            Create Workflow
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : workflows.length === 0 ? (
        <div className="empty-state">
          <h3>No workflows created yet</h3>
          <p>Connect Facebook forms and automate lead routing.</p>
          <button className="btn btn-primary" onClick={() => navigate('/facebook/workflows/create')}>
            <Plus size={16} />
            Create First Workflow
          </button>
        </div>
      ) : (
        <div className="workflows-table-wrapper">
          <table className="workflows-table">
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Workflow Name</th>
                <th>Lead Form Name</th>
                <th>Status</th>
                <th>Facebook Subscription</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workflows.map((workflow, index) => (
                <tr key={workflow.id}>
                  <td>{index + 1}</td>
                  <td>
                    <button className="workflow-name-link" onClick={() => navigate(`/facebook/workflows/${workflow.id}/edit`)}>
                      {workflow.name}
                    </button>
                  </td>
                  <td>{workflow.facebookFormName}</td>
                  <td>
                    <label className="toggle-switch toggle-switch-sm">
                      <input type="checkbox" checked={workflow.status === 'active'} onChange={() => toggleStatus(workflow)} />
                      <span className="toggle-slider" />
                    </label>
                  </td>
                  <td>
                    <span className={`status-badge ${workflow.isSubscribed ? 'active' : 'inactive'}`}>
                      {workflow.isSubscribed ? 'Subscribed' : 'Not subscribed'}
                    </span>
                  </td>
                  <td>{new Date(workflow.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="actions-cell">
                      <button className="action-menu-btn" onClick={() => navigate(`/facebook/workflows/${workflow.id}/edit`)} title="Edit">
                        <Edit2 size={14} />
                      </button>
                      <button className="action-menu-btn" onClick={() => setDeletingWorkflow(workflow)} title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deletingWorkflow && (
        <div className="modal-overlay" onClick={() => setDeletingWorkflow(null)}>
          <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Delete Workflow?</h3>
              <button className="modal-close" onClick={() => setDeletingWorkflow(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="delete-warning">
                <AlertTriangle size={24} />
                <p>This action cannot be undone.</p>
              </div>
              <p className="delete-message">Are you sure you want to delete <strong>{deletingWorkflow.name}</strong>?</p>
              <div className="modal-actions">
                <button className="btn btn-outline" onClick={() => setDeletingWorkflow(null)}>Cancel</button>
                <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastNotification isVisible={toast.showToast} type={toast.toastType} message={toast.toastMessage} onDismiss={() => toast.setShowToast(false)} />
    </div>
  );
};

export default FacebookWorkflowsListPage;
