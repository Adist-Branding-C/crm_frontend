import React from 'react';
import { stageColor } from '../constants';
import DealCard from './DealCard';
import type { DealPipelineBoardProps } from '../types/pipeline.types';

const DealPipelineBoard: React.FC<DealPipelineBoardProps> = ({
  filteredStatusGroups, loadingStatusId,
  loadMoreDeals, handleDragStart,
  handleDragOver, handleDrop, getAvatarColor,
}) => {
  return (
    <div className="pipeline-board">
      {filteredStatusGroups.map(group =>
        <div
          key={group.statusId}
          className="pipeline-column"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, group.statusId)}
        >
          <div className="column-header" style={{ borderTopColor: stageColor(group.statusId) }}>
            <div className="column-title">
              <span className="column-name">{group.status}</span>
              <span className="column-count">{group.count}</span>
            </div>
          </div>
          <div className="column-cards">
            {group.deals.map(deal =>
              <DealCard
                key={deal.id}
                deal={deal}
                onDragStart={handleDragStart}
                getAvatarColor={getAvatarColor}
              />
            )}
          </div>
          <button
            className="see-more-btn"
            onClick={() => loadMoreDeals(group.statusId)}
            disabled={loadingStatusId === group.statusId}
          >
            {loadingStatusId === group.statusId ? 'Loading...' : 'See More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default DealPipelineBoard;
