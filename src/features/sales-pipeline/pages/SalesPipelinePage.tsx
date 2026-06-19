import React from 'react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import AddDealDrawer from '../../../shared/components/drawers/AddDealDrawer';
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
    selectedType, setSelectedType,
    isDrawerOpen, setIsDrawerOpen,
    activeView, loading, error,
    loadingStatusId,
    loadingLeadStatusId,
    loadingTaskStatus,
    fetchLeads, fetchDeals, fetchTasks,
    loadMoreDeals,
    loadMoreLeads,
    loadMoreTasks,
    filterRef,
    clearFilters, filteredStatusGroups, filteredLeadGroups, filteredTaskGroups,
    handleDragStart, handleDragOver, handleDrop,
    handleSaveDeal, getAvatarColor,
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
            error={error}
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
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            filterRef={filterRef}
            clearFilters={clearFilters}
          />
        </div>
      </div>

      {activeView === 'deals' && (
        <DealPipelineBoard
          filteredStatusGroups={filteredStatusGroups}
          loadingStatusId={loadingStatusId}
          loadMoreDeals={loadMoreDeals}
          handleDragStart={handleDragStart}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
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

      <AddDealDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onSave={handleSaveDeal} />
    </PageContainer>
  );
};

export default SalesPipelinePage;
