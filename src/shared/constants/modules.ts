// Centralized CRUD module registry.
//
// The Role Management UI (and any future permission-driven feature) renders its module
// list dynamically from this single config — so adding a new module only requires a new
// entry here, never a change to the Role code.
//
// IMPORTANT: Do not hardcode a module name/key anywhere in Role Management (or other
// permission-aware UI). Always read from MODULES.

export const PERMISSIONS = ['create', 'read', 'edit', 'delete'] as const;

export type PermissionKey = (typeof PERMISSIONS)[number];

export const PERMISSION_LABELS: Record<PermissionKey, string> = {
  create: 'Create',
  read: 'Read',
  edit: 'Edit',
  delete: 'Delete',
};

export interface ModuleConfig {
  /** Stable, unique machine key. Sent to the backend and used as the map key for a role's permissions. */
  key: string;
  /** Human-readable label shown in the Role Management permission matrix. */
  label: string;
}

// IMPORTANT: keys must match the backend's canonical module keys exactly
// (character-for-character) — see src/config/module-permissions.config.ts
// MODULE_KEYS on the backend, which is the source of truth. The permission
// payload sent to the backend uses these keys verbatim, so any mismatch
// (case / pluralization / underscores) will be rejected server-side.
//
// Only the modules listed here are rendered in the "Module Permissions" table
// and included in the submitted permissions object. Trim/extend this array to
// add or remove grantable modules — nothing else in Role Management changes.
export const MODULES: ModuleConfig[] = [
  { key: 'LEADS', label: 'Leads' },
  { key: 'DEALS', label: 'Deals' },
  { key: 'TASKS', label: 'Tasks' },
  { key: 'CAMPAIGNS', label: 'Campaigns' },
];

/**
 * Shape of a role's permission grants: module key -> which of the CRUD permissions are enabled.
 *
 * Example:
 *   { LEADS: { create: true, read: true, edit: true, delete: false }, DEALS: { ... }, ... }
 */
export type ModulePermissions = Record<string, Partial<Record<PermissionKey, boolean>>>;
