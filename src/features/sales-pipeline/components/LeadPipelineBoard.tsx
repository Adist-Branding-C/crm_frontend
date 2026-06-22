import React from 'react';
import { stageColor } from '../constants';
import LeadCard from './LeadCard';
import type { LeadPipelineBoardProps } from '../types/pipeline.types';

const LeadPipelineBoard: React.FC<LeadPipelineBoardProps> = ({
  filteredLeadGroups, loadingLeadStatusId,
  loadMoreLeads, getAvatarColor,
}) => {
  return (
    <div className="pipeline-board">
      {filteredLeadGroups.map(group =>
        <div
          key={group.statusId}
          className="pipeline-column"
        >
          <div className="column-header" style={{ borderTopColor: stageColor(group.statusId) }}>
            <div className="column-title">
              <span className="column-name">{group.status}</span>
              <span className="column-count">{group.count}</span>
            </div>
          </div>
          <div className="column-cards">
            {group.leads.map(lead =>
              <LeadCard
                key={lead.id}
                lead={lead}
                getAvatarColor={getAvatarColor}
              />
            )}
          </div>
          <button
            className="see-more-btn"
            onClick={() => loadMoreLeads(group.statusId)}
            disabled={loadingLeadStatusId === group.statusId}
          >
            {loadingLeadStatusId === group.statusId ? 'Loading...' : 'See More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default LeadPipelineBoard;
