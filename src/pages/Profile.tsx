import { useTranslation } from 'react-i18next';

import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';

const Profile = () => {
  const { loginWithRedirect, logout, user } = useAuth0();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const changeLanguage = (lng: 'en' | 'ua') => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={3}>
      {!user ? (
        <Button variant="contained" onClick={() => loginWithRedirect()}>
          {t('auth.login')}
        </Button>
      ) : (
        <Card sx={{ maxWidth: 400, p: 3, textAlign: 'center' }}>
          <Avatar src={user.picture} alt={user.name} sx={{ width: 80, height: 80, margin: 'auto' }} />
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              <strong>{t('profile.email')}:</strong> {user.email}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              <strong>{t('profile.role')}:</strong>{' '}
              {user['https://learnlog.com/roles']?.join(', ') || t('profile.noRole')}
            </Typography>
          </CardContent>
          <Button variant="contained" color="secondary" onClick={() => handleLogout()}>
            {t('auth.logout')}
          </Button>
        </Card>
      )}
      <Stack direction="row" spacing={1}>
        <Button variant={currentLang === 'en' ? 'contained' : 'outlined'} onClick={() => changeLanguage('en')}>
          EN
        </Button>
        <Button variant={currentLang === 'ua' ? 'contained' : 'outlined'} onClick={() => changeLanguage('ua')}>
          UA
        </Button>
      </Stack>
    </Box>
  );
};

export default Profile;
