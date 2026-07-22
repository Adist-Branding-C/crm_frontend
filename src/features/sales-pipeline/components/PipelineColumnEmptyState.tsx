import { Inbox } from 'lucide-react';
import type { PipelineColumnEmptyStateProps } from '../types';

const PipelineColumnEmptyState = ({
  message,
}: PipelineColumnEmptyStateProps) => (
  <div className="pipeline-column-empty">
    <Inbox size={32} />
    <p>{message}</p>
  </div>
);

export default PipelineColumnEmptyState;
