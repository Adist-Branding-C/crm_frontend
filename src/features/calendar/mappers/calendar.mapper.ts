import type { CalendarApiDateItem, CalendarTask } from '../types';

// Leads.id and Tasks.id are both small auto-increment PKs from separate
// tables, so they collide once merged into one CalendarTask[] list - offset
// followup-derived ids well out of range of any real task id to keep React
// keys (and the id passed to onDeleteTask) unique.
const FOLLOWUP_ID_OFFSET = 1_000_000_000;

function toHoursMinutes(time: string): string {
  return time.slice(0, 5);
}

function timeFromIsoString(isoDateTime: string): string {
  const timePart = isoDateTime.split('T')[1];
  return timePart ? toHoursMinutes(timePart) : '00:00';
}

export function mapCalendarResponseToTasks(items: CalendarApiDateItem[]): CalendarTask[] {
  const result: CalendarTask[] = [];

  for (const dateItem of items) {
    for (const task of dateItem.tasks) {
      result.push({
        id: task.id,
        origin: 'task',
        title: task.title,
        category: 'Task',
        description: task.description ?? '',
        contactName: '',
        contactPhone: '',
        assignedTo: task.assignedTo != null ? String(task.assignedTo) : '',
        dueDate: dateItem.date,
        dueTime: task.time ? toHoursMinutes(task.time) : '00:00',
        addedOn: '',
        addedTime: '',
        addedBy: '',
        status: (task.status ?? '').toLowerCase(),
        priority: (task.priority ?? '').toLowerCase(),
      });
    }

    for (const followup of dateItem.followups) {
      result.push({
        id: followup.id + FOLLOWUP_ID_OFFSET,
        origin: 'followup',
        title: `Follow up: ${followup.name}`,
        category: 'Follow-up',
        description: '',
        contactName: followup.name,
        contactPhone: followup.phone,
        assignedTo: followup.assignedTo != null ? String(followup.assignedTo) : '',
        dueDate: dateItem.date,
        dueTime: timeFromIsoString(followup.nextFollowUpDate),
        addedOn: '',
        addedTime: '',
        addedBy: '',
        status: 'pending',
        priority: 'medium',
      });
    }
  }

  return result;
}
