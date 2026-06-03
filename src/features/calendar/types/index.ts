import type { SelectOption } from '../../../shared/types/common';

export type Agent = SelectOption;

export interface CalendarTask {
  id: number;
  title: string;
  category: string;
  description: string;
  contactName: string;
  contactPhone: string;
  assignedTo: string;
  dueDate: string;
  dueTime: string;
  addedOn: string;
  addedTime: string;
  addedBy: string;
  status: string;
  priority: string;
}

export interface DayDrawerProps {
  isOpen: boolean;
  selectedDate: Date | null;
  tasks: CalendarTask[];
  onClose: () => void;
  onDragStartTask: (e: React.DragEvent, task: CalendarTask) => void;
  onDragOverTask: (e: React.DragEvent) => void;
  onDropTask: (e: React.DragEvent, hour: number) => void;
  onDeleteTask: (taskId: number, e: React.MouseEvent) => void;
}

export interface MonthViewProps {
  currentDate: Date;
  calendarDays: Date[];
  isToday: (date: Date) => boolean;
  isCurrentMonth: (date: Date) => boolean;
  getTasksCountForDate: (date: Date) => { title: string; priority: string }[];
  onDateClick: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onTodayClick: () => void;
}

export interface WeekViewProps {
  currentDate: Date;
  tasks: CalendarTask[];
  isToday: (date: Date) => boolean;
  getAgentsFilteredTasks: CalendarTask[];
}

export interface DayViewProps {
  currentDate: Date;
  tasks: CalendarTask[];
}

export interface CalendarControlsProps {
  viewMode: 'day' | 'week' | 'month';
  onViewModeChange: (mode: 'day' | 'week' | 'month') => void;
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onTodayClick: () => void;
  selectedAgent: number;
  onAgentChange: (id: number) => void;
  selectedAgentName: string;
  showAgentDropdown: boolean;
  onSetShowAgentDropdown: (v: boolean) => void;
  searchQuery: string;
  onSearchChange: (v: string) => void;
}
