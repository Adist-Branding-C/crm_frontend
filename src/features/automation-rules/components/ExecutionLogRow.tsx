import { memo, useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, RotateCcw } from 'lucide-react';
import { TRow, TCell } from '../../../shared/components/table';
import ExecutionStatusBadge from './ExecutionStatusBadge';
import WebhookHistoryTable from './WebhookHistoryTable';
import { ACTION_TYPE_META } from '../constants';
import { automationRulesApi } from '../services/automationRulesApi';
import { mapApiWebhookHistoryToUI } from '../mappers/automationRuleMapper';
import type { ExecutionLog, WebhookHistoryEntry } from '../types';

interface ExecutionLogRowProps {
  log: ExecutionLog;
  isExpanded: boolean;
  onToggle: () => void;
  onRetry: () => void;
}

const ExecutionLogRow = ({ log, isExpanded, onToggle, onRetry }: ExecutionLogRowProps) => {
  const [webhookHistory, setWebhookHistory] = useState<WebhookHistoryEntry[]>([]);

  useEffect(() => {
    if (!isExpanded || log.actionType !== 'WEBHOOK') return;
    let cancelled = false;
    automationRulesApi.getWebhookHistory(Number(log.id)).then((response) => {
      if (cancelled) return;
      setWebhookHistory((response.data ?? []).map(mapApiWebhookHistoryToUI));
    });
    return () => { cancelled = true; };
  }, [isExpanded, log.actionType, log.id]);

  return (
    <>
      <TRow className="automation-clickable-row" onClick={onToggle}>
        <TCell>{isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</TCell>
        <TCell>{log.leadName}</TCell>
        <TCell>{ACTION_TYPE_META[log.actionType].label}</TCell>
        <TCell><ExecutionStatusBadge status={log.status} /></TCell>
        <TCell>{new Date(log.triggeredAt).toLocaleString()}</TCell>
        <TCell>{log.retryCount}</TCell>
        <TCell onClick={(e) => e.stopPropagation()}>
          {log.status === 'dead' && (
            <button className="automation-icon-btn" title="Retry this action now" onClick={onRetry}>
              <RotateCcw size={16} />
            </button>
          )}
        </TCell>
      </TRow>
      {isExpanded && (
        <TRow className="automation-log-row-expanded">
          <TCell colSpan={7}>
            <div><strong>Result:</strong> {log.resultMessage ?? '-'}</div>
            {log.actionType === 'WEBHOOK' && (
              <div style={{ marginTop: '0.75rem' }}>
                <WebhookHistoryTable attempts={webhookHistory} />
              </div>
            )}
          </TCell>
        </TRow>
      )}
    </>
  );
};

export default memo(ExecutionLogRow);
