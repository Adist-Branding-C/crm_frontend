import React from 'react';
import { hashStringToColor } from '../utils/pipelineColor.util';
import DealCard from './DealCard';
import DroppableColumn from './DroppableColumn';
import PipelineColumnEmptyState from './PipelineColumnEmptyState';
import type { DealPipelineBoardProps } from '../types';

const DealPipelineBoard: React.FC<DealPipelineBoardProps> = ({
  filteredStatusGroups,
  loadingStatusId,
  loadMoreDeals,
}) => {
  return (
    <div className="pipeline-board">
      {filteredStatusGroups.map((group) => (
        <DroppableColumn
          key={group.statusId}
          id={`deal-col-${group.statusId}`}
          data={{ statusId: group.statusId }}
        >
          <div
            className="column-header"
            style={{ borderTopColor: hashStringToColor(group.status) }}
          >
            <div className="column-title">
              <span className="column-name">{group.status}</span>
              <span className="column-count">{group.count}</span>
            </div>
          </div>
          <div className="column-cards">
            {group.deals.length === 0 ? (
              <PipelineColumnEmptyState message="No deals in this stage" />
            ) : (
              group.deals.map((deal) => (
                <DealCard key={deal.id} deal={deal} statusId={group.statusId} />
              ))
            )}
          </div>
          {group.deals.length < group.count && (
            <button
              className="see-more-btn"
              onClick={() => loadMoreDeals(group.statusId)}
              disabled={loadingStatusId === group.statusId}
            >
              {loadingStatusId === group.statusId ? 'Loading...' : 'See More'}
            </button>
          )}
        </DroppableColumn>
      ))}
    </div>
  );
};

export default DealPipelineBoard;
