declare global {
  interface Window {
    FB: FacebookStatic;
    fbAsyncInit: () => void;
  }
}

interface FacebookAuthResponse {
  authResponse: {
    accessToken: string;
    userID: string;
    expiresIn: number;
  } | null;
  status: string;
}

interface FacebookStatic {
  init: (params: { appId: string; xfbml: boolean; version: string }) => void;
  login: (callback: (response: FacebookAuthResponse) => void, options?: { scope: string }) => void;
  logout: (callback: (response: FacebookAuthResponse) => void) => void;
  api: (path: string, params: Record<string, unknown>, callback: (response: unknown) => void) => void;
}

const FB_SDK_URL = 'https://connect.facebook.net/en_US/sdk.js';
const FB_SDK_SCRIPT_ID = 'facebook-jssdk';

let fbSdkPromise: Promise<FacebookStatic> | null = null;

export const loadFacebookSdk = (): Promise<FacebookStatic> => {
  if (window.FB) {
    return Promise.resolve(window.FB);
  }

  if (fbSdkPromise) {
    return fbSdkPromise;
  }

  fbSdkPromise = new Promise((resolve, reject) => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: import.meta.env.VITE_FACEBOOK_APP_ID,
        xfbml: true,
        version: import.meta.env.VITE_FACEBOOK_SDK_VERSION || 'v25.0',
      });
      resolve(window.FB);
    };

    if (document.getElementById(FB_SDK_SCRIPT_ID)) return;

    const script = document.createElement('script');
    script.id = FB_SDK_SCRIPT_ID;
    script.src = FB_SDK_URL;
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.onerror = () => reject(new Error('Failed to load the Facebook SDK'));
    document.body.appendChild(script);
  });

  return fbSdkPromise;
};

export const facebookLogin = (scope = 'public_profile,email'): Promise<FacebookAuthResponse> => {
  if (window.location.protocol !== 'https:') {
    return Promise.reject(
      new Error('Facebook Login requires HTTPS. Serve this app over HTTPS (e.g. via a tunnel like ngrok) to test the connect flow.')
    );
  }

  return loadFacebookSdk().then(
    FB =>
      new Promise((resolve, reject) => {
        FB.login(response => {
          if (response.authResponse) {
            resolve(response);
          } else {
            reject(new Error('Facebook login was cancelled or not fully authorized.'));
          }
        }, { scope });
      })
  );
};

export const fetchFacebookProfile = (): Promise<{ name: string; email?: string }> =>
  loadFacebookSdk().then(
    FB =>
      new Promise(resolve => {
        FB.api('/me', { fields: 'name,email' }, response => {
          resolve(response as { name: string; email?: string });
        });
      })
  );

export {};
