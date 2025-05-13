import { routes } from '@/routes';
import type { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query';
import { FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base query with type annotations
const baseQuery = fetchBaseQuery({
  baseUrl: routes.API.BASE,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// Extend the base query to handle 401 errors
const baseQueryWith401Handling: BaseQueryFn<
  string | FetchArgs, // Request args
  unknown, // Response type
  FetchBaseQueryError // Error type
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    alert('Your session has expired. Please log in again.');

    // localStorage.removeItem(AUTH_TOKEN);
    // api.dispatch({ type: 'auth/logout' });
  }

  return result;
};

// Define the API slice with types
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWith401Handling,
  tagTypes: [
    'UNIVERSITY',
    'FACULTY',
    'USERS',
    'GROUPS',
    'SUBJECTS',
    'SUBJECT_INSTANCE',
    'ATTENDANCE',
    'ASSIGNMENTS',
    'GRADES',
    'FINAL_GRADES',
  ],
  endpoints: () => ({}),
});
