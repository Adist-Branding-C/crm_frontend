import { memo } from 'react';
import { TRow, TCell } from '../../../shared/components/table';
import type { WebhookEndpoint } from '../types';

interface WebhookEndpointRowProps {
  endpoint: WebhookEndpoint;
  onClick: () => void;
}

const WebhookEndpointRow = ({ endpoint, onClick }: WebhookEndpointRowProps) => (
  <TRow className="automation-clickable-row" onClick={onClick}>
    <TCell>{endpoint.url}</TCell>
    <TCell>{endpoint.description ?? '-'}</TCell>
    <TCell>
      {endpoint.lastStatus ? (
        <span className={`badge ${endpoint.lastStatus === 'success' ? 'badge-exec-success' : 'badge-exec-failed'}`}>
          {endpoint.lastStatus === 'success' ? 'Success' : 'Failed'}
        </span>
      ) : '-'}
    </TCell>
    <TCell>{endpoint.lastTriggeredAt ? new Date(endpoint.lastTriggeredAt).toLocaleString() : '-'}</TCell>
    <TCell>
      <span className={`automation-failure-count ${endpoint.consecutiveFailureCount > 2 ? 'warning' : ''}`}>
        {endpoint.consecutiveFailureCount}
      </span>
    </TCell>
  </TRow>
);

export default memo(WebhookEndpointRow);
