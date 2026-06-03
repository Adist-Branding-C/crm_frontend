import React from 'react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import { useCalendarData } from '../hooks/useCalendarData';
import CalendarControls from '../components/CalendarControls';
import MonthView from '../components/MonthView';
import DayView from '../components/DayView';
import WeekView from '../components/WeekView';
import DayDrawer from '../components/DayDrawer';
import './CalendarPage.css';

const CalendarPage = () => {
  const d = useCalendarData();

  return (
    <PageContainer>
      <PageHeader
        title="Agent Calendar"
        description="Schedules tasks, appointments, and follow-ups, streamlining agent productivity and organization."
      />

      <CalendarControls
        viewMode={d.viewMode}
        onViewModeChange={d.setViewMode}
        currentDate={d.currentDate}
        onPrevMonth={d.handlePrevMonth}
        onNextMonth={d.handleNextMonth}
        onTodayClick={d.handleTodayClick}
        selectedAgent={d.selectedAgent}
        onAgentChange={d.setSelectedAgent}
        selectedAgentName={d.selectedAgentName}
        showAgentDropdown={d.showAgentDropdown}
        onSetShowAgentDropdown={d.setShowAgentDropdown}
        searchQuery={d.searchQuery}
        onSearchChange={d.setSearchQuery}
      />

      <div className="calendar-grid">
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
        onDragStartTask={d.handleDragStartTask}
        onDragOverTask={d.handleDragOverTask}
        onDropTask={d.handleDropTask}
        onDeleteTask={d.handleDeleteTask}
      />
    </PageContainer>
  );
};

export default CalendarPage;
