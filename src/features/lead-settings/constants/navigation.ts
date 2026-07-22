import { Tag, Layers, Activity, Target, FileText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface LeadSettingsTab {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
}

export const LEAD_SETTINGS_TABS: LeadSettingsTab[] = [
  { id: 'types', label: 'Lead Types', path: '/settings/lead-settings/types', icon: Tag },
  { id: 'source', label: 'Lead Source', path: '/settings/lead-settings/source', icon: Layers },
  { id: 'status', label: 'Lead Status', path: '/settings/lead-settings/status', icon: Activity },
  { id: 'purpose', label: 'Lead Purpose', path: '/settings/lead-settings/purpose', icon: Target },
  { id: 'additional', label: 'Additional Fields', path: '/settings/lead-settings/additional', icon: FileText },
];
