import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { facebookApi } from '../services/facebook.service';
import type { OAuthCallbackResult } from '../types';

type CallbackState = 'idle' | 'connecting' | 'success' | 'cancelled' | 'error';

export const useFacebookOAuthCallback = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<CallbackState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [result, setResult] = useState<OAuthCallbackResult | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');

    // No code/error means this page was reached directly, not via a Facebook
    // redirect - nothing to process, stays 'idle' so the caller renders its
    // normal content instead (this hook is embedded in Create Workflow,
    // which is reached both ways).
    if (!code && !error) return;

    // Clear the code/error from the visible address bar immediately so an
    // accidental refresh a few seconds later doesn't try to reuse a spent code.
    window.history.replaceState({}, '', window.location.pathname);

    if (error) {
      setState('cancelled');
      return;
    }

    setState('connecting');
    facebookApi
      .handleOAuthCallback(code as string)
      .then((response) => {
        setResult(response.data ?? null);
        setState('success');
      })
      .catch((err) => {
        const message = err?.response?.data?.message || 'Connection failed, please try again.';
        setErrorMessage(message);
        setState('error');
      });
  }, []);

  const retry = () => navigate('/facebook/connections');
  const reset = () => setState('idle');

  return { state, errorMessage, result, retry, reset };
};
