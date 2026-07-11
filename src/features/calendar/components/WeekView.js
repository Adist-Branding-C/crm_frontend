import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { DAY_NAMES } from '../constants';
const WeekView = ({ currentDate, getAgentsFilteredTasks, isToday }) => {
    const weekDays = useMemo(() => Array.from({ length: 7 }, (_, i) => {
        const d = new Date(currentDate);
        d.setDate(currentDate.getDate() - currentDate.getDay() + i);
        return d;
    }), [currentDate]);
    const tasksByDay = useMemo(() => weekDays.map(weekDate => ({
        date: weekDate,
        tasks: getAgentsFilteredTasks.filter(task => {
            const taskDate = new Date(task.dueDate);
            return taskDate.toDateString() === weekDate.toDateString();
        }),
    })), [weekDays, getAgentsFilteredTasks]);
    return (_jsxs("div", { className: "week-view", children: [_jsx("div", { className: "week-view-header", children: weekDays.map((weekDate, i) => (_jsxs("div", { className: `week-day-header ${isToday(weekDate) ? 'today' : ''}`, children: [_jsx("span", { className: "week-day-name", children: DAY_NAMES[i] }), _jsx("span", { className: "week-date", children: weekDate.getDate() })] }, i))) }), _jsx("div", { className: "week-view-body", children: tasksByDay.map(({ tasks }, i) => (_jsx("div", { className: "week-day-column", children: tasks.length === 0 ? _jsx("div", { className: "no-tasks", children: "-" }) : (tasks.map(task => (_jsxs("div", { className: `week-task-item ${task.priority}`, children: [_jsx("span", { className: "week-task-time", children: task.dueTime }), _jsx("span", { className: "week-task-title", children: task.title })] }, task.id)))) }, i))) })] }));
};
export default WeekView;
//# sourceMappingURL=WeekView.js.map