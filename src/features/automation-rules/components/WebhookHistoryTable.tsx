import type { WebhookHistoryEntry } from '../types';

const WebhookHistoryTable = ({ attempts }: { attempts: WebhookHistoryEntry[] }) => {
  if (attempts.length === 0) {
    return <p className="automation-empty-hint">No webhook attempts recorded.</p>;
  }

  return (
    <table className="automation-webhook-history-table">
      <thead>
        <tr>
          <th>Status Code</th>
          <th>Response</th>
          <th>Result</th>
          <th>Duration</th>
          <th>Attempted At</th>
        </tr>
      </thead>
      <tbody>
        {attempts.map((attempt) => (
          <tr key={attempt.id}>
            <td>{attempt.statusCode ?? '-'}</td>
            <td>{attempt.responseBody ?? attempt.errorMessage ?? '-'}</td>
            <td>
              <span className={`badge ${attempt.status === 'success' ? 'badge-exec-success' : 'badge-exec-failed'}`}>
                {attempt.status === 'success' ? 'Success' : 'Failed'}
              </span>
            </td>
            <td>{attempt.durationMs ? `${attempt.durationMs} ms` : '-'}</td>
            <td>{new Date(attempt.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WebhookHistoryTable;
