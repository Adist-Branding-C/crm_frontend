import PageHeader from '../../../shared/components/layout/PageHeader';
import ToastNotification from '../../../shared/components/ToastNotification';
import { useFacebookConnections } from '../hooks/useFacebookConnections';
import OAuthCallbackStatus from '../components/OAuthCallbackStatus';
import '../../../pages/FacebookWorkflows.css';

const FacebookConnectionsPage = () => {
  const {
    connections,
    loading,
    connect,
    disconnect,
    disconnectingId,
    toast,
    connectState,
    connectError,
    connectResult,
    resetConnectState,
  } = useFacebookConnections();

  return (
    <div className="facebook-workflows-page">
      <PageHeader
        title="Facebook Connections"
        description="Connect your tenant's Facebook Business account"
        breadcrumb={[{ label: 'Facebook Integration', link: '/facebook/workflows' }, { label: 'Connections', link: null }]}
        action={
          <button className="facebook-connect-btn" onClick={connect}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.637H7.9v-3.577h2.3V9.275c0-2.18 1.313-3.396 3.3-3.396.955 0 1.95.16 1.95.16v2.133h-1.097c-1.078 0-1.413.676-1.413 1.37v1.645h2.393l-.383 3.577h-2.01v8.637C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Connect New Account
          </button>
        }
      />

      {connectState !== 'idle' ? (
        <OAuthCallbackStatus
          state={connectState}
          errorMessage={connectError}
          result={connectResult}
          onSuccess={resetConnectState}
          onRetry={resetConnectState}
        />
      ) : loading ? (
        <p>Loading…</p>
      ) : connections.length === 0 ? (
        <div className="empty-state">
          <h3>No Facebook account connected</h3>
          <p>Click "Connect New Account" to link your tenant's Facebook Business account.</p>
        </div>
      ) : (
        <div className="workflows-table-wrapper">
          <table className="workflows-table">
            <thead>
              <tr>
                <th>Facebook Business ID</th>
                <th>Status</th>
                <th>Connected</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {connections.map((connection) => (
                <tr key={connection.id}>
                  <td>{connection.facebookBusinessId}</td>
                  <td>
                    <span className={`status-badge ${connection.status === 'active' ? 'active' : 'inactive'}`}>{connection.status}</span>
                  </td>
                  <td>{new Date(connection.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-outline"
                      disabled={disconnectingId === connection.id}
                      onClick={() => disconnect(connection.id)}
                    >
                      {disconnectingId === connection.id ? 'Disconnecting…' : 'Disconnect'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ToastNotification isVisible={toast.showToast} type={toast.toastType} message={toast.toastMessage} onDismiss={() => toast.setShowToast(false)} />
    </div>
  );
};

export default FacebookConnectionsPage;
