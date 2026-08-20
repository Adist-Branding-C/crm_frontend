import type { OAuthCallbackResult } from '../types';

interface OAuthCallbackStatusProps {
  state: 'connecting' | 'success' | 'cancelled' | 'error';
  errorMessage: string;
  result: OAuthCallbackResult | null;
  onSuccess: () => void;
  onRetry: () => void;
}

// Shared across every page that can receive a Facebook OAuth redirect
// (Create Workflow and Connections both can, since the exact redirect_uri
// Facebook lands on isn't guaranteed to match one specific page).
const OAuthCallbackStatus = ({ state, errorMessage, result, onSuccess, onRetry }: OAuthCallbackStatusProps) => {
  if (state === 'connecting') {
    return (
      <div className="workflow-form-card">
        <p>Connecting your Facebook account…</p>
      </div>
    );
  }

  if (state === 'success') {
    return (
      <div className="workflow-form-card">
        <h3>Facebook account connected</h3>
        <p>{result?.accountName} is now connected.</p>
        <button className="btn btn-primary" onClick={onSuccess}>Continue</button>
      </div>
    );
  }

  return (
    <div className="workflow-form-card">
      <h3>{state === 'cancelled' ? 'You cancelled the connection' : 'Connection failed'}</h3>
      {state === 'error' && <p>{errorMessage}</p>}
      <button className="btn btn-primary" onClick={onRetry}>Back to Facebook Integration</button>
    </div>
  );
};

export default OAuthCallbackStatus;
