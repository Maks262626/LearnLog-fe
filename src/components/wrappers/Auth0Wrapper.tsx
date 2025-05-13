import React from 'react';

import { Auth0Provider } from '@auth0/auth0-react';

const Auth0Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN || ''}
      clientId={import.meta.env.VITE_AUTH0_CLIENTID || ''}
      authorizationParams={{
        redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      }}
      useRefreshTokens={true}
      useRefreshTokensFallback={true}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0Wrapper;
