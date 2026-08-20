export const facebookLogin = () => {
  const appId = import.meta.env.VITE_FACEBOOK_APP_ID;
  const configId = import.meta.env.VITE_FACEBOOK_CONFIG_ID;
  const redirectUri = import.meta.env.VITE_FACEBOOK_REDIRECT_URI;

  if (!appId) {
    throw new Error("VITE_FACEBOOK_APP_ID is not configured.");
  }

  if (!configId) {
    throw new Error("VITE_FACEBOOK_CONFIG_ID is not configured.");
  }

  if (!redirectUri) {
    throw new Error("VITE_FACEBOOK_REDIRECT_URI is not configured.");
  }

  const url =
  `https://www.facebook.com/v25.0/dialog/oauth` +
  `?client_id=${encodeURIComponent(appId)}` +
  `&redirect_uri=${encodeURIComponent(redirectUri)}` +
  `&config_id=${encodeURIComponent(configId)}` +
  `&response_type=code` +
  `&override_default_response_type=true`;

  window.location.assign(url);
};