import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { taskStageColor } from '../constants';
import TaskCard from './TaskCard';
const TaskPipelineBoard = ({ filteredTaskGroups, loadingTaskStatus, loadMoreTasks, getAvatarColor, }) => {
    return (_jsx("div", { className: "pipeline-board", children: filteredTaskGroups.map(group => _jsxs("div", { className: "pipeline-column", children: [_jsx("div", { className: "column-header", style: { borderTopColor: taskStageColor(group.status) }, children: _jsxs("div", { className: "column-title", children: [_jsx("span", { className: "column-name", children: group.status }), _jsx("span", { className: "column-count", children: group.count })] }) }), _jsx("div", { className: "column-cards", children: group.items.map(task => _jsx(TaskCard, { task: task, getAvatarColor: getAvatarColor }, task.id)) }), _jsx("button", { className: "see-more-btn", onClick: () => loadMoreTasks(group.status), disabled: loadingTaskStatus === group.status, children: loadingTaskStatus === group.status ? 'Loading...' : 'See More' })] }, group.status)) }));
};
export default TaskPipelineBoard;
//# sourceMappingURL=TaskPipelineBoard.js.map