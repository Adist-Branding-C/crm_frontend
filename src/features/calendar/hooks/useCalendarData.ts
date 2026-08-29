import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { ALL_AGENTS, ALL_AGENTS_ID, MONTH_NAMES, DAY_NAMES } from '../constants';
import { calendarService } from '../services/calendarService';
import { mapCalendarResponseToTasks } from '../mappers/calendar.mapper';
import { taskDataService } from '../../task/task/services/taskDataService';
import { useDeleteConfirmation } from '../../../shared/hooks/useDeleteConfirmation';
import { useStaffOptions } from '../../task/common/hooks/useStaffOptions';
import { toLocalDateString } from '../../../shared/utils/dateUtils';
import type { ToastType } from '../../../shared/types/toast.types';
import type { CalendarTask, Agent } from '../types';

const TODAY = new Date();

export function useCalendarData(showToastMessage: (message: string, type: ToastType) => void) {
  const [selectedAgent, setSelectedAgent] = useState(ALL_AGENTS_ID);
  const [taskTypeFilter, setTaskTypeFilter] = useState('ALL');
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAgentDropdown, setShowAgentDropdown] = useState(false);
  const [tasks, setTasks] = useState<CalendarTask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [draggedTask, setDraggedTask] = useState<CalendarTask | null>(null);

  const staff = useStaffOptions();
  useEffect(() => {
    staff.loadStaff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const agents = useMemo<Agent[]>(
    () => [ALL_AGENTS, ...staff.staffOptions.map(o => ({ id: Number(o.value), name: o.label }))],
    [staff.staffOptions],
  );

  const getAgentsFilteredTasks = useMemo(() => {
    let filtered = [...tasks];
    if (selectedAgent !== ALL_AGENTS_ID) {
      filtered = filtered.filter(t => t.assignedTo === String(selectedAgent));
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

  // The calendar grid (getCalendarDays) always spans a padded month range
  // that covers whatever the day/week views currently need too, since both
  // are derived from the same currentDate - refetching whenever that range
  // changes keeps all three view modes backed by real data.
  const rangeStart = getCalendarDays[0];
  const rangeEnd = getCalendarDays[getCalendarDays.length - 1];

  // Kept in a ref so refetch() (called after create/update/delete) always
  // reads the latest range without needing to be recreated itself.
  const rangeRef = useRef({ start: rangeStart, end: rangeEnd });
  rangeRef.current = { start: rangeStart, end: rangeEnd };

  const fetchCalendar = useCallback((isCancelled: () => boolean) => {
    const { start, end } = rangeRef.current;
    if (!start || !end) return;

    setIsLoading(true);
    setIsError(false);

    return calendarService
      .getCalendar({
        startDate: toLocalDateString(start),
        endDate: toLocalDateString(end),
        type: taskTypeFilter === 'ALL' ? undefined : taskTypeFilter,
      })
      .then((items) => {
        if (isCancelled()) return;
        setTasks(mapCalendarResponseToTasks(items));
      })
      .catch((error) => {
        if (isCancelled()) return;
        console.error('useCalendarData: failed to fetch calendar', error);
        setIsError(true);
      })
      .finally(() => {
        if (!isCancelled()) setIsLoading(false);
      });
  }, []);

  const refetch = useCallback(() => fetchCalendar(() => false), [fetchCalendar]);

  useEffect(() => {
    if (!rangeStart || !rangeEnd) return;

    let cancelled = false;
    fetchCalendar(() => cancelled);

    return () => {
      cancelled = true;
    };
  }, [rangeStart?.getTime(), rangeEnd?.getTime(), fetchCalendar, taskTypeFilter]);

  const isToday = useCallback((date: Date) => date.toDateString() === TODAY.toDateString(), []);
  const isCurrentMonth = useCallback((date: Date) => date.getMonth() === currentDate.getMonth(), [currentDate]);

  const handlePrevMonth = useCallback(() => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') newDate.setDate(newDate.getDate() - 1);
    else if (viewMode === 'week') newDate.setDate(newDate.getDate() - 7);
    else newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  }, [currentDate, viewMode]);

  const handleNextMonth = useCallback(() => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') newDate.setDate(newDate.getDate() + 1);
    else if (viewMode === 'week') newDate.setDate(newDate.getDate() + 7);
    else newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  }, [currentDate, viewMode]);

  const handleDateClick = useCallback((date: Date) => {
    setSelectedDate(date);
    setModalOpen(true);
  }, []);

  const handleDragStartTask = useCallback((e: React.DragEvent, task: CalendarTask) => {
    if (task.origin !== 'task') {
      e.preventDefault();
      return;
    }
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOverTask = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDropTask = useCallback((e: React.DragEvent, hour: number) => {
    e.preventDefault();
    const task = draggedTask;
    setDraggedTask(null);
    if (!task || task.origin !== 'task') return;

    const newTime = `${hour.toString().padStart(2, '0')}:00`;
    const previousTasks = tasks;
    // Optimistic update so the timeline reflects the move immediately;
    // reverted below if the backend save fails.
    setTasks(prev => prev.map(t => (t.id === task.id ? { ...t, dueTime: newTime } : t)));

    taskDataService
      .update(task.id, { scheduledTime: newTime })
      .then((response) => {
        if (!response.status) {
          setTasks(previousTasks);
          showToastMessage(response.message || 'Failed to reschedule task', 'error');
          return;
        }
        showToastMessage('Task rescheduled', 'success');
      })
      .catch(() => {
        setTasks(previousTasks);
        showToastMessage('Failed to reschedule task', 'error');
      });
  }, [draggedTask, tasks, showToastMessage]);

  const deleteTask = useCallback(async (task: CalendarTask): Promise<boolean> => {
    const previousTasks = tasks;
    setTasks(prev => prev.filter(t => t.id !== task.id));

    try {
      const response = await taskDataService.delete(task.id);
      if (!response.status) {
        setTasks(previousTasks);
        showToastMessage(response.message || 'Failed to delete task', 'error');
        return false;
      }
      showToastMessage('Task deleted', 'success');
      return true;
    } catch {
      setTasks(previousTasks);
      showToastMessage('Failed to delete task', 'error');
      return false;
    }
  }, [tasks, showToastMessage]);

  const deleteConfirm = useDeleteConfirmation<CalendarTask>(deleteTask);

  const handleDeleteTask = useCallback((task: CalendarTask, e: React.MouseEvent) => {
    e.stopPropagation();
    if (task.origin !== 'task') return;
    deleteConfirm.handleDeleteClick(task);
  }, [deleteConfirm]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSelectedDate(null);
  }, []);

  const handleTodayClick = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const selectedAgentName = agents.find(a => a.id === selectedAgent)?.name || 'All Agents';

  return {
    agents,
    selectedAgent, setSelectedAgent,
    taskTypeFilter, setTaskTypeFilter,
    currentDate, setCurrentDate,
    viewMode, setViewMode,
    selectedDate, setSelectedDate,
    modalOpen, setModalOpen,
    searchQuery, setSearchQuery,
    showAgentDropdown, setShowAgentDropdown,
    tasks, setTasks,
    isLoading, isError, refetch,
    draggedTask, setDraggedTask,
    getAgentsFilteredTasks,
    getDayView, getWeekView,
    getTasksForDate, getTasksCountForDate,
    getCalendarDays,
    isToday, isCurrentMonth,
    handlePrevMonth, handleNextMonth,
    handleDateClick,
    handleDragStartTask, handleDragOverTask, handleDropTask,
    handleDeleteTask,
    deletingTask: deleteConfirm.deletingItem,
    handleConfirmDeleteTask: deleteConfirm.handleConfirmDelete,
    closeDeleteTaskModal: deleteConfirm.closeDeleteModal,
    closeModal,
    handleTodayClick,
    selectedAgentName,
    MONTH_NAMES, DAY_NAMES,
  };
}
