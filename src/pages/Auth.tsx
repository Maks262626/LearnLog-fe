import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

import Loader from '@/components/common/Loader';

const Auth = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } = useAuth0();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  if (isLoading || !isAuthenticated) {
    return <Loader />;
  }

  return (
    <>
      <h2>
        {t('general.welcome')}, {user?.name}!
      </h2>
      <Button variant="contained" onClick={() => handleLogout()}>
        {t('auth.logout')}
      </Button>
    </>
  );
};

export default Auth;
