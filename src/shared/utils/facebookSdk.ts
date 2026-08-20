interface FacebookLoginResponse {
  authResponse: { code?: string } | null;
  status: 'connected' | 'not_authorized' | 'unknown';
}

interface FacebookSdk {
  init: (params: { appId: string; cookie?: boolean; xfbml?: boolean; version: string }) => void;
  login: (
    callback: (response: FacebookLoginResponse) => void,
    params: { scope: string; response_type: 'code' },
  ) => void;
}

declare global {
  interface Window {
    FB?: FacebookSdk;
    fbAsyncInit?: () => void;
  }
}

const FACEBOOK_SDK_SRC = 'https://connect.facebook.net/en_US/sdk.js';

const FACEBOOK_LOGIN_SCOPES = 'public_profile,pages_show_list,pages_read_engagement,pages_manage_metadata,leads_retrieval';

let sdkLoadPromise: Promise<void> | null = null;

const loadFacebookSdk = (): Promise<void> => {
  if (window.FB) {
    return Promise.resolve();
  }

  if (sdkLoadPromise) {
    return sdkLoadPromise;
  }

  const appId = import.meta.env.VITE_FACEBOOK_APP_ID;
  const version = import.meta.env.VITE_FACEBOOK_SDK_VERSION;

  if (!appId) {
    throw new Error('VITE_FACEBOOK_APP_ID is not configured.');
  }

  if (!version) {
    throw new Error('VITE_FACEBOOK_SDK_VERSION is not configured.');
  }

  sdkLoadPromise = new Promise((resolve, reject) => {
    window.fbAsyncInit = () => {
      window.FB!.init({ appId, cookie: true, xfbml: false, version });
      resolve();
    };

    const script = document.createElement('script');
    script.src = FACEBOOK_SDK_SRC;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error('Failed to load the Facebook SDK.'));
    document.body.appendChild(script);
  });

  return sdkLoadPromise;
};

export const facebookLogin = async (): Promise<string> => {
  await loadFacebookSdk();

  return new Promise((resolve, reject) => {
    window.FB!.login(
      (response) => {
        if (response.authResponse?.code) {
          resolve(response.authResponse.code);
          return;
        }
        reject(new Error('cancelled'));
      },
      { scope: FACEBOOK_LOGIN_SCOPES, response_type: 'code' },
    );
  });
};
