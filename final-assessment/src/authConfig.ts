export const authConfig = {
  authority: 'https://idbi-auth-stage.isupay.in/application/o/merchant-application/',
  client_id: 'f8VJ2UAbdFFEKRW1pkO1rFiA',
  redirect_uri: 'com.isu.merchant.idbi:/callback', // Warning: Using Custom mobile scheme loop
  scope: 'adminName user_name goauthentik.io/api authorities bankCode email profile openid offline_access created privileges',
  // dangerouslyAllowInsecureHttpRequests: false - not used in oidc-client-ts in the same way, but it enforces https by default.
  post_logout_redirect_uri: window.location.origin + '/',
};
