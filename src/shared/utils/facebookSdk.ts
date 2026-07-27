
 


export const facebookLogin = () => {
  const appId = import.meta.env.VITE_FACEBOOK_APP_ID;
  const redirectUri = encodeURIComponent(
    import.meta.env.VITE_FACEBOOK_REDIRECT_URI
  );

  const scopes = [
    "business_management",
    "pages_show_list",
    "leads_retrieval",
    "pages_manage_metadata",
    "pages_read_engagement"
  ].join(",");

  const url =
    `https://www.facebook.com/v25.0/dialog/oauth` +
    `?client_id=${appId}` +
    `&redirect_uri=${redirectUri}` +
    `&scope=${encodeURIComponent(scopes)}` +
    `&response_type=code`;

  window.location.href = url;
};