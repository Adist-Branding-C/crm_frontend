import { ListChecks, Phone, Megaphone, Briefcase } from 'lucide-react';
import type { TaskTaskTypeKey, TaskTypeConfig, TypeOption } from '../types/taskType.types';

/**
 * Central task-type registry: label, badge colors and the type-specific
 * association field every task-type form/table needs.
 *
 * Used by:
 * - TaskTypeBadge, TaskTypeFilter, unified TaskPage, TaskKanbanView
 * - GenericTaskForm (unified mode), UnifiedTaskMapper & validation lookups
 * - unifiedTask.helpers (related-entity resolution)
 *
 * Notes:
 * - Single source of truth for "which association field belongs to which type",
 *   so the unified form and table never diverge on the per-type required field.
 * - createEndpoint was dropped deliberately: every type now creates through the
 *   unified POST /tasks with `taskType` in the payload (calendar's per-type
 *   create services are untouched and keep their own endpoints).
 */
export const TASK_TYPE_CONFIG: Record<TaskTaskTypeKey, TaskTypeConfig> = {
  GENERAL: {
    label: 'General',
    icon: ListChecks,
    badgeColor: '#3b82f6',
    badgeBg: '#eff6ff',
    associationFieldName: 'categoryId',
    associationLabel: 'Category',
    associationPlaceholder: 'Select a category',
    associationLoadingLabel: 'Loading categories...',
    associationEmptyMessage: 'No categories available.',
  },
  CALL: {
    label: 'Call',
    icon: Phone,
    badgeColor: '#10b981',
    badgeBg: '#ecfdf5',
    associationFieldName: 'leadId',
    associationLabel: 'Lead',
    associationPlaceholder: 'Select a lead',
    associationLoadingLabel: 'Loading leads...',
    associationEmptyMessage: 'No leads available.',
  },
  CAMPAIGN: {
    label: 'Campaign',
    icon: Megaphone,
    badgeColor: '#f59e0b',
    badgeBg: '#fffbeb',
    associationFieldName: 'campaignId',
    associationLabel: 'Campaign',
    associationPlaceholder: 'Select a campaign',
    associationLoadingLabel: 'Loading campaigns...',
    associationEmptyMessage: 'No campaigns available.',
  },
  DEAL: {
    label: 'Deal',
    icon: Briefcase,
    badgeColor: '#8b5cf6',
    badgeBg: '#f5f3ff',
    associationFieldName: 'dealId',
    associationLabel: 'Deal',
    associationPlaceholder: 'Select a deal',
    associationLoadingLabel: 'Loading deals...',
    associationEmptyMessage: 'No deals available.',
  },
};

/** Ordered list used to render the Type dropdown (form + filters), '' is the placeholder. */
export const TASK_TYPE_OPTIONS: TypeOption<TaskTaskTypeKey | ''>[] = [
  { value: '', label: 'Select task type' },
  { value: 'GENERAL', label: 'General' },
  { value: 'CALL', label: 'Call' },
  { value: 'CAMPAIGN', label: 'Campaign' },
  { value: 'DEAL', label: 'Deal' },
];

/** Filter options for the table and kanban Type controls; 'ALL' first matches the spec label. */
export const TASK_TYPE_FILTER_OPTIONS: TypeOption<TaskTaskTypeKey | 'ALL'>[] = [
  { value: 'ALL', label: 'All' },
  { value: 'GENERAL', label: 'General' },
  { value: 'CALL', label: 'Call' },
  { value: 'CAMPAIGN', label: 'Campaign' },
  { value: 'DEAL', label: 'Deal' },
];