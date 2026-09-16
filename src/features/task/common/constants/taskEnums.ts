/**
 * Shared enums for the task domain values used across the task and
 * task-settings features - priority, status and repeat type.
 *
 * Used by:
 * - Task / Call Task / Campaign Task / Deal Task forms, mappers, services,
 *   validations, constants and kanban/table components
 * - Escalation Rules (task-settings) priority tiers
 *
 * Notes:
 * - Member values mirror the wire format the backend stores and returns
 *   (Title Case priority/status, Capitalized repeat type), so enum members can
 *   be placed directly into form values, payloads and yup oneOf lists.
 * - The shared TaskStatus enum in shared/constants/enums is deliberately not
 *   reused here - its members are lowercase (pending/completed/overdue) and
 *   include an OVERDUE pseudo-status, whereas the task entity's stored statuses
 *   are exactly `Pending` | `Completed` (backend tasks/types/task.enum.ts).
 */
export enum TaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export enum TaskStatus {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
}

export enum RepeatType {
  NEVER = 'Never',
  DAILY = 'Daily',
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
}