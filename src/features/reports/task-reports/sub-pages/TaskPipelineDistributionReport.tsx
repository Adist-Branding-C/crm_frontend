import React, { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import { Table, THead, TBody, TRow, TCell, EmptyState } from '../../../../shared/components/table';
import { useTableSorting } from '../../../../shared/hooks/useTableSorting';
import { useTaskWorkflowOptions } from '../../../task/common/hooks/useTaskWorkflowOptions';
import TaskWorkflowPicker from '../../../task/kanban/components/TaskWorkflowPicker';
import PipelineDistributionChart from '../components/PipelineDistributionChart';
import PipelineDistributionStageRow from '../components/PipelineDistributionStageRow';
import { useTaskPipelineDistributionReport } from '../hooks/useTaskPipelineDistributionReport';
import type { Column } from '../../../../shared/types/table';
import '../../sub-pages/ReportsSubPages.css';

const DISTRIBUTION_COLUMNS: Column[] = [
  { key: 'stageName', label: 'Stage', sortable: true },
  { key: 'taskCount', label: 'Task Count', sortable: true },
  { key: 'avgAgeInStageHours', label: 'Avg. Age in Stage', sortable: true },
  { key: 'oldestTaskAgeHours', label: 'Oldest Task Age', sortable: true },
];

const TaskPipelineDistributionReport = () => {
  const [workflowId, setWorkflowId] = useState<string | null>(null);

  const workflowHook = useTaskWorkflowOptions();
  const report = useTaskPipelineDistributionReport();

  useEffect(() => {
    if (workflowHook.defaultWorkflowId) setWorkflowId(workflowHook.defaultWorkflowId);
  }, [workflowHook.defaultWorkflowId]);

  useEffect(() => {
    if (workflowId) report.fetchReport({ workflowId: Number(workflowId) });
  }, [workflowId, report.fetchReport]);

  const { sortedData: sortedStages, sortConfig, handleSort } = useTableSorting(report.stages);

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Workflow Pipeline / Stage Distribution Report" breadcrumb={false} />

      {workflowHook.workflows.length > 1 && (
        <div className="filters-panel">
          <div className="filter-row">
            <div className="filter-group">
              <label>Workflow</label>
              <TaskWorkflowPicker
                workflows={workflowHook.workflows}
                selectedWorkflowId={workflowId}
                onChange={setWorkflowId}
              />
            </div>
          </div>
        </div>
      )}

      <section className="pipeline-chart-card">
        <h3 className="pipeline-chart-title">
          Tasks per Stage{report.workflowName ? ` — ${report.workflowName}` : ''}
        </h3>
        {report.isLoading ? (
          <div className="table-loading">
            <Loader2 size={24} className="spin" /> Loading...
          </div>
        ) : report.error ? (
          <div className="report-load-error">{report.error}</div>
        ) : report.stages.length === 0 ? (
          <div className="report-content-empty">
            <p>No stages found for this workflow.</p>
          </div>
        ) : (
          <PipelineDistributionChart stages={report.stages} />
        )}
      </section>

      <div className="table-container">
        <Table wrapperClassName="table-scroll" className="enquiries-table">
          <THead>
            <TRow>
              {DISTRIBUTION_COLUMNS.map((col) => (
                <TCell
                  key={col.key}
                  variant="th"
                  className={col.sortable ? 'sortable' : ''}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  {col.label}
                  {col.sortable && sortConfig.key === col.key && (
                    sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                  )}
                </TCell>
              ))}
            </TRow>
          </THead>
          <TBody>
            {!report.isLoading && sortedStages.length === 0 ? (
              <EmptyState colSpan={DISTRIBUTION_COLUMNS.length} message="No stages found for this workflow" />
            ) : (
              sortedStages.map((stage) => (
                <PipelineDistributionStageRow key={stage.stageId} stage={stage} />
              ))
            )}
          </TBody>
        </Table>

        {report.isLoading && (
          <div className="table-loading">
            <Loader2 size={24} className="spin" /> Loading...
          </div>
        )}

        {report.error && !report.isLoading && <div className="report-load-error">{report.error}</div>}
      </div>
    </div>
  );
};

export default TaskPipelineDistributionReport;