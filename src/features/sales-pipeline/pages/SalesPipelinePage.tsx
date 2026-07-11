import React from 'react';
import { Plus, DollarSign, Phone, Calendar } from 'lucide-react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { formatDate } from '../../../shared/utils/dateUtils';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import AddDealDrawer from '../../../shared/components/drawers/AddDealDrawer';
import ToastNotification from '../../../shared/components/ToastNotification';
import { useSalesPipelineData } from '../hooks/useSalesPipelineData';
import PipelineToolbar from '../components/PipelineToolbar';
import PipelineFilters from '../components/PipelineFilters';
import DealPipelineBoard from '../components/DealPipelineBoard';
import LeadPipelineBoard from '../components/LeadPipelineBoard';
import TaskPipelineBoard from '../components/TaskPipelineBoard';
import './SalesPipelinePage.css';

const SalesPipelinePage: React.FC = () => {
  const {
    searchQuery, setSearchQuery,
    showDateFilter, setShowDateFilter,
    dateFrom, setDateFrom,
    dateTo, setDateTo,
    selectedAgent, setSelectedAgent,
    staffOptions,
    isDrawerOpen, setIsDrawerOpen,
    activeView, loading,
    loadingStatusId,
    loadingLeadStatusId,
    loadingTaskStatus,
    fetchLeads, fetchDeals, fetchTasks,
    loadMoreDeals,
    loadMoreLeads,
    loadMoreTasks,
    filterRef,
    clearFilters, filteredStatusGroups, filteredLeadGroups, filteredTaskGroups,
    sensors, activeItem, handleDragStart, handleDragEnd, handleDragCancel,
    handleSaveDeal, getAvatarColor,
    toast,
  } = useSalesPipelineData();

  return (
    <PageContainer>
      <PageHeader
        title="Sales Pipeline"
        description="Manage deals through your sales pipeline stages"
      />

      <div className="pipeline-toolbar">
        <div className="pipeline-left">
          <PipelineToolbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeView={activeView}
            loading={loading}
            fetchLeads={fetchLeads}
            fetchDeals={fetchDeals}
            fetchTasks={fetchTasks}
          />
          <PipelineFilters
            showDateFilter={showDateFilter}
            setShowDateFilter={setShowDateFilter}
            dateFrom={dateFrom}
            setDateFrom={setDateFrom}
            dateTo={dateTo}
            setDateTo={setDateTo}
            selectedAgent={selectedAgent}
            setSelectedAgent={setSelectedAgent}
            staffOptions={staffOptions}
            filterRef={filterRef}
            clearFilters={clearFilters}
          />
        </div>
        {activeView === 'deals' && (
          <div className="pipeline-actions">
            <button className="btn btn-primary" onClick={() => setIsDrawerOpen(true)}>
              <Plus size={16} />
              Add Deal
            </button>
          </div>
        )}
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {activeView === 'deals' && (
          <DealPipelineBoard
            filteredStatusGroups={filteredStatusGroups}
            loadingStatusId={loadingStatusId}
            loadMoreDeals={loadMoreDeals}
            getAvatarColor={getAvatarColor}
          />
        )}

        {activeView === 'leads' && (
          <LeadPipelineBoard
            filteredLeadGroups={filteredLeadGroups}
            loadingLeadStatusId={loadingLeadStatusId}
            loadMoreLeads={loadMoreLeads}
            getAvatarColor={getAvatarColor}
          />
        )}

        {activeView === 'tasks' && (
          <TaskPipelineBoard
            filteredTaskGroups={filteredTaskGroups}
            loadingTaskStatus={loadingTaskStatus}
            loadMoreTasks={loadMoreTasks}
            getAvatarColor={getAvatarColor}
          />
        )}

        <DragOverlay>
          {activeItem?.type === 'deal' && (
            <div className="deal-card deal-card--overlay">
              <div className="deal-title">{activeItem.deal.dealName}</div>
              <div className="deal-value">
                <DollarSign size={14} />
                {activeItem.deal.amount.toLocaleString()}
              </div>
              <div className="deal-due">
                <Calendar size={12} />
                <span>
                  {activeItem.deal.endDate
                    ? formatDate(activeItem.deal.endDate)
                    : 'No due date'}
                </span>
              </div>
            </div>
          )}
          {activeItem?.type === 'lead' && (
            <div className="deal-card deal-card--overlay">
              <div className="deal-title">{activeItem.lead.name}</div>
              <div className="deal-value">
                <Phone size={14} />
                {activeItem.lead.phone}
              </div>
              <div className="deal-due">
                <Calendar size={12} />
                <span>Added {formatDate(activeItem.lead.createdAt)}</span>
              </div>
            </div>
          )}
          {activeItem?.type === 'task' && (
            <div className="deal-card deal-card--overlay">
              <div className="deal-title">{activeItem.task.title}</div>
              <div className="deal-due">
                <Calendar size={12} />
                <span>
                  {activeItem.task.scheduledDate
                    ? formatDate(activeItem.task.scheduledDate)
                    : 'No due date'}
                </span>
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <AddDealDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onSave={handleSaveDeal} />

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
