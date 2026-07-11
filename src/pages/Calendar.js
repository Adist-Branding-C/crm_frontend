import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
            filtered = filtered.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.category.toLowerCase().includes(searchQuery.toLowerCase()));
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
        }
        else if (viewMode === 'week') {
            newDate.setDate(newDate.getDate() - 7);
        }
        else {
            newDate.setMonth(newDate.getMonth() - 1);
        }
        setCurrentDate(newDate);
    };
    const handleNextMonth = () => {
        const newDate = new Date(currentDate);
        if (viewMode === 'day') {
            newDate.setDate(newDate.getDate() + 1);
        }
        else if (viewMode === 'week') {
            newDate.setDate(newDate.getDate() + 7);
        }
        else {
            newDate.setMonth(newDate.getMonth() + 1);
        }
        setCurrentDate(newDate);
    };
    const handleDateClick = (date) => {
        setSelectedDate(date);
        setModalOpen(true);
    };
    const handleCompleteTask = (taskId) => {
        setTasks(tasks.map(task => task.id === taskId ? { ...task, status: 'completed' } : task));
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
            setTasks(tasks.map(t => t.id === draggedTask.id ? { ...t, dueTime: newTime } : t));
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
    return (_jsxs(PageContainer, { children: [_jsx(PageHeader, { title: "Agent Calendar", description: "Schedules tasks, appointments, and follow-ups, streamlining agent productivity and organization." }), _jsxs("div", { className: "calendar-controls", children: [_jsx("div", { className: "calendar-controls-left", children: _jsxs("div", { className: "agent-select-wrapper", children: [_jsxs("div", { className: "agent-select-trigger", onClick: () => setShowAgentDropdown(!showAgentDropdown), children: [_jsx("span", { children: selectedAgentName }), _jsx(ChevronRight, { size: 16, className: `dropdown-arrow ${showAgentDropdown ? 'open' : ''}` })] }), showAgentDropdown && (_jsxs("div", { className: "agent-dropdown", children: [_jsxs("div", { className: "agent-search-box", children: [_jsx(Search, { size: 14 }), _jsx("input", { type: "text", placeholder: "Search agents...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsx("div", { className: "agent-list", children: agentsList
                                                .filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                                .map(agent => (_jsxs("div", { className: `agent-option ${selectedAgent === agent.id ? 'selected' : ''}`, onClick: () => {
                                                    setSelectedAgent(agent.id);
                                                    setShowAgentDropdown(false);
                                                    setSearchQuery('');
                                                }, children: [_jsx(User, { size: 14 }), _jsx("span", { children: agent.name })] }, agent.id))) })] }))] }) }), _jsxs("div", { className: "calendar-controls-right", children: [_jsxs("div", { className: "view-switch-buttons", children: [_jsx("button", { className: `view-btn ${viewMode === 'day' ? 'active' : ''}`, onClick: () => setViewMode('day'), children: "Day" }), _jsx("button", { className: `view-btn ${viewMode === 'week' ? 'active' : ''}`, onClick: () => setViewMode('week'), children: "Week" }), _jsx("button", { className: `view-btn ${viewMode === 'month' ? 'active' : ''}`, onClick: () => setViewMode('month'), children: "Month" })] }), _jsxs("div", { className: "month-navigation", children: [_jsx("button", { className: "nav-btn", onClick: handlePrevMonth, children: _jsx(ChevronLeft, { size: 18 }) }), _jsx("span", { className: "current-month", children: viewMode === 'day'
                                            ? `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`
                                            : viewMode === 'week'
                                                ? `Week of ${monthNames[currentDate.getMonth()]} ${currentDate.getDate() - currentDate.getDay() + 1}, ${currentDate.getFullYear()}`
                                                : `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}` }), _jsx("button", { className: "nav-btn", onClick: handleNextMonth, children: _jsx(ChevronRight, { size: 18 }) })] })] })] }), _jsxs("div", { className: "calendar-grid", children: [viewMode === 'month' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "month-view-header", children: [_jsxs("div", { className: "month-nav-controls", children: [_jsx("button", { className: "month-nav-btn", onClick: handlePrevMonth, children: _jsx(ChevronLeft, { size: 20 }) }), _jsxs("span", { className: "month-year-title", children: [monthNames[currentDate.getMonth()], " ", currentDate.getFullYear()] }), _jsx("button", { className: "month-nav-btn", onClick: handleNextMonth, children: _jsx(ChevronRight, { size: 20 }) }), _jsx("button", { className: "today-btn", onClick: () => setCurrentDate(new Date(2026, 3, 25)), children: "Today" })] }), _jsx("div", { className: "month-quick-jump", children: _jsx("button", { className: "month-dropdown-btn", children: _jsx(ChevronDown, { size: 16 }) }) })] }), _jsxs("div", { className: "month-view-grid", children: [_jsx("div", { className: "month-weekday-header", children: dayNames.map(day => (_jsx("div", { className: "month-weekday-cell", children: day }, day))) }), _jsx("div", { className: "month-days-grid", children: getCalendarDays.map((date, index) => {
                                            const tasksForDate = getTasksCountForDate(date);
                                            const isCurrentDay = isToday(date);
                                            const isCurrentMonthDay = isCurrentMonth(date);
                                            const isPast = !isCurrentMonthDay && date < new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                                            return (_jsxs("div", { className: `month-day-cell ${isCurrentDay ? 'today-cell' : ''} ${!isCurrentMonthDay ? 'other-month' : ''} ${isPast ? 'past-month' : ''}`, onClick: () => handleDateClick(date), children: [_jsx("span", { className: `month-date-num ${isCurrentDay ? 'today-num' : ''}`, children: date.getDate() }), tasksForDate.length > 0 && (_jsxs("div", { className: "month-events-container", children: [tasksForDate.slice(0, 2).map((task, i) => (_jsxs("div", { className: `month-event-pill ${task.priority}`, children: [task.title.substring(0, 15), task.title.length > 15 ? '...' : ''] }, i))), tasksForDate.length > 2 && (_jsxs("div", { className: "month-event-more", children: ["+", tasksForDate.length - 2, " more"] }))] }))] }, index));
                                        }) })] })] })), viewMode === 'day' && (_jsxs("div", { className: "day-view", children: [_jsx("div", { className: "day-view-header", children: _jsxs("h3", { children: [monthNames[currentDate.getMonth()], " ", currentDate.getDate(), ", ", currentDate.getFullYear()] }) }), _jsx("div", { className: "day-view-body", children: getDayView.length === 0 ? (_jsxs("div", { className: "no-tasks-message", children: [_jsx(CalIcon, { size: 48 }), _jsx("p", { children: "No tasks scheduled for this day" })] })) : (getDayView.map(task => (_jsxs("div", { className: `day-task-card ${task.status}`, children: [_jsx("div", { className: "task-time", children: task.dueTime }), _jsxs("div", { className: "task-info", children: [_jsx("h4", { children: task.title }), _jsxs("p", { children: [task.category, " - ", task.contactName] })] }), _jsx("span", { className: `task-status-badge ${task.status}`, children: task.status })] }, task.id)))) })] })), viewMode === 'week' && (_jsxs("div", { className: "week-view", children: [_jsx("div", { className: "week-view-header", children: Array.from({ length: 7 }, (_, i) => {
                                    const weekDate = new Date(currentDate);
                                    weekDate.setDate(currentDate.getDate() - currentDate.getDay() + i);
                                    return (_jsxs("div", { className: `week-day-header ${isToday(weekDate) ? 'today' : ''}`, children: [_jsx("span", { className: "week-day-name", children: dayNames[i] }), _jsx("span", { className: "week-date", children: weekDate.getDate() })] }, i));
                                }) }), _jsx("div", { className: "week-view-body", children: Array.from({ length: 7 }, (_, i) => {
                                    const weekDate = new Date(currentDate);
                                    weekDate.setDate(currentDate.getDate() - currentDate.getDay() + i);
                                    const dayTasks = getAgentsFilteredTasks.filter(task => {
                                        const taskDate = new Date(task.dueDate);
                                        return taskDate.toDateString() === weekDate.toDateString();
                                    });
                                    return (_jsx("div", { className: "week-day-column", children: dayTasks.length === 0 ? (_jsx("div", { className: "no-tasks", children: "-" })) : (dayTasks.map(task => (_jsxs("div", { className: `week-task-item ${task.priority}`, children: [_jsx("span", { className: "week-task-time", children: task.dueTime }), _jsx("span", { className: "week-task-title", children: task.title })] }, task.id)))) }, i));
                                }) })] }))] }), modalOpen && (_jsx("div", { className: "drawer-overlay", onClick: closeModal, children: _jsxs("div", { className: "day-drawer", onClick: e => e.stopPropagation(), children: [_jsxs("div", { className: "drawer-header", children: [_jsx("button", { className: "drawer-back-btn", onClick: closeModal, children: _jsx(ArrowLeft, { size: 20 }) }), _jsxs("div", { className: "drawer-title-wrap", children: [_jsxs("h2", { className: "drawer-title", children: [selectedDate?.getDate(), " ", monthNames[selectedDate?.getMonth()], " ", selectedDate?.getFullYear()] }), _jsxs("span", { className: "drawer-subtitle", children: [getTasksForDate.length, " Tasks Scheduled"] })] }), _jsxs("button", { className: "add-task-btn", children: [_jsx(Plus, { size: 18 }), "Add Task"] })] }), _jsx("div", { className: "drawer-body", children: _jsxs("div", { className: "timeline-container", children: [_jsxs("div", { className: "timeline-header-row", children: [_jsx("div", { className: "time-label-header" }), _jsxs("div", { className: "time-slots-header", children: [_jsx("span", { children: "AM" }), _jsx("span", { children: "PM" })] })] }), _jsx("div", { className: "timeline-grid", children: [...Array(23)].map((_, hourIndex) => {
                                            const hour = hourIndex + 1;
                                            const tasksInHour = getTasksForDate.filter(task => {
                                                const taskHour = parseInt(task.dueTime.split(':')[0]);
                                                return taskHour === hour || (taskHour > hour && taskHour < hour + 1);
                                            });
                                            return (_jsxs("div", { className: "timeline-row", children: [_jsxs("div", { className: "time-label", children: [hour <= 12 ? hour : hour - 12, " ", hour < 12 || hour === 24 ? 'AM' : 'PM'] }), _jsx("div", { className: "time-slot", onDragOver: (e) => handleDragOverTask(e, hour), onDrop: (e) => handleDropTask(e, hour), children: tasksInHour.length > 0 && tasksInHour.map(task => (_jsxs("div", { className: `timeline-task ${task.category.toLowerCase()}`, draggable: true, onDragStart: (e) => handleDragStartTask(e, task), children: [_jsxs("div", { className: "task-header-row", children: [_jsx("div", { className: "task-time", children: task.dueTime }), _jsx("button", { className: "task-delete-btn", onClick: (e) => handleDeleteTask(task.id, e), children: "\u00D7" })] }), _jsx("div", { className: "task-title", children: task.title })] }, task.id))) })] }, hour));
                                        }) })] }) })] }) }))] }));
};
export default Calendar;
//# sourceMappingURL=Calendar.js.map