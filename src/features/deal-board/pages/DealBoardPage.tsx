import { useCallback, useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import EmptyState from '../../../shared/components/EmptyState';
import ToastNotification from '../../../shared/components/ToastNotification';
import { useToast } from '../../../shared/hooks/useToast';
import { useDealsPipeline } from '../../sales-pipeline/hooks/useDealsPipeline';
import { usePipelineDragDrop } from '../../sales-pipeline/hooks/usePipelineDragDrop';
import DealPipelineBoard from '../../sales-pipeline/components/DealPipelineBoard';
import DealPage from '../../deal/pages/DealPage';
import { useSelectedPipeline } from '../hooks/useSelectedPipeline';
import { useDealBoardStats } from '../hooks/useDealBoardStats';
import PipelinePicker from '../components/PipelinePicker';
import ViewToggle from '../components/ViewToggle';
import DealBoardStatsBar from '../components/DealBoardStatsBar';
import { DEAL_BOARD_VIEW_STORAGE_KEY, type DealBoardView } from '../constants/dealBoard.constants';
import type { LeadStatusGroup, TaskStatusGroup } from '../../sales-pipeline/types/interface';
// DealPipelineBoard/DealCard/column styles (.pipeline-board, .column-header,
// .deal-card, etc.) live here, not in a component-local stylesheet - shared
// with SalesPipelinePage, which is why this page must import it too.
import '../../sales-pipeline/pages/SalesPipelinePage.css';
import './DealBoardPage.css';

function readStoredView(): DealBoardView {
  try {
    const stored = localStorage.getItem(DEAL_BOARD_VIEW_STORAGE_KEY);
    return stored === 'table' ? 'table' : 'kanban';
  } catch {
    return 'kanban';
  }
}

/**
 * Unified deal list: one page, Kanban ⇄ Table toggle, scoped to a picked
 * pipeline. Composes existing, already-tested pieces rather than
 * duplicating them - the Kanban side reuses DealPipelineBoard/DealCard/
 * usePipelineDragDrop from sales-pipeline (unchanged for Lead/Task, which
 * still live on SalesPipelinePage), and the Table side embeds the existing
 * DealPage exactly as it is, filters/sort/export/drafts and all.
 *
 * Used by:
 * - salesRoutes (/user/deals)
 */
function DealBoardPage() {
  const [view, setViewState] = useState<DealBoardView>(readStoredView);
  const toast = useToast();
  const reportError = useCallback(
    (message: string) => toast.showToastMessage(message, 'error'),
    [toast.showToastMessage],
  );

  const { pipelines, selectedPipelineId, setSelectedPipelineId, isLoading: pipelinesLoading } =
    useSelectedPipeline();
  const deals = useDealsPipeline(reportError);

  // usePipelineDragDrop is shared with Lead/Task on SalesPipelinePage - this
  // page only ever renders the 'deal' branch, but the hook's signature
  // needs all three setters. Unused local state, never rendered.
  const [, setLeadGroups] = useState<LeadStatusGroup[]>([]);
  const [, setTaskGroups] = useState<TaskStatusGroup[]>([]);
  const dragDrop = usePipelineDragDrop(deals.setStatusGroups, setLeadGroups, setTaskGroups, reportError);

  const stats = useDealBoardStats(deals.statusGroups);

  useEffect(() => {
    if (selectedPipelineId === null) return;
    deals.fetchDeals({ pipelineId: selectedPipelineId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPipelineId]);

  const handleViewChange = useCallback((next: DealBoardView) => {
    setViewState(next);
    try {
      localStorage.setItem(DEAL_BOARD_VIEW_STORAGE_KEY, next);
    } catch {
      // Non-fatal - the toggle still works this session.
    }
  }, []);

  if (view === 'table') {
    // We inject the pipeline picker and view toggle directly into DealPage's
    // header via the headerExtra prop, keeping the table view experience
    // seamlessly integrated without overlapping elements.
    return (
      <div className="deal-board-table-view">
        <DealPage
          headerExtra={
            <>
              <PipelinePicker
                pipelines={pipelines}
                selectedPipelineId={selectedPipelineId}
                onChange={setSelectedPipelineId}
              />
              <ViewToggle view={view} onChange={handleViewChange} />
            </>
          }
        />
      </div>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="Deals"
        description="Track deals through your sales pipeline"
        action={
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
            <PipelinePicker
              pipelines={pipelines}
              selectedPipelineId={selectedPipelineId}
              onChange={setSelectedPipelineId}
            />
            <ViewToggle view={view} onChange={handleViewChange} />
          </div>
        }
      />

      {!pipelinesLoading && !deals.isLoading && deals.statusGroups.length > 0 && (
        <DealBoardStatsBar stats={stats} />
      )}

      <DndContext
        sensors={dragDrop.sensors}
        onDragStart={dragDrop.handleDragStart}
        onDragEnd={dragDrop.handleDragEnd}
        onDragCancel={dragDrop.handleDragCancel}
      >
        {deals.isLoading && deals.statusGroups.length === 0 ? null : deals.error ? (
          <EmptyState
            message={deals.error}
            icon={<AlertTriangle size={48} />}
            action={
              <button
                type="button"
                className="btn btn-secondary"
                style={{ marginTop: '1rem' }}
                onClick={() => selectedPipelineId !== null && deals.fetchDeals({ pipelineId: selectedPipelineId })}
              >
                Retry
              </button>
            }
          />
        ) : deals.statusGroups.length === 0 ? (
          <EmptyState message="No stages in this pipeline yet - add some in Settings > Deal Pipelines" />
        ) : (
          <DealPipelineBoard
            filteredStatusGroups={deals.statusGroups}
            loadingStatusId={deals.loadingStatusId}
            loadMoreDeals={deals.loadMoreDeals}
          />
        )}

        <DragOverlay>
          {dragDrop.activeItem?.type === 'deal' && (
            <div className="deal-card deal-card--overlay">
              <div className="deal-title">{dragDrop.activeItem.deal.dealName}</div>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <ToastNotification
        isVisible={toast.showToast}
        type={toast.toastType}
        message={toast.toastMessage}
        onDismiss={() => toast.setShowToast(false)}
      />
    </PageContainer>
  );
}

export default DealBoardPage;
