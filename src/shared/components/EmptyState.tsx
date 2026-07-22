import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
  icon?: React.ReactNode;
}

const EmptyState = ({ message = 'No data available', icon }: EmptyStateProps) => (
  <div className="empty-state">
    <div className="empty-state-icon">
      {icon ?? <Inbox size={48} />}
    </div>
    <p className="empty-state-message">{message}</p>
  </div>
);

export default EmptyState;
