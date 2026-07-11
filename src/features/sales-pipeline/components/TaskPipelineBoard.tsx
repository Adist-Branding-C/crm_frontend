import React from 'react';
import { Inbox } from 'lucide-react';
import { taskStageColor } from '../constants';
import TaskCard from './TaskCard';
import DroppableColumn from './DroppableColumn';
import type { TaskPipelineBoardProps } from '../types/pipeline.types';

const TaskPipelineBoard: React.FC<TaskPipelineBoardProps> = ({
  filteredTaskGroups, loadingTaskStatus,
  loadMoreTasks, getAvatarColor,
}) => {
  return (
    <div className="pipeline-board">
      {filteredTaskGroups.map(group => (
        <DroppableColumn
          key={group.status}
          id={`task-col-${group.status}`}
          data={{ status: group.status }}
        >
          <div className="column-header" style={{ borderTopColor: taskStageColor(group.status) }}>
            <div className="column-title">
              <span className="column-name">{group.status}</span>
              <span className="column-count">{group.count}</span>
            </div>
          </div>
          <div className="column-cards">
            {group.items.length === 0 ? (
              <div className="pipeline-column-empty">
                <Inbox size={32} />
                <p>No tasks in this stage</p>
              </div>
            ) : (
              group.items.map(task =>
                <TaskCard
                  key={task.id}
                  task={task}
                  getAvatarColor={getAvatarColor}
                />
              )
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
