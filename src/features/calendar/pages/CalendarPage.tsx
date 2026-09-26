import React from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import ToastNotification from '../../../shared/components/ToastNotification';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import { useToast } from '../../../shared/hooks/useToast';
import { useCalendarData } from '../hooks/useCalendarData';
import { useCalendarTaskFormDrawer } from '../hooks/useCalendarTaskFormDrawer';
import { toLocalDateString } from '../../../shared/utils/dateUtils';
import CalendarControls from '../components/CalendarControls';
import MonthView from '../components/MonthView';
import DayView from '../components/DayView';
import WeekView from '../components/WeekView';
import DayDrawer from '../components/DayDrawer';
import TaskFormDrawer from '../../task/common/components/TaskFormDrawer';
import './CalendarPage.css';

const CalendarPage = () => {
  const toast = useToast();
  const d = useCalendarData(toast.showToastMessage);
  const addTask = useCalendarTaskFormDrawer(d.refetch, toast.showToastMessage);

  const openAddTask = () => {
    const date = d.selectedDate ?? d.currentDate;
    addTask.open(toLocalDateString(date));
  };

  return (
    <PageContainer>
      <PageHeader
        title="Agent Calendar"
        description="Schedules tasks, appointments, and follow-ups, streamlining agent productivity and organization."
        action={
          <button className="btn btn-primary" onClick={openAddTask}>
            <Plus size={16} /> Add Task
          </button>
        }
      />

      <CalendarControls
        viewMode={d.viewMode}
        onViewModeChange={d.setViewMode}
        currentDate={d.currentDate}
        onPrevMonth={d.handlePrevMonth}
        onNextMonth={d.handleNextMonth}
        onTodayClick={d.handleTodayClick}
        agents={d.agents}
        selectedAgent={d.selectedAgent}
        onAgentChange={d.setSelectedAgent}
        selectedAgentName={d.selectedAgentName}
        showAgentDropdown={d.showAgentDropdown}
        onSetShowAgentDropdown={d.setShowAgentDropdown}
        searchQuery={d.searchQuery}
        onSearchChange={d.setSearchQuery}
        taskTypeFilter={d.taskTypeFilter}
        onTaskTypeFilterChange={d.setTaskTypeFilter}
      />

      {d.isError && (
        <div className="calendar-error-banner">Failed to load calendar data. Please try again.</div>
      )}

      <div className="calendar-grid">
        {d.isLoading && <div className="calendar-loading-banner">Loading calendar...</div>}
        {d.viewMode === 'month' && (
          <MonthView
            currentDate={d.currentDate}
            calendarDays={d.getCalendarDays}
            isToday={d.isToday}
            isCurrentMonth={d.isCurrentMonth}
            getTasksCountForDate={d.getTasksCountForDate}
            onDateClick={d.handleDateClick}
            onPrevMonth={d.handlePrevMonth}
            onNextMonth={d.handleNextMonth}
            onTodayClick={d.handleTodayClick}
          />
        )}
        {d.viewMode === 'day' && (
          <DayView currentDate={d.currentDate} tasks={d.getDayView} />
        )}
        {d.viewMode === 'week' && (
          <WeekView
            currentDate={d.currentDate}
            tasks={d.getWeekView}
            isToday={d.isToday}
            getAgentsFilteredTasks={d.getAgentsFilteredTasks}
          />
        )}
      </div>

      <DayDrawer
        isOpen={d.modalOpen}
        selectedDate={d.selectedDate}
        tasks={d.getTasksForDate}
        onClose={d.closeModal}
        onAddTask={openAddTask}
        onDragStartTask={d.handleDragStartTask}
        onDragOverTask={d.handleDragOverTask}
        onDropTask={d.handleDropTask}
        onDeleteTask={d.handleDeleteTask}
      />

      <TaskFormDrawer
        isOpen={addTask.isOpen}
        onClose={addTask.close}
        isEditing={false}
        initialValues={addTask.initialValues}
        onSubmit={addTask.handleSubmit}
        isLoading={addTask.isSaving}
        error={addTask.error}
        draftId={addTask.draftId}
        onDraftSaved={addTask.onDraftSaved}
        staffOptions={addTask.staffOptions}
        staffLoading={addTask.staffLoading}
        categoryOptions={addTask.categoryOptions}
        categoryLoading={addTask.categoryLoading}
        leadOptions={addTask.leadOptions}
        leadLoading={addTask.leadLoading}
        campaignOptions={addTask.campaignOptions}
        campaignLoading={addTask.campaignLoading}
        dealOptions={addTask.dealOptions}
        dealLoading={addTask.dealLoading}
      />

      <AdminDeleteModal
        isOpen={!!d.deletingTask}
        itemName={d.deletingTask?.title}
        itemType="task"
        onConfirm={d.handleConfirmDeleteTask}
        onClose={d.closeDeleteTaskModal}
      />

      <ToastNotification
        isVisible={toast.showToast}
        type={toast.toastType}
        message={toast.toastMessage}
        onDismiss={() => toast.setShowToast(false)}
      />
    </PageContainer>
  );
};

export default CalendarPage;
