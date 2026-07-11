import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowLeft, Plus } from 'lucide-react';
import { MONTH_NAMES } from '../constants';
const DayDrawer = ({ isOpen, selectedDate, tasks, onClose, onDragStartTask, onDragOverTask, onDropTask, onDeleteTask }) => {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "drawer-overlay", onClick: onClose, children: _jsxs("div", { className: "day-drawer", onClick: e => e.stopPropagation(), children: [_jsxs("div", { className: "drawer-header", children: [_jsx("button", { className: "drawer-back-btn", onClick: onClose, children: _jsx(ArrowLeft, { size: 20 }) }), _jsxs("div", { className: "drawer-title-wrap", children: [_jsxs("h2", { className: "drawer-title", children: [selectedDate?.getDate(), " ", MONTH_NAMES[selectedDate?.getMonth() ?? 0], " ", selectedDate?.getFullYear()] }), _jsxs("span", { className: "drawer-subtitle", children: [tasks.length, " Tasks Scheduled"] })] }), _jsxs("button", { className: "add-task-btn", children: [_jsx(Plus, { size: 18 }), " Add Task"] })] }), _jsx("div", { className: "drawer-body", children: _jsxs("div", { className: "timeline-container", children: [_jsxs("div", { className: "timeline-header-row", children: [_jsx("div", { className: "time-label-header" }), _jsxs("div", { className: "time-slots-header", children: [_jsx("span", { children: "AM" }), _jsx("span", { children: "PM" })] })] }), _jsx("div", { className: "timeline-grid", children: [...Array(23)].map((_, hourIndex) => {
                                    const hour = hourIndex + 1;
                                    const tasksInHour = tasks.filter(task => {
                                        const taskHour = parseInt(task.dueTime.split(':')[0] || '0', 10);
                                        return taskHour === hour;
                                    });
                                    return (_jsxs("div", { className: "timeline-row", children: [_jsxs("div", { className: "time-label", children: [hour <= 12 ? hour : hour - 12, " ", hour < 12 || hour === 24 ? 'AM' : 'PM'] }), _jsx("div", { className: "time-slot", onDragOver: onDragOverTask, onDrop: (e) => onDropTask(e, hour), children: tasksInHour.map(task => (_jsxs("div", { className: `timeline-task ${task.category.toLowerCase()}`, draggable: true, onDragStart: (e) => onDragStartTask(e, task), children: [_jsxs("div", { className: "task-header-row", children: [_jsx("div", { className: "task-time", children: task.dueTime }), _jsx("button", { className: "task-delete-btn", onClick: (e) => onDeleteTask(task.id, e), children: "x" })] }), _jsx("div", { className: "task-title", children: task.title })] }, task.id))) })] }, hour));
                                }) })] }) })] }) }));
};
export default DayDrawer;
//# sourceMappingURL=DayDrawer.js.map