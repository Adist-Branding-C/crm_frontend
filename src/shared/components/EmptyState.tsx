import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const EmptyState = ({ message = 'No data available', icon, action }: EmptyStateProps) => (
  <div className="empty-state">
    <div className="empty-state-icon">
      {icon ?? <Inbox size={48} />}
    </div>
    <p className="empty-state-message">{message}</p>
    {action}
  </div>
);

export default EmptyState;
