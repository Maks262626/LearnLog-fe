import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { routes } from '@/routes';
import { useAuth0 } from '@auth0/auth0-react';

import Loader from '@/components/common/Loader';

interface RoleProtectedRouteProps {
  role: string;
  children: ReactNode;
}

const RoleProtectedRoute = ({ role, children }: RoleProtectedRouteProps) => {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <Loader />;
  }

  const userRole: string[] = user?.['https://learnlog.com/roles'] || [];

  return userRole.includes(role) ? children : <Navigate to={routes.PUBLIC.PROFILE} />;
};

export default RoleProtectedRoute;
