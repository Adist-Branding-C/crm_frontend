import { FileText, Tag, Globe, Layers } from 'lucide-react';
import type { AdditionalField } from '../types';

export const menuItems = [
  { id: 'purpose', label: 'Purpose', link: '/settings/lead-settings/purpose', icon: FileText },
  { id: 'status', label: 'Status', link: '/settings/lead-settings/status', icon: Tag },
  { id: 'source', label: 'Source', link: '/settings/lead-settings/source', icon: Globe },
  { id: 'types', label: 'Types', link: '/settings/lead-settings/types', icon: Layers },
  { id: 'additional', label: 'Additional Fields', link: '/settings/lead-settings/additional', icon: FileText },
];

export const INITIAL_DATA: AdditionalField[] = [
  { id: 1, field: 'Assigned Date', type: 'DateTime', inFilter: false, inList: true, required: false, purpose: false },
  { id: 2, field: 'Date', type: 'Date', inFilter: true, inList: true, required: false, purpose: false },
  { id: 3, field: 'Remarks', type: 'Text', inFilter: true, inList: true, required: false, purpose: false },
  { id: 4, field: 'location', type: 'Text', inFilter: true, inList: true, required: false, purpose: false },
];
