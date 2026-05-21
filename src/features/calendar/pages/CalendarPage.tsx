import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Phone, User, CheckCircle, X, Calendar as CalIcon, Clock, Edit2, Plus, ChevronDown, MoreHorizontal, ArrowLeft, MapPin, PhoneCall, Users } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import { AGENTS, SAMPLE_TASKS, TODAY, MONTH_NAMES, DAY_NAMES } from '../constants';
import type { CalendarTask } from '../types';
import '../../../pages/Calendar.css';

const CalendarPage = () => {
  const [selectedAgent, setSelectedAgent] = useState(1);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 25));
  const [viewMode, setViewMode] = useState('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAgentDropdown, setShowAgentDropdown] = useState(false);
  const [tasks, setTasks] = useState<CalendarTask[]>(SAMPLE_TASKS);
  const [draggedTask, setDraggedTask] = useState<CalendarTask | null>(null);

  const getAgentsFilteredTasks = useMemo(() => {
    let filtered = [...tasks];
    if (selectedAgent !== 1) {
      const agent = AGENTS.find(a => a.id === selectedAgent);
      if (agent) filtered = filtered.filter(t => t.assignedTo === agent.name);
    }
    if (searchQuery) {
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  }, [tasks, selectedAgent, searchQuery]);

  const getDayView = useMemo(() => {
    const day = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    return getAgentsFilteredTasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate.getDate() === day && taskDate.getMonth() === month && taskDate.getFullYear() === year;
    });
  }, [currentDate, getAgentsFilteredTasks]);

  const getWeekView = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const currentDay = currentDate.getDay();
    const startOfWeek = new Date(year, month, day - currentDay);
    const endOfWeek = new Date(year, month, day + (6 - currentDay));
    return getAgentsFilteredTasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate >= startOfWeek && taskDate <= endOfWeek;
    });
  }, [currentDate, getAgentsFilteredTasks]);

  const getTasksForDate = useMemo(() => {
    return getAgentsFilteredTasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate.toDateString() === selectedDate?.toDateString();
    });
  }, [getAgentsFilteredTasks, selectedDate]);

  const getTasksCountForDate = useMemo(() => {
    return (date: Date) => {
      return getAgentsFilteredTasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return taskDate.toDateString() === date.toDateString();
      });
    };
  }, [getAgentsFilteredTasks]);

  const getCalendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));
    const days: Date[] = [];
    const current = new Date(startDate);
    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  }, [currentDate]);

  const isToday = (date: Date) => date.toDateString() === TODAY.toDateString();
  const isCurrentMonth = (date: Date) => date.getMonth() === currentDate.getMonth();

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') newDate.setDate(newDate.getDate() - 1);
    else if (viewMode === 'week') newDate.setDate(newDate.getDate() - 7);
    else newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') newDate.setDate(newDate.getDate() + 1);
    else if (viewMode === 'week') newDate.setDate(newDate.getDate() + 7);
    else newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const handleCompleteTask = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: 'completed' } : task
    ));
  };

  const handleDragStartTask = (e: React.DragEvent, task: CalendarTask) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOverTask = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropTask = (e: React.DragEvent, hour: number) => {
    e.preventDefault();
    if (draggedTask) {
      const newTime = hour.toString().padStart(2, '0') + ':00';
      setTasks(tasks.map(t =>
        t.id === draggedTask.id ? { ...t, dueTime: newTime } : t
      ));
    }
    setDraggedTask(null);
  };

  const handleDeleteTask = (taskId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
  };

  const selectedAgentName = AGENTS.find(a => a.id === selectedAgent)?.name || 'All Agents';

  const renderDayView = () => (
    <div className="day-view">
      <div className="day-view-header">
        <h3>{MONTH_NAMES[currentDate.getMonth()]} {currentDate.getDate()}, {currentDate.getFullYear()}</h3>
      </div>
      <div className="day-view-body">
        {getDayView.length === 0 ? (
          <div className="no-tasks-message">
            <CalIcon size={48} />
            <p>No tasks scheduled for this day</p>
          </div>
        ) : (
          getDayView.map(task => (
            <div key={task.id} className={`day-task-card ${task.status}`}>
              <div className="task-time">{task.dueTime}</div>
              <div className="task-info">
                <h4>{task.title}</h4>
                <p>{task.category} - {task.contactName}</p>
              </div>
              <span className={`task-status-badge ${task.status}`}>{task.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderWeekView = () => (
    <div className="week-view">
      <div className="week-view-header">
        {Array.from({ length: 7 }, (_, i) => {
          const weekDate = new Date(currentDate);
          weekDate.setDate(currentDate.getDate() - currentDate.getDay() + i);
          return (
            <div key={i} className={`week-day-header ${isToday(weekDate) ? 'today' : ''}`}>
              <span className="week-day-name">{DAY_NAMES[i]}</span>
              <span className="week-date">{weekDate.getDate()}</span>
            </div>
          );
        })}
      </div>
      <div className="week-view-body">
        {Array.from({ length: 7 }, (_, i) => {
          const weekDate = new Date(currentDate);
          weekDate.setDate(currentDate.getDate() - currentDate.getDay() + i);
          const dayTasks = getAgentsFilteredTasks.filter(task => {
            const taskDate = new Date(task.dueDate);
            return taskDate.toDateString() === weekDate.toDateString();
          });
          return (
            <div key={i} className="week-day-column">
              {dayTasks.length === 0 ? <div className="no-tasks">-</div> : (
                dayTasks.map(task => (
                  <div key={task.id} className={`week-task-item ${task.priority}`}>
                    <span className="week-task-time">{task.dueTime}</span>
                    <span className="week-task-title">{task.title}</span>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderMonthView = () => (
    <>
      <div className="month-view-header">
        <div className="month-nav-controls">
          <button className="month-nav-btn" onClick={handlePrevMonth}><ChevronLeft size={20} /></button>
          <span className="month-year-title">{MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
          <button className="month-nav-btn" onClick={handleNextMonth}><ChevronRight size={20} /></button>
          <button className="today-btn" onClick={() => setCurrentDate(new Date(2026, 3, 25))}>Today</button>
        </div>
        <div className="month-quick-jump">
          <button className="month-dropdown-btn"><ChevronDown size={16} /></button>
        </div>
      </div>
      <div className="month-view-grid">
        <div className="month-weekday-header">
          {DAY_NAMES.map(day => <div key={day} className="month-weekday-cell">{day}</div>)}
        </div>
        <div className="month-days-grid">
          {getCalendarDays.map((date, index) => {
            const tasksForDate = getTasksCountForDate(date);
            return (
              <div
                key={index}
                className={`month-day-cell ${isToday(date) ? 'today-cell' : ''} ${!isCurrentMonth(date) ? 'other-month' : ''}`}
                onClick={() => handleDateClick(date)}
              >
                <span className={`month-date-num ${isToday(date) ? 'today-num' : ''}`}>{date.getDate()}</span>
                {tasksForDate.length > 0 && (
                  <div className="month-events-container">
                    {tasksForDate.slice(0, 2).map((task, i) => (
                      <div key={i} className={`month-event-pill ${task.priority}`}>
                        {task.title.substring(0, 15)}{task.title.length > 15 ? '...' : ''}
                      </div>
                    ))}
                    {tasksForDate.length > 2 && (
                      <div className="month-event-more">+{tasksForDate.length - 2} more</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );

  return (
    <PageContainer>
      <PageHeader
        title="Agent Calendar"
        description="Schedules tasks, appointments, and follow-ups, streamlining agent productivity and organization."
      />

      <div className="calendar-controls">
        <div className="calendar-controls-left">
          <div className="agent-select-wrapper">
            <div className="agent-select-trigger" onClick={() => setShowAgentDropdown(!showAgentDropdown)}>
              <span>{selectedAgentName}</span>
              <ChevronRight size={16} className={`dropdown-arrow ${showAgentDropdown ? 'open' : ''}`} />
            </div>
            {showAgentDropdown && (
              <div className="agent-dropdown">
                <div className="agent-search-box">
                  <Search size={14} />
                  <input type="text" placeholder="Search agents..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className="agent-list">
                  {AGENTS.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase())).map(agent => (
                    <div
                      key={agent.id}
                      className={`agent-option ${selectedAgent === agent.id ? 'selected' : ''}`}
                      onClick={() => { setSelectedAgent(agent.id); setShowAgentDropdown(false); setSearchQuery(''); }}
                    >
                      <User size={14} />
                      <span>{agent.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="calendar-controls-right">
          <div className="view-switch-buttons">
            <button className={`view-btn ${viewMode === 'day' ? 'active' : ''}`} onClick={() => setViewMode('day')}>Day</button>
            <button className={`view-btn ${viewMode === 'week' ? 'active' : ''}`} onClick={() => setViewMode('week')}>Week</button>
            <button className={`view-btn ${viewMode === 'month' ? 'active' : ''}`} onClick={() => setViewMode('month')}>Month</button>
          </div>

          <div className="month-navigation">
            <button className="nav-btn" onClick={handlePrevMonth}><ChevronLeft size={18} /></button>
            <span className="current-month">
              {viewMode === 'day'
                ? `${MONTH_NAMES[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`
                : viewMode === 'week'
                ? `Week of ${MONTH_NAMES[currentDate.getMonth()]} ${currentDate.getDate() - currentDate.getDay() + 1}, ${currentDate.getFullYear()}`
                : `${MONTH_NAMES[currentDate.getMonth()]} ${currentDate.getFullYear()}`
              }
            </span>
            <button className="nav-btn" onClick={handleNextMonth}><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>

      <div className="calendar-grid">
        {viewMode === 'month' && renderMonthView()}
        {viewMode === 'day' && renderDayView()}
        {viewMode === 'week' && renderWeekView()}
      </div>

      {modalOpen && (
        <div className="drawer-overlay" onClick={closeModal}>
          <div className="day-drawer" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <button className="drawer-back-btn" onClick={closeModal}><ArrowLeft size={20} /></button>
              <div className="drawer-title-wrap">
                <h2 className="drawer-title">
                  {selectedDate?.getDate()} {MONTH_NAMES[selectedDate?.getMonth() ?? 0]} {selectedDate?.getFullYear()}
                </h2>
                <span className="drawer-subtitle">{getTasksForDate.length} Tasks Scheduled</span>
              </div>
              <button className="add-task-btn"><Plus size={18} /> Add Task</button>
            </div>

            <div className="drawer-body">
              <div className="timeline-container">
                <div className="timeline-header-row">
                  <div className="time-label-header"></div>
                  <div className="time-slots-header"><span>AM</span><span>PM</span></div>
                </div>
                <div className="timeline-grid">
                  {[...Array(23)].map((_, hourIndex) => {
                    const hour = hourIndex + 1;
                    const tasksInHour = getTasksForDate.filter(task => {
                      const taskHour = parseInt(task.dueTime.split(':')[0] || '0', 10);
                      return taskHour === hour;
                    });
                    return (
                      <div key={hour} className="timeline-row">
                        <div className="time-label">
                          {hour <= 12 ? hour : hour - 12} {hour < 12 || hour === 24 ? 'AM' : 'PM'}
                        </div>
                        <div className="time-slot" onDragOver={handleDragOverTask} onDrop={(e) => handleDropTask(e, hour)}>
                          {tasksInHour.map(task => (
                            <div key={task.id} className={`timeline-task ${task.category.toLowerCase()}`} draggable onDragStart={(e) => handleDragStartTask(e, task)}>
                              <div className="task-header-row">
                                <div className="task-time">{task.dueTime}</div>
                                <button className="task-delete-btn" onClick={(e) => handleDeleteTask(task.id, e)}>x</button>
                              </div>
                              <div className="task-title">{task.title}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default CalendarPage;
