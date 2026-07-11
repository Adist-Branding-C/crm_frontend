import { useState, useMemo, useCallback } from 'react';
import { AGENTS, SAMPLE_TASKS, TODAY, MONTH_NAMES, DAY_NAMES } from '../constants';
export function useCalendarData() {
    const [selectedAgent, setSelectedAgent] = useState(1);
    const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 25));
    const [viewMode, setViewMode] = useState('month');
    const [selectedDate, setSelectedDate] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAgentDropdown, setShowAgentDropdown] = useState(false);
    const [tasks, setTasks] = useState(SAMPLE_TASKS);
    const [draggedTask, setDraggedTask] = useState(null);
    const getAgentsFilteredTasks = useMemo(() => {
        let filtered = [...tasks];
        if (selectedAgent !== 1) {
            const agent = AGENTS.find(a => a.id === selectedAgent);
            if (agent)
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
    const isToday = useCallback((date) => date.toDateString() === TODAY.toDateString(), []);
    const isCurrentMonth = useCallback((date) => date.getMonth() === currentDate.getMonth(), [currentDate]);
    const handlePrevMonth = useCallback(() => {
        const newDate = new Date(currentDate);
        if (viewMode === 'day')
            newDate.setDate(newDate.getDate() - 1);
        else if (viewMode === 'week')
            newDate.setDate(newDate.getDate() - 7);
        else
            newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
    }, [currentDate, viewMode]);
    const handleNextMonth = useCallback(() => {
        const newDate = new Date(currentDate);
        if (viewMode === 'day')
            newDate.setDate(newDate.getDate() + 1);
        else if (viewMode === 'week')
            newDate.setDate(newDate.getDate() + 7);
        else
            newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
    }, [currentDate, viewMode]);
    const handleDateClick = useCallback((date) => {
        setSelectedDate(date);
        setModalOpen(true);
    }, []);
    const handleCompleteTask = useCallback((taskId) => {
        setTasks(prev => prev.map(task => task.id === taskId ? { ...task, status: 'completed' } : task));
    }, []);
    const handleDragStartTask = useCallback((e, task) => {
        setDraggedTask(task);
        e.dataTransfer.effectAllowed = 'move';
    }, []);
    const handleDragOverTask = useCallback((e) => {
        e.preventDefault();
    }, []);
    const handleDropTask = useCallback((e, hour) => {
        e.preventDefault();
        if (draggedTask) {
            const newTime = hour.toString().padStart(2, '0') + ':00';
            setTasks(prev => prev.map(t => t.id === draggedTask.id ? { ...t, dueTime: newTime } : t));
        }
        setDraggedTask(null);
    }, [draggedTask]);
    const handleDeleteTask = useCallback((taskId, e) => {
        e.stopPropagation();
        setTasks(prev => prev.filter(t => t.id !== taskId));
    }, []);
    const closeModal = useCallback(() => {
        setModalOpen(false);
        setSelectedDate(null);
    }, []);
    const handleTodayClick = useCallback(() => {
        setCurrentDate(new Date(2026, 3, 25));
    }, []);
    const selectedAgentName = AGENTS.find(a => a.id === selectedAgent)?.name || 'All Agents';
    return {
        selectedAgent, setSelectedAgent,
        currentDate, setCurrentDate,
        viewMode, setViewMode,
        selectedDate, setSelectedDate,
        modalOpen, setModalOpen,
        searchQuery, setSearchQuery,
        showAgentDropdown, setShowAgentDropdown,
        tasks, setTasks,
        draggedTask, setDraggedTask,
        getAgentsFilteredTasks,
        getDayView, getWeekView,
        getTasksForDate, getTasksCountForDate,
        getCalendarDays,
        isToday, isCurrentMonth,
        handlePrevMonth, handleNextMonth,
        handleDateClick,
        handleCompleteTask,
        handleDragStartTask, handleDragOverTask, handleDropTask,
        handleDeleteTask,
        closeModal,
        handleTodayClick,
        selectedAgentName,
        MONTH_NAMES, DAY_NAMES,
    };
}
//# sourceMappingURL=useCalendarData.js.map