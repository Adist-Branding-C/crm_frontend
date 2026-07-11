import { jsx as _jsx } from "react/jsx-runtime";
import { Phone, MessageSquare, Users, Tag } from 'lucide-react';
export const SETTINGS_TABS = [
    { label: 'Call Status', path: '/user/call_status', icon: _jsx(Phone, { size: 16 }) },
    { label: 'Call Reasons', path: '/user/call_reasons', icon: _jsx(MessageSquare, { size: 16 }) },
    { label: 'Meeting Outcome', path: '/user/meeting_outcome', icon: _jsx(Users, { size: 16 }) },
    { label: 'Task Categories', path: '/user/task_categories', icon: _jsx(Tag, { size: 16 }) },
];
//# sourceMappingURL=index.js.map