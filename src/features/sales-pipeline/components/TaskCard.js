import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Calendar } from 'lucide-react';
const TaskCard = ({ task, getAvatarColor }) => {
    return (_jsxs("div", { className: "deal-card", children: [_jsx("div", { className: "deal-title", children: task.title }), _jsx("div", { className: "deal-footer", children: _jsxs("div", { className: "deal-contact", children: [_jsx("div", { className: "contact-avatar", style: { background: getAvatarColor(task.assignedTo) }, children: task.assignedTo.charAt(0) }), _jsx("span", { children: task.assignedTo })] }) }), _jsxs("div", { className: "deal-due", children: [_jsx(Calendar, { size: 12 }), _jsx("span", { children: task.scheduledDate })] })] }));
};
export default TaskCard;
//# sourceMappingURL=TaskCard.js.map