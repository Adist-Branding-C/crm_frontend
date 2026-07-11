import React from 'react';
import { Inbox } from 'lucide-react';
import { stageColor } from '../constants';
import DealCard from './DealCard';
import DroppableColumn from './DroppableColumn';
import type { DealPipelineBoardProps } from '../types/pipeline.types';

const DealPipelineBoard: React.FC<DealPipelineBoardProps> = ({
  filteredStatusGroups, loadingStatusId,
  loadMoreDeals, getAvatarColor,
}) => {
  return (
    <div className="pipeline-board">
      {filteredStatusGroups.map(group => (
        <DroppableColumn
          key={group.statusId}
          id={`deal-col-${group.statusId}`}
          data={{ statusId: group.statusId }}
        >
          <div className="column-header" style={{ borderTopColor: stageColor(group.status) }}>
            <div className="column-title">
              <span className="column-name">{group.status}</span>
              <span className="column-count">{group.count}</span>
            </div>
          </div>
          <div className="column-cards">
            {group.deals.length === 0 ? (
              <div className="pipeline-column-empty">
                <Inbox size={32} />
                <p>No deals in this stage</p>
              </div>
            ) : (
              group.deals.map(deal =>
                <DealCard
                  key={deal.id}
                  deal={deal}
                  statusId={group.statusId}
                  getAvatarColor={getAvatarColor}
                />
              )
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
