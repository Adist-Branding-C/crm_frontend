import type { SelectOption } from '../../../shared/types/common';

export type Agent = SelectOption;


export type CalendarTaskOrigin = 'task' | 'followup';

export interface CalendarTask {
  id: number;
  origin: CalendarTaskOrigin;
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
  onAddTask: () => void;
  onDragStartTask: (e: React.DragEvent, task: CalendarTask) => void;
  onDragOverTask: (e: React.DragEvent) => void;
  onDropTask: (e: React.DragEvent, hour: number) => void;
  onDeleteTask: (task: CalendarTask, e: React.MouseEvent) => void;
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

// GET /calendar response shapes - see CalendarTaskItem/CalendarFollowupItem/
// CalendarDateItem in crm_backend's calendar.dto.ts.
export interface CalendarApiTaskItem {
  id: number;
  title: string;
  time: string | null;
  status: string;
  priority: string;
  category: number | string | null;
  leadId?: string | number | null;
  description?: string;
  assignedTo: string | number | null;
}

export interface CalendarApiFollowupItem {
  id: number;
  leadId: string;
  name: string;
  phone: string;
  nextFollowUpDate: string;
  assignedTo: string | number | null;
}

export interface CalendarApiDateItem {
  date: string;
  tasks: CalendarApiTaskItem[];
  followups: CalendarApiFollowupItem[];
}

export interface CalendarControlsProps {
  viewMode: 'day' | 'week' | 'month';
  onViewModeChange: (mode: 'day' | 'week' | 'month') => void;
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onTodayClick: () => void;
  agents: Agent[];
  selectedAgent: number;
  onAgentChange: (id: number) => void;
  selectedAgentName: string;
  showAgentDropdown: boolean;
  onSetShowAgentDropdown: (v: boolean) => void;
  searchQuery: string;
  onSearchChange: (v: string) => void;
}
