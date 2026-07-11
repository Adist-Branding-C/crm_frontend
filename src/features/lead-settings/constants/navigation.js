import { Tag, Layers, Activity, Target, FileText } from 'lucide-react';
export const LEAD_SETTINGS_TABS = [
    { id: 'types', label: 'Lead Types', path: '/settings/lead-settings/types', icon: Tag },
    { id: 'source', label: 'Lead Source', path: '/settings/lead-settings/source', icon: Layers },
    { id: 'status', label: 'Lead Status', path: '/settings/lead-settings/status', icon: Activity },
    { id: 'purpose', label: 'Lead Purpose', path: '/settings/lead-settings/purpose', icon: Target },
    { id: 'additional', label: 'Additional Fields', path: '/settings/lead-settings/additional', icon: FileText },
];
//# sourceMappingURL=navigation.js.map