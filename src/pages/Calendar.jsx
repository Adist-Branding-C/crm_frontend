import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Phone, User, CheckCircle, X, Calendar as CalIcon, Clock, Edit2, Plus, ChevronDown, MoreHorizontal, ArrowLeft, MapPin, PhoneCall, Users } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import PageContainer from '../components/PageContainer';
import './Calendar.css';

const agentsList = [
  { id: 1, name: 'All Agents' },
  { id: 2, name: 'Fida Fathima' },
  { id: 3, name: 'Nandana K' },
  { id: 4, name: 'Rameesa' },
  { id: 5, name: 'Aysha' },
  { id: 6, name: 'Nesri' },
  { id: 7, name: 'Rahmath' },
  { id: 8, name: 'Lana' },
  { id: 9, name: 'Dilshana' },
];

const sampleTasks = [
  {
    id: 1,
    title: 'Call Back Shameena chappangakattil',
    category: 'Call',
    description: 'Call customer regarding follow-up discussion.',
    contactName: 'Shameena chappangakattil',
    contactPhone: '917025128014',
    assignedTo: 'Rameesa',
    dueDate: '2026-04-25',
    dueTime: '11:30',
    addedOn: '2026-04-25',
    addedTime: '10:25',
    addedBy: 'Rameesa',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Follow up with Rahul Sharma',
    category: 'Follow-up',
    description: 'Discuss quote and close the deal.',
    contactName: 'Rahul Sharma',
    contactPhone: '9876543210',
    assignedTo: 'Rameesa',
    dueDate: '2026-04-25',
    dueTime: '14:00',
    addedOn: '2026-04-24',
    addedTime: '16:30',
    addedBy: 'Fida Fathima',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Demo meeting with Priya Patel',
    category: 'Meeting',
    description: 'Product demo for new CRM features.',
    contactName: 'Priya Patel',
    contactPhone: '9876543211',
    assignedTo: 'Rameesa',
    dueDate: '2026-04-26',
    dueTime: '10:00',
    addedOn: '2026-04-25',
    addedTime: '09:00',
    addedBy: 'Nandana K',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 4,
    title: 'Call Amit Kumar',
    category: 'Call',
    description: 'Discuss renewal options.',
    contactName: 'Amit Kumar',
    contactPhone: '9876543212',
    assignedTo: 'Rameesa',
    dueDate: '2026-04-26',
    dueTime: '15:30',
    addedOn: '2026-04-25',
    addedTime: '11:00',
    addedBy: 'Rameesa',
    status: 'completed',
    priority: 'low'
  },
  {
    id: 5,
    title: 'Meeting with Sneha Reddy',
    category: 'Meeting',
    description: 'Quarterly review meeting.',
    contactName: 'Sneha Reddy',
    contactPhone: '9876543213',
    assignedTo: 'Fida Fathima',
    dueDate: '2026-04-27',
    dueTime: '11:00',
    addedOn: '2026-04-26',
    addedTime: '14:00',
    addedBy: 'Fida Fathima',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 6,
    title: 'Follow up Vikram Singh',
    category: 'Follow-up',
    description: 'Send proposal document.',
    contactName: 'Vikram Singh',
    contactPhone: '9876543214',
    assignedTo: 'Nandana K',
    dueDate: '2026-04-27',
    dueTime: '16:00',
    addedOn: '2026-04-26',
    addedTime: '10:30',
    addedBy: 'Nandana K',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 7,
    title: 'Call Rajesh Verma',
    category: 'Call',
    description: 'Annual contract discussion.',
    contactName: 'Rajesh Verma',
    contactPhone: '9876543216',
    assignedTo: 'Rameesa',
    dueDate: '2026-04-28',
    dueTime: '09:30',
    addedOn: '2026-04-27',
    addedTime: '15:00',
    addedBy: 'Rameesa',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 8,
    title: 'Check-in with Kavitha Nair',
    category: 'Check-in',
    description: 'Morning check-in call.',
    contactName: 'Kavitha Nair',
    contactPhone: '9876543217',
    assignedTo: 'Aysha',
    dueDate: '2026-04-25',
    dueTime: '08:00',
    addedOn: '2026-04-24',
    addedTime: '17:00',
    addedBy: 'Aysha',
    status: 'pending',
    priority: 'low'
  },
  {
    id: 9,
    title: 'Call Lakshmi Menon',
    category: 'Call',
    description: 'Support call for technical issue.',
    contactName: 'Lakshmi Menon',
    contactPhone: '9876543219',
    assignedTo: 'Nesri',
    dueDate: '2026-04-29',
    dueTime: '10:00',
    addedOn: '2026-04-28',
    addedTime: '12:00',
    addedBy: 'Nesri',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 10,
    title: 'Follow up Suresh Iyer',
    category: 'Follow-up',
    description: 'Negotiate final pricing.',
    contactName: 'Suresh Iyer',
    contactPhone: '9876543220',
    assignedTo: 'Rameesa',
    dueDate: '2026-04-30',
    dueTime: '14:30',
    addedOn: '2026-04-29',
    addedTime: '11:00',
    addedBy: 'Rameesa',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 11,
    title: 'Call Meera Das',
    category: 'Call',
    description: 'Demo follow-up discussion.',
    contactName: 'Meera Das',
    contactPhone: '9876543221',
    assignedTo: 'Fida Fathima',
    dueDate: '2026-04-25',
    dueTime: '16:00',
    addedOn: '2026-04-25',
    addedTime: '08:30',
    addedBy: 'Fida Fathima',
    status: 'pending',
    priority: 'low'
  },
  {
    id: 12,
    title: 'Meeting with John Doe',
    category: 'Meeting',
    description: 'Client onboarding meeting.',
    contactName: 'John Doe',
    contactPhone: '9876543222',
    assignedTo: 'Rameesa',
    dueDate: '2026-05-01',
    dueTime: '10:00',
    addedOn: '2026-04-30',
    addedTime: '09:00',
    addedBy: 'Rameesa',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 13,
    title: 'Call Ananya Gupta',
    category: 'Call',
    description: 'Quote discussion.',
    contactName: 'Ananya Gupta',
    contactPhone: '9876543215',
    assignedTo: 'Rahmath',
    dueDate: '2026-04-26',
    dueTime: '13:00',
    addedOn: '2026-04-25',
    addedTime: '14:00',
    addedBy: 'Rahmath',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 14,
    title: 'Follow up Arun Pillai',
    category: 'Follow-up',
    description: 'Discuss requirements.',
    contactName: 'Arun Pillai',
    contactPhone: '9876543218',
    assignedTo: 'Lana',
    dueDate: '2026-05-02',
    dueTime: '15:00',
    addedOn: '2026-05-01',
    addedTime: '10:00',
    addedBy: 'Lana',
    status: 'pending',
    priority: 'low'
  },
  {
    id: 15,
    title: 'Check-in Dilshana',
    category: 'Check-in',
    description: 'Morning update.',
    contactName: 'Dilshana',
    contactPhone: '9876543223',
    assignedTo: 'Fida Fathima',
    dueDate: '2026-04-28',
    dueTime: '08:30',
    addedOn: '2026-04-27',
    addedTime: '16:00',
    addedBy: 'Fida Fathima',
    status: 'pending',
    priority: 'low'
  },
];

