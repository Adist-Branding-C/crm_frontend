import { useNavigate } from 'react-router-dom';
import { ChevronDown, Filter, Plus, Workflow } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../shared/components/table';
import ToastNotification from '../../../shared/components/ToastNotification';
import RuleRow from '../components/RuleRow';
import ConfirmDialog from '../components/ConfirmDialog';
import { useAutomationRulesList } from '../hooks/useAutomationRulesList';
import { useRuleActions } from '../hooks/useRuleActions';
import { TRIGGER_TYPE_FILTER_OPTIONS } from '../constants';
import type { AutomationRule } from '../types';
import '../styles/automation.css';
import './AutomationRulesListPage.css';

const AutomationRulesListPage = () => {
  const navigate = useNavigate();
  const list = useAutomationRulesList();
  const { togglingId, handleToggle, deleteConfirm, toast } = useRuleActions();

  const handleEdit = (rule: AutomationRule) => navigate(`/automation-rules/${rule.id}/edit`);
  const handleViewLogs = (rule: AutomationRule) => navigate(`/automation-rules/${rule.id}/execution-logs`);

  return (
    <div className="automation-rules-page">
      <PageHeader
        title="Automation Rules"
        description="Automate lead assignment, tasks, notifications, and webhooks"
        breadcrumb={false}
        action={
          <button className="btn btn-primary" onClick={() => navigate('/automation-rules/new')}>
            <Plus size={16} /> Create Rule
          </button>
        }
      />

      <div className="table-container">
        {list.isLoading ? (
          <div className="automation-empty-page">
            <p>Loading rules…</p>
          </div>
        ) : list.isEmpty ? (
          <div className="automation-empty-page">
            <Workflow size={40} />
            <h3>No automation rules yet</h3>
            <p>Automate lead assignment, tasks, and notifications</p>
            <button className="btn btn-primary" onClick={() => navigate('/automation-rules/new')}>
              <Plus size={16} /> Create Your First Rule
            </button>
          </div>
        ) : (
          <>
            <TableNav
              searchQuery={list.searchQuery}
              onSearchChange={list.setSearchQuery}
              searchPlaceholder="Search rules by name"
              rowsPerPage={list.rowsPerPage}
              onRowsPerPageChange={list.handleRowsPerPageChange}
            >
              <button className="btn btn-secondary" onClick={() => list.setShowFilters(!list.showFilters)}>
                <Filter size={16} /> Filter <ChevronDown size={14} className={list.showFilters ? 'rotate' : ''} />
              </button>
            </TableNav>

            {list.showFilters && (
              <div className="filters-panel">
                <div className="filter-row">
                  <div className="filter-group">
                    <label>Trigger Type</label>
                    <select value={list.triggerTypeFilter} onChange={(e) => list.setTriggerTypeFilter(e.target.value as typeof list.triggerTypeFilter)}>
                      {TRIGGER_TYPE_FILTER_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>Status</label>
                    <select value={list.activeFilter} onChange={(e) => list.setActiveFilter(e.target.value as typeof list.activeFilter)}>
                      <option value="">All Statuses</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="filter-actions">
                    <button className="btn btn-secondary" onClick={list.clearFilters}>Clear</button>
                  </div>
                </div>
              </div>
            )}

            <Table wrapperClassName="table-scroll" className="data-table">
              <THead>
                <TRow>
                  <TCell variant="th">Name</TCell>
                  <TCell variant="th">Trigger Type</TCell>
                  <TCell variant="th">Status</TCell>
                  <TCell variant="th">Last Modified</TCell>
                  <TCell variant="th">Actions</TCell>
                </TRow>
              </THead>
              <TBody>
                {list.rules.length === 0 ? (
                  <EmptyState colSpan={5} message="No rules match your filters" />
                ) : (
                  list.rules.map((rule) => (
                    <RuleRow
                      key={rule.id}
                      rule={rule}
                      isToggling={togglingId === rule.id}
                      onToggle={handleToggle}
                      onEdit={handleEdit}
                      onViewLogs={handleViewLogs}
                      onDelete={deleteConfirm.handleDeleteClick}
                    />
                  ))
                )}
              </TBody>
            </Table>

            <Pagination
              currentPage={list.currentPage}
              totalPages={list.totalPages}
              totalItems={list.totalItems}
              rowsPerPage={list.rowsPerPage}
              onPageChange={list.setCurrentPage}
            />
          </>
        )}
      </div>

      <ConfirmDialog
        isOpen={!!deleteConfirm.deletingItem}
        title="Delete Rule"
        message="Delete this rule? Execution history will be kept."
        confirmLabel="Delete"
        danger
        onConfirm={deleteConfirm.handleConfirmDelete}
        onClose={deleteConfirm.closeDeleteModal}
      />

      <ToastNotification
        isVisible={toast.showToast}
        type={toast.toastType}
        message={toast.toastMessage}
        onDismiss={() => toast.setShowToast(false)}
      />
    </div>
  );
};

export default AutomationRulesListPage;
