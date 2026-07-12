import { Component, type ReactNode, type ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 24px',
          textAlign: 'center',
        }}>
          <h2 style={{ margin: '0 0 8px', fontSize: '20px', color: '#dc2626' }}>
            Something went wrong
          </h2>
          <p style={{ margin: '0 0 8px', color: '#6b7280', fontSize: '14px' }}>
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            style={{
              padding: '8px 20px',
              fontSize: '14px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              background: '#fff',
              color: '#374151',
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
