import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import '../../dashboard/components/widgets/WidgetStyles.css';
import './ReportStateWrapper.css';

interface ReportStateWrapperProps {
  isLoading: boolean;
  isError: boolean;
  isEmpty?: boolean;
  emptyMessage?: string;
  error?: string | null;
  errorMessage?: string;
  onRetry?: () => void;
  children: React.ReactNode;
}


const ReportStateWrapper = ({
  isLoading,
  isError,
  isEmpty,
  emptyMessage = 'No data for the selected filters',
  error,
  errorMessage = 'Failed to load this report',
  onRetry,
  children,
}: ReportStateWrapperProps) => {
  if (isLoading) {
    return <div className="widget-status-text" style={{ padding: '2rem 0' }}>Loading…</div>;
  }
  if (isError) {
    return (
      <div className="report-error-state" role="alert">
        <AlertTriangle size={22} className="report-error-icon" />
        <div className="report-error-text">
          <div className="report-error-title">Something went wrong</div>
          <div className="report-error-detail">{error?.trim() || errorMessage}</div>
        </div>
        {onRetry && (
          <button type="button" className="btn btn-secondary report-error-retry" onClick={onRetry}>
            <RefreshCw size={14} /> Try Again
          </button>
        )}
      </div>
    );
  }
  if (isEmpty) {
    return <div className="widget-status-text" style={{ padding: '2rem 0' }}>{emptyMessage}</div>;
  }
  return <>{children}</>;
};

export default ReportStateWrapper;