const Calendar = () => {
  const [selectedAgent, setSelectedAgent] = useState(1);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 25));
  const [viewMode, setViewMode] = useState('month');
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAgentDropdown, setShowAgentDropdown] = useState(false);
  const [tasks, setTasks] = useState(sampleTasks);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hourNames = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

  const getAgentsFilteredTasks = useMemo(() => {
    let filtered = [...tasks];
    
    if (selectedAgent !== 1) {
      const agent = agentsList.find(a => a.id === selectedAgent);
      filtered = filtered.filter(t => t.assignedTo === agent.name);
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
    return (date) => {
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
    
    const days = [];
    const current = new Date(startDate);
    
    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  }, [currentDate]);

  const isToday = (date) => {
    const today = new Date(2026, 3, 25);
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const handleCompleteTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: 'completed' } : task
    ));
  };

  const [draggedTask, setDraggedTask] = useState(null);

  const handleDragStartTask = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOverTask = (e, hour) => {
    e.preventDefault();
  };

  const handleDropTask = (e, hour) => {
    e.preventDefault();
    if (draggedTask) {
      const newTime = hour.toString().padStart(2, '0') + ':00';
      setTasks(tasks.map(t => 
        t.id === draggedTask.id ? { ...t, dueTime: newTime } : t
      ));
    }
    setDraggedTask(null);
  };

  const handleDeleteTask = (taskId, e) => {
    e.stopPropagation();
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
  };

  const selectedAgentName = agentsList.find(a => a.id === selectedAgent)?.name || 'All Agents';

  return (
    <PageContainer>
      <PageHeader 
        title="Agent Calendar" 
        description="Schedules tasks, appointments, and follow-ups, streamlining agent productivity and organization."
      />
      
      <div className="calendar-controls">
        <div className="calendar-controls-left">
          <div className="agent-select-wrapper">
            <div 
              className="agent-select-trigger"
              onClick={() => setShowAgentDropdown(!showAgentDropdown)}
            >
              <span>{selectedAgentName}</span>
              <ChevronRight size={16} className={`dropdown-arrow ${showAgentDropdown ? 'open' : ''}`} />
            </div>
            {showAgentDropdown && (
              <div className="agent-dropdown">
                <div className="agent-search-box">
                  <Search size={14} />
                  <input 
                    type="text" 
                    placeholder="Search agents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="agent-list">
                  {agentsList
                    .filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(agent => (
                      <div 
                        key={agent.id}
                        className={`agent-option ${selectedAgent === agent.id ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedAgent(agent.id);
                          setShowAgentDropdown(false);
                          setSearchQuery('');
                        }}
                      >
                        <User size={14} />
                        <span>{agent.name}</span>
                      </div>
                    ))
                  }
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
            <button className="nav-btn" onClick={handlePrevMonth}>
              <ChevronLeft size={18} />
            </button>
            <span className="current-month">
              {viewMode === 'day' 
                ? `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`
                : viewMode === 'week'
                ? `Week of ${monthNames[currentDate.getMonth()]} ${currentDate.getDate() - currentDate.getDay() + 1}, ${currentDate.getFullYear()}`
                : `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
              }
            </span>
            <button className="nav-btn" onClick={handleNextMonth}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="calendar-grid">
        {viewMode === 'month' && (
          <>
            <div className="month-view-header">
              <div className="month-nav-controls">
                <button className="month-nav-btn" onClick={handlePrevMonth}>
                  <ChevronLeft size={20} />
                </button>
                <span className="month-year-title">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </span>
                <button className="month-nav-btn" onClick={handleNextMonth}>
                  <ChevronRight size={20} />
                </button>
                <button className="today-btn" onClick={() => setCurrentDate(new Date(2026, 3, 25))}>Today</button>
              </div>
              <div className="month-quick-jump">
                <button className="month-dropdown-btn">
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
            <div className="month-view-grid">
              <div className="month-weekday-header">
                {dayNames.map(day => (
                  <div key={day} className="month-weekday-cell">{day}</div>
                ))}
              </div>
              <div className="month-days-grid">
                {getCalendarDays.map((date, index) => {
                  const tasksForDate = getTasksCountForDate(date);
                  const isCurrentDay = isToday(date);
                  const isCurrentMonthDay = isCurrentMonth(date);
                  const isPast = !isCurrentMonthDay && date < new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                  
                  return (
                    <div 
                      key={index} 
                      className={`month-day-cell ${isCurrentDay ? 'today-cell' : ''} ${!isCurrentMonthDay ? 'other-month' : ''} ${isPast ? 'past-month' : ''}`}
                      onClick={() => handleDateClick(date)}
                    >
                      <span className={`month-date-num ${isCurrentDay ? 'today-num' : ''}`}>{date.getDate()}</span>
                      {tasksForDate.length > 0 && (
                        <div className="month-events-container">
                          {tasksForDate.slice(0, 2).map((task, i) => (
                            <div key={i} className={`month-event-pill ${task.priority}`}>
                              {task.title.substring(0, 15)}{task.title.length > 15 ? '...' : ''}
                            </div>
                          ))}
                          {tasksForDate.length > 2 && (
                            <div className="month-event-more">
                              +{tasksForDate.length - 2} more
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {viewMode === 'day' && (
          <div className="day-view">
            <div className="day-view-header">
              <h3>{monthNames[currentDate.getMonth()]} {currentDate.getDate()}, {currentDate.getFullYear()}</h3>
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
        )}

        {viewMode === 'week' && (
          <div className="week-view">
            <div className="week-view-header">
              {Array.from({ length: 7 }, (_, i) => {
                const weekDate = new Date(currentDate);
                weekDate.setDate(currentDate.getDate() - currentDate.getDay() + i);
                return (
                  <div key={i} className={`week-day-header ${isToday(weekDate) ? 'today' : ''}`}>
                    <span className="week-day-name">{dayNames[i]}</span>
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
                    {dayTasks.length === 0 ? (
                      <div className="no-tasks">-</div>
                    ) : (
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
        )}
      </div>
      
      {modalOpen && (
        <div className="drawer-overlay" onClick={closeModal}>
          <div className="day-drawer" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <button className="drawer-back-btn" onClick={closeModal}>
                <ArrowLeft size={20} />
              </button>
              <div className="drawer-title-wrap">
                <h2 className="drawer-title">
                  {selectedDate?.getDate()} {monthNames[selectedDate?.getMonth()]} {selectedDate?.getFullYear()}
                </h2>
                <span className="drawer-subtitle">{getTasksForDate.length} Tasks Scheduled</span>
              </div>
              <button className="add-task-btn">
                <Plus size={18} />
                Add Task
              </button>
            </div>
            
            <div className="drawer-body">
              <div className="timeline-container">
                <div className="timeline-header-row">
                  <div className="time-label-header"></div>
                  <div className="time-slots-header">
                    <span>AM</span>
                    <span>PM</span>
                  </div>
                </div>
                <div className="timeline-grid">
                  {[...Array(23)].map((_, hourIndex) => {
                    const hour = hourIndex + 1;
                    const tasksInHour = getTasksForDate.filter(task => {
                      const taskHour = parseInt(task.dueTime.split(':')[0]);
                      return taskHour === hour || (taskHour > hour && taskHour < hour + 1);
                    });
                    
                    return (
                      <div key={hour} className="timeline-row">
                        <div className="time-label">
                          {hour <= 12 ? hour : hour - 12} {hour < 12 || hour === 24 ? 'AM' : 'PM'}
                        </div>
                        <div className="time-slot" onDragOver={(e) => handleDragOverTask(e, hour)} onDrop={(e) => handleDropTask(e, hour)}>
                          {tasksInHour.length > 0 && tasksInHour.map(task => (
                            <div 
                              key={task.id} 
                              className={`timeline-task ${task.category.toLowerCase()}`}
                              draggable
                              onDragStart={(e) => handleDragStartTask(e, task)}
                            >
                              <div className="task-header-row">
                                <div className="task-time">{task.dueTime}</div>
                                <button className="task-delete-btn" onClick={(e) => handleDeleteTask(task.id, e)}>×</button>
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

export default Calendar;