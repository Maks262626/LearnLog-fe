import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Box, Button, Card, CardContent, Typography } from '@mui/material';

const Profile = () => {
  const { loginWithRedirect, logout, user } = useAuth0();

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={3}>
      {!user ? (
        <Button variant="contained" onClick={() => loginWithRedirect()}>
          Login with Auth0
        </Button>
      ) : (
        <Card sx={{ maxWidth: 400, p: 3, textAlign: 'center' }}>
          <Avatar src={user.picture} alt={user.name} sx={{ width: 80, height: 80, margin: 'auto' }} />
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              <strong>Role:</strong> {user['https://learnlog.com/roles']?.join(', ') || 'No Role'}
            </Typography>
          </CardContent>
          <Button variant="contained" color="secondary" onClick={() => handleLogout()}>
            Logout
          </Button>
        </Card>
      )}
    </Box>
  );
};

export default Profile;
