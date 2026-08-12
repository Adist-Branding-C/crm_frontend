import { useCallback, useEffect, useState } from 'react';
import { facebookApi } from '../services/facebook.service';
import { facebookLogin } from '../../../shared/utils/facebookSdk';
import { useToast } from '../../../shared/hooks/useToast';
import type { FacebookConnection } from '../types';

export const useFacebookConnections = () => {
  const toast = useToast();
  const [connections, setConnections] = useState<FacebookConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [disconnectingId, setDisconnectingId] = useState<string | null>(null);

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

  const connect = () => {
    facebookLogin();
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

  return { connections, loading, connect, disconnect, disconnectingId, toast, reload: load };
};
