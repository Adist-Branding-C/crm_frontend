import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { DollarSign, Phone, Calendar } from 'lucide-react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { formatDate } from '../../../shared/utils/dateUtils';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import ToastNotification from '../../../shared/components/ToastNotification';
import { useToast } from '../../../shared/hooks/useToast';
import { useDebouncedSearch } from '../../../shared/hooks/useDebouncedSearch';
import { useSalesPipelineFilters } from '../hooks/useSalesPipelineFilters';
import { useSalesPipelineStaffOptions } from '../hooks/useSalesPipelineStaffOptions';
import { useDealsPipeline } from '../hooks/useDealsPipeline';
import { useLeadsPipeline } from '../hooks/useLeadsPipeline';
import { useTasksPipeline } from '../hooks/useTasksPipeline';
import { usePipelineDragDrop } from '../hooks/usePipelineDragDrop';
import { PipelineMapper } from '../mappers/pipeline.mapper';
import PipelineToolbar from '../components/PipelineToolbar';
import PipelineFilters from '../components/PipelineFilters';
import DealPipelineBoard from '../components/DealPipelineBoard';
import LeadPipelineBoard from '../components/LeadPipelineBoard';
import TaskPipelineBoard from '../components/TaskPipelineBoard';
import type { ActiveView } from '../types';
import './SalesPipelinePage.css';

const SalesPipelinePage: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('deals');
  const [committedSearch, setCommittedSearch] = useState('');
  const activeViewRef = useRef(activeView);
  activeViewRef.current = activeView;

  const toast = useToast();
  const reportError = useCallback(
    (message: string) => toast.showToastMessage(message, 'error'),
    [toast.showToastMessage],
  );

  const search = useDebouncedSearch(setCommittedSearch);
  const filters = useSalesPipelineFilters();
  const { staffOptions } = useSalesPipelineStaffOptions();
  const deals = useDealsPipeline(reportError);
  const leads = useLeadsPipeline(reportError);
  const tasks = useTasksPipeline(reportError);
  const dragDrop = usePipelineDragDrop(
    deals.setStatusGroups,
    leads.setLeadGroups,
    tasks.setTaskGroups,
    reportError,
  );

  const filterParams = useMemo(
    () =>
      PipelineMapper.toQueryParams(
        committedSearch,
        filters.dateFrom,
        filters.dateTo,
        filters.selectedAgent,
      ),
    [committedSearch, filters.dateFrom, filters.dateTo, filters.selectedAgent],
  );

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      deals.fetchDeals(filterParams);
      return;
    }
    const view = activeViewRef.current;
    if (view === 'deals') deals.fetchDeals(filterParams);
    else if (view === 'leads') leads.fetchLeads(filterParams);
    else if (view === 'tasks') tasks.fetchTasks(filterParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams]);

  const handleViewDeals = useCallback(() => {
    setActiveView('deals');
    deals.fetchDeals(filterParams);
  }, [deals.fetchDeals, filterParams]);

  const handleViewLeads = useCallback(() => {
    setActiveView('leads');
    leads.fetchLeads(filterParams);
  }, [leads.fetchLeads, filterParams]);

  const handleViewTasks = useCallback(() => {
    setActiveView('tasks');
    tasks.fetchTasks(filterParams);
  }, [tasks.fetchTasks, filterParams]);

  const handleClearFilters = useCallback(() => {
    filters.clearFilters();
    filters.setShowDateFilter(false);
  }, [filters]);

  const loading =
    activeView === 'deals'
      ? deals.isLoading
      : activeView === 'leads'
        ? leads.isLoading
        : tasks.isLoading;

  return (
    <PageContainer>
      <PageHeader
        title="Sales Pipeline"
        description="Manage deals through your sales pipeline stages"
      />

      <div className="pipeline-toolbar">
        <div className="pipeline-left">
          <PipelineToolbar
            searchQuery={search.searchValue}
            setSearchQuery={search.handleSearchChange}
            activeView={activeView}
            loading={loading}
            onViewLeads={handleViewLeads}
            onViewDeals={handleViewDeals}
            onViewTasks={handleViewTasks}
          />
          <PipelineFilters
            showDateFilter={filters.showDateFilter}
            setShowDateFilter={filters.setShowDateFilter}
            dateFrom={filters.dateFrom}
            setDateFrom={filters.setDateFrom}
            dateTo={filters.dateTo}
            setDateTo={filters.setDateTo}
            selectedAgent={filters.selectedAgent}
            setSelectedAgent={filters.setSelectedAgent}
            staffOptions={staffOptions}
            filterRef={filters.filterRef}
            onClearFilters={handleClearFilters}
          />
        </div>
      </div>

      <DndContext
        sensors={dragDrop.sensors}
        onDragStart={dragDrop.handleDragStart}
        onDragEnd={dragDrop.handleDragEnd}
        onDragCancel={dragDrop.handleDragCancel}
      >
        {activeView === 'deals' && (
          <DealPipelineBoard
            filteredStatusGroups={deals.statusGroups}
            loadingStatusId={deals.loadingStatusId}
            loadMoreDeals={deals.loadMoreDeals}
          />
        )}

        {activeView === 'leads' && (
          <LeadPipelineBoard
            filteredLeadGroups={leads.leadGroups}
            loadingLeadStatusId={leads.loadingLeadStatusId}
            loadMoreLeads={leads.loadMoreLeads}
          />
        )}

        {activeView === 'tasks' && (
          <TaskPipelineBoard
            filteredTaskGroups={tasks.taskGroups}
            loadingTaskStatus={tasks.loadingTaskStatus}
            loadMoreTasks={tasks.loadMoreTasks}
          />
        )}

        <DragOverlay>
          {dragDrop.activeItem?.type === 'deal' && (
            <div className="deal-card deal-card--overlay">
              <div className="deal-title">{dragDrop.activeItem.deal.dealName}</div>
              <div className="deal-value">
                <DollarSign size={14} />
                {dragDrop.activeItem.deal.amount.toLocaleString()}
              </div>
              <div className="deal-due">
                <Calendar size={12} />
                <span>
                  {dragDrop.activeItem.deal.endDate
                    ? formatDate(dragDrop.activeItem.deal.endDate)
                    : 'No due date'}
                </span>
              </div>
            </div>
          )}
          {dragDrop.activeItem?.type === 'lead' && (
            <div className="deal-card deal-card--overlay">
              <div className="deal-title">{dragDrop.activeItem.lead.name}</div>
              <div className="deal-value">
                <Phone size={14} />
                {dragDrop.activeItem.lead.phone}
              </div>
              <div className="deal-due">
                <Calendar size={12} />
                <span>Added {formatDate(dragDrop.activeItem.lead.createdAt)}</span>
              </div>
            </div>
          )}
          {dragDrop.activeItem?.type === 'task' && (
            <div className="deal-card deal-card--overlay">
              <div className="deal-title">{dragDrop.activeItem.task.title}</div>
              <div className="deal-due">
                <Calendar size={12} />
                <span>
                  {dragDrop.activeItem.task.scheduledDate
                    ? formatDate(dragDrop.activeItem.task.scheduledDate)
                    : 'No due date'}
                </span>
              </div>
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
};

export default SalesPipelinePage;
