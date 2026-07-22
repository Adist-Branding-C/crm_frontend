import React from 'react';
import { taskStatusColor } from '../utils/pipelineColor.util';
import TaskCard from './TaskCard';
import DroppableColumn from './DroppableColumn';
import PipelineColumnEmptyState from './PipelineColumnEmptyState';
import type { TaskPipelineBoardProps } from '../types';

const TaskPipelineBoard: React.FC<TaskPipelineBoardProps> = ({
  filteredTaskGroups,
  loadingTaskStatus,
  loadMoreTasks,
}) => {
  return (
    <div className="pipeline-board">
      {filteredTaskGroups.map((group) => (
        <DroppableColumn
          key={group.status}
          id={`task-col-${group.status}`}
          data={{ status: group.status }}
        >
          <div
            className="column-header"
            style={{ borderTopColor: taskStatusColor(group.status) }}
          >
            <div className="column-title">
              <span className="column-name">{group.status}</span>
              <span className="column-count">{group.count}</span>
            </div>
          </div>
          <div className="column-cards">
            {group.items.length === 0 ? (
              <PipelineColumnEmptyState message="No tasks in this stage" />
            ) : (
              group.items.map((task) => <TaskCard key={task.id} task={task} />)
            )}
          </div>
          {group.items.length < group.count && (
            <button
              className="see-more-btn"
              onClick={() => loadMoreTasks(group.status)}
              disabled={loadingTaskStatus === group.status}
            >
              {loadingTaskStatus === group.status ? 'Loading...' : 'See More'}
            </button>
          )}
        </DroppableColumn>
      ))}
    </div>
  );
};

export default TaskPipelineBoard;
