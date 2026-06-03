import { Tag, Layers, FileText } from 'lucide-react';
import type { DealAdditionalField } from '../types';

export const menuItems = [
  { id: 'types', label: 'Type', link: '/user/deal-types', icon: Tag },
  { id: 'stages', label: 'Status', link: '/user/deal-stages', icon: Layers },
  { id: 'additional', label: 'Additional Fields', link: '/user/additional-fields-deal', icon: FileText },
];

export const INITIAL_DATA: DealAdditionalField[] = [];
