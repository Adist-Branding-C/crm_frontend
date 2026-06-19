import React from 'react';
import { taskStageColor } from '../constants';
import TaskCard from './TaskCard';
import type { TaskPipelineBoardProps } from '../types/pipeline.types';

const TaskPipelineBoard: React.FC<TaskPipelineBoardProps> = ({
  filteredTaskGroups, loadingTaskStatus,
  loadMoreTasks, getAvatarColor,
}) => {
  return (
    <div className="pipeline-board">
      {filteredTaskGroups.map(group =>
        <div
          key={group.status}
          className="pipeline-column"
        >
          <div className="column-header" style={{ borderTopColor: taskStageColor(group.status) }}>
            <div className="column-title">
              <span className="column-name">{group.status}</span>
              <span className="column-count">{group.count}</span>
            </div>
          </div>
          <div className="column-cards">
            {group.items.map(task =>
              <TaskCard
                key={task.id}
                task={task}
                getAvatarColor={getAvatarColor}
              />
            )}
          </div>
          <button
            className="see-more-btn"
            onClick={() => loadMoreTasks(group.status)}
            disabled={loadingTaskStatus === group.status}
          >
            {loadingTaskStatus === group.status ? 'Loading...' : 'See More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskPipelineBoard;
