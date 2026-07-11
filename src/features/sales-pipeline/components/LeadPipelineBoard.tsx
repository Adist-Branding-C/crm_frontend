import React from 'react';
import { Inbox } from 'lucide-react';
import LeadCard from './LeadCard';
import DroppableColumn from './DroppableColumn';
import type { LeadPipelineBoardProps } from '../types/pipeline.types';

const LeadPipelineBoard: React.FC<LeadPipelineBoardProps> = ({
  filteredLeadGroups, loadingLeadStatusId,
  loadMoreLeads, getAvatarColor,
}) => {
  return (
    <div className="pipeline-board">
      {filteredLeadGroups.map(group => (
        <DroppableColumn
          key={group.statusId}
          id={`lead-col-${group.statusId}`}
          data={{ statusId: group.statusId }}
        >
          <div className="column-header" style={{ borderTopColor: group.color }}>
            <div className="column-title">
              <span className="column-name">{group.status}</span>
              <span className="column-count">{group.count}</span>
            </div>
          </div>
          <div className="column-cards">
            {group.leads.length === 0 ? (
              <div className="pipeline-column-empty">
                <Inbox size={32} />
                <p>No leads in this stage</p>
              </div>
            ) : (
              group.leads.map(lead =>
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  fromStatusId={group.statusId}
                  getAvatarColor={getAvatarColor}
                />
              )
            )}
          </div>
          {group.leads.length < group.count && (
            <button
              className="see-more-btn"
              onClick={() => loadMoreLeads(group.statusId)}
              disabled={loadingLeadStatusId === group.statusId}
            >
              {loadingLeadStatusId === group.statusId ? 'Loading...' : 'See More'}
            </button>
          )}
        </DroppableColumn>
      ))}
    </div>
  );
};

export default LeadPipelineBoard;
