import React, { useState } from 'react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import ReportStateWrapper from '../../components/ReportStateWrapper';
import { useStageFunnel } from '../../../deal-analytics/hooks/useStageFunnel';
import { useDealReportFilterOptions } from '../../../deal-analytics/hooks/useDealReportFilterOptions';
import { formatAmountWithCurrency } from '../../../../shared/constants/currencies';
import { useTablePagination } from '../../../../shared/hooks/useTablePagination';
import Pagination from '../../../../shared/components/table/Pagination';
import '../../../dashboard/components/widgets/WidgetStyles.css';


const DealPipelineSummaryReport = () => {
  const [pipelineId, setPipelineId] = useState<number | undefined>(undefined);
  const { data, isLoading, isError, error, refetch } = useStageFunnel(pipelineId);
  const { pipelineOptions, defaultPipelineId } = useDealReportFilterOptions();

  const stages = data?.stages ?? [];
  const totalValue = stages.reduce((sum, s) => sum + Number(s.amount), 0);
  const totalCount = stages.reduce((sum, s) => sum + s.count, 0);
  const { currentPage, setCurrentPage, totalPages, paginatedData: pagedStages } = useTablePagination(stages);

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Deal Stage Distribution / Pipeline Summary" description="Deal count and pipeline value across each stage" breadcrumb={false} />

      <div className="filters-panel">
        <div className="filter-row">
          <div className="filter-group" style={{ maxWidth: '280px' }}>
            <label>Pipeline</label>
            <select
              value={pipelineId ?? defaultPipelineId ?? ''}
              onChange={(e) => setPipelineId(e.target.value ? Number(e.target.value) : undefined)}
            >
              {pipelineOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-actions">
            <button className="btn btn-secondary" onClick={() => setPipelineId(undefined)}>Clear</button>
          </div>
        </div>
      </div>

      <ReportStateWrapper isLoading={isLoading} isError={isError} error={error} onRetry={refetch} isEmpty={!isLoading && !isError && stages.length === 0} emptyMessage="No stages found for this pipeline">

        <div className="widget-status-text" style={{ marginBottom: '0.75rem' }}>
          Amounts below combine all deal currencies for this pipeline. If your company records deals in more than one currency, treat totals as approximate.
        </div>
        <div style={{ display: 'flex', gap: '2rem', margin: '1rem 0' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Total Deals</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{totalCount}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Overall Pipeline Value</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{formatAmountWithCurrency(totalValue)}</div>
          </div>
        </div>

        <div className="table-container">
          <table className="enquiries-table deal-report-table">
            <thead>
              <tr>
                <th>Stage</th>
                <th>Outcome</th>
                <th>Win Probability</th>
                <th>Deal Count</th>
                <th>Pipeline Value</th>
                <th>% of Total Value</th>
              </tr>
            </thead>
            <tbody>
              {pagedStages.map((s) => (
                <tr key={s.stageId}>
                  <td>{s.stageName}</td>
                  <td>{s.outcome}</td>
                  <td>{s.probability}%</td>
                  <td>{s.count}</td>
                  <td>{formatAmountWithCurrency(s.amount)}</td>
                  <td>{totalValue > 0 ? ((Number(s.amount) / totalValue) * 100).toFixed(2) : '0'}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={stages.length}
          rowsPerPage={10}
          onPageChange={setCurrentPage}
        />
      </ReportStateWrapper>
    </div>
  );
};

export default DealPipelineSummaryReport;
