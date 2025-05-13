import { useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';

export const useUserRole = () => {
  const { user, isLoading: authLoading } = useAuth0();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;

    if (user) {
      const userRoles: string[] = user?.['https://learnlog.com/roles'] || [];
      setRole(userRoles[0] || null);
    } else {
      setRole(null);
    }
  }, [user, authLoading]);

  return { role };
};
