import { useCallback, useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import EmptyState from '../../../shared/components/EmptyState';
import ToastNotification from '../../../shared/components/ToastNotification';
import { useToast } from '../../../shared/hooks/useToast';
import { useDrawer } from '../../../shared/hooks/useDrawer';
import { DEFAULT_CURRENCY } from '../../../shared/constants/currencies';
import { useDealsPipeline } from '../../sales-pipeline/hooks/useDealsPipeline';
import { usePipelineDragDrop } from '../../sales-pipeline/hooks/usePipelineDragDrop';
import DealPipelineBoard from '../../sales-pipeline/components/DealPipelineBoard';
import DealPage from '../../deal/pages/DealPage';
import DealDetailDrawer from '../../../shared/components/drawers/DealDetailDrawer';
import { dealService } from '../../deal/services/deal.service';
import { mapApiToUI } from '../../deal/utils/dealMapper';
import type { DealItem } from '../../deal/types/interface';
import { useSelectedPipeline } from '../hooks/useSelectedPipeline';
import { useDealBoardStats } from '../hooks/useDealBoardStats';
import PipelinePicker from '../components/PipelinePicker';
import ViewToggle from '../components/ViewToggle';
import DealBoardStatsBar from '../components/DealBoardStatsBar';
import { DEAL_BOARD_VIEW_STORAGE_KEY, type DealBoardView } from '../constants/dealBoard.constants';
import type { LeadStatusGroup, TaskStatusGroup, PipelineDeal } from '../../sales-pipeline/types/interface';
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

function DealBoardPage() {
  const [view, setViewState] = useState<DealBoardView>(readStoredView);
  const [summaryCurrency, setSummaryCurrency] = useState<string>(DEFAULT_CURRENCY);
  const [openingDealId, setOpeningDealId] = useState<number | null>(null);
  const [tableInitialAction, setTableInitialAction] = useState<
    { deal: DealItem; type: 'edit' | 'delete' } | null
  >(null);
  const toast = useToast();
  const reportError = useCallback(
    (message: string) => toast.showToastMessage(message, 'error'),
    [toast.showToastMessage],
  );

  const { pipelines, selectedPipelineId, setSelectedPipelineId, isLoading: pipelinesLoading } =
    useSelectedPipeline();
  const deals = useDealsPipeline(reportError);
  const detailDrawer = useDrawer<DealItem>();

  const [, setLeadGroups] = useState<LeadStatusGroup[]>([]);
  const [, setTaskGroups] = useState<TaskStatusGroup[]>([]);
  const dragDrop = usePipelineDragDrop(deals.setStatusGroups, setLeadGroups, setTaskGroups, reportError);

  const stats = useDealBoardStats(deals.statusGroups, summaryCurrency);

  const refetchBoard = useCallback(() => {
    if (selectedPipelineId !== null) deals.fetchDeals({ pipelineId: selectedPipelineId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPipelineId, deals.fetchDeals]);

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

  const handleDealCardClick = useCallback(async (deal: PipelineDeal) => {
    setOpeningDealId(deal.id);
    try {
      const res = await dealService.getDealById(String(deal.id));
      if (res.status && res.data) {
        detailDrawer.open(mapApiToUI(res.data as never));
      } else {
        reportError(res.message || 'Failed to open deal');
      }
    } catch {
      reportError('Failed to open deal');
    } finally {
      setOpeningDealId(null);
    }
  }, [detailDrawer.open, reportError]);

  const handleEditFromKanban = useCallback((deal: DealItem) => {
    detailDrawer.close();
    setTableInitialAction({ deal, type: 'edit' });
    handleViewChange('table');
  }, [detailDrawer.close, handleViewChange]);

  const handleDeleteFromKanban = useCallback((deal: DealItem) => {
    detailDrawer.close();
    setTableInitialAction({ deal, type: 'delete' });
    handleViewChange('table');
  }, [detailDrawer.close, handleViewChange]);

  const statsBar =
    !pipelinesLoading && !deals.isLoading && deals.statusGroups.length > 0 ? (
      <DealBoardStatsBar
        stats={stats}
        currency={summaryCurrency}
        onCurrencyChange={setSummaryCurrency}
      />
    ) : null;

  if (view === 'table') {
    // We inject the pipeline picker and view toggle directly into DealPage's
    // header via the headerExtra prop, and the summary bar via belowHeader
    // (rendered under DealPage's own "Deals" title, not above it), keeping
    // the table view experience seamlessly integrated.
    return (
      <div className="deal-board-table-view">
        <DealPage
          pipelineId={selectedPipelineId ?? undefined}
          initialAction={tableInitialAction}
          onInitialActionHandled={() => setTableInitialAction(null)}
          belowHeader={statsBar}
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

      {statsBar}

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
                onClick={refetchBoard}
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
            onDealClick={handleDealCardClick}
            openingDealId={openingDealId}
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

      <DealDetailDrawer
        deal={detailDrawer.item}
        isOpen={detailDrawer.isOpen}
        onClose={detailDrawer.close}
        onDealUpdated={refetchBoard}
        onEditDeal={handleEditFromKanban}
        onDeleteDeal={handleDeleteFromKanban}
      />

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
