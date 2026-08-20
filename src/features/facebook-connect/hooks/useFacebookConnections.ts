import { useCallback, useEffect, useState } from 'react';
import { facebookApi } from '../services/facebook.service';
import { facebookLogin } from '../../../shared/utils/facebookSdk';
import { useToast } from '../../../shared/hooks/useToast';
import type { FacebookConnection, OAuthCallbackResult } from '../types';

type ConnectState = 'idle' | 'connecting' | 'success' | 'cancelled' | 'error';

export const useFacebookConnections = () => {
  const toast = useToast();
  const [connections, setConnections] = useState<FacebookConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [disconnectingId, setDisconnectingId] = useState<string | null>(null);
  const [connectState, setConnectState] = useState<ConnectState>('idle');
  const [connectError, setConnectError] = useState('');
  const [connectResult, setConnectResult] = useState<OAuthCallbackResult | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await facebookApi.listConnections();
      setConnections(response.data ?? []);
    } catch {
      toast.showToastMessage('Failed to load Facebook connections', 'error');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const connect = async () => {
    let code: string;
    try {
      code = await facebookLogin();
    } catch {
      setConnectState('cancelled');
      return;
    }

    setConnectState('connecting');
    try {
      const response = await facebookApi.handleOAuthCallback(code);
      setConnectResult(response.data ?? null);
      setConnectState('success');
    } catch (err) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Connection failed, please try again.';
      setConnectError(message);
      setConnectState('error');
    }
  };

  const resetConnectState = () => {
    setConnectState('idle');
    load();
  };

  const disconnect = async (connectionId: string) => {
    setDisconnectingId(connectionId);
    try {
      await facebookApi.disconnect(connectionId);
      toast.showToastMessage('Facebook account disconnected', 'success');
      await load();
    } catch {
      toast.showToastMessage('Failed to disconnect this Facebook account', 'error');
    } finally {
      setDisconnectingId(null);
    }
  };

  return {
    connections,
    loading,
    connect,
    disconnect,
    disconnectingId,
    toast,
    reload: load,
    connectState,
    connectError,
    connectResult,
    resetConnectState,
  };
};
