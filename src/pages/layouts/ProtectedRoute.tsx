import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { routes } from '@/routes';
import { useAuth0 } from '@auth0/auth0-react';

import Loader from '@/components/common/Loader';

import { useGetMeQuery } from '@/redux/usersApiSlice';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading: authLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const { data, isLoading: isMe } = useGetMeQuery(undefined, { skip: !token });

  useEffect(() => {
    const fetchToken = async () => {
      if (!token && isAuthenticated) {
        const authToken = await getAccessTokenSilently();
        localStorage.setItem('token', authToken);
        setToken(authToken);
      }
    };
    fetchToken();
  }, [isAuthenticated, token]);

  const isLoading = authLoading || isMe || (isAuthenticated && !token);

  if (isLoading) {
    return <Loader />;
  }

  if (data && !data.data.is_registration_completed) {
    return <Navigate to={routes.PUBLIC.REGISTER} />;
  }

  if (data && data.data.is_registration_completed && !data.data.is_approved) {
    return <Navigate to={routes.PUBLIC.PROFILE} />;
  }

  return user ? children : <Navigate to={routes.PUBLIC.AUTH} />;
};

export default ProtectedRoute;
