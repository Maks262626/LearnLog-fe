import { User } from '@/models/User';
import { routes } from '@/routes';

import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<{ data: User[] }, void>({
      query: () => {
        return {
          url: routes.API.USER,
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ id }) => ({ type: 'USERS' as const, id })), { type: 'USERS', id: 'LIST' }]
          : [{ type: 'USERS', id: 'LIST' }],
    }),
    getUsersFromFaculty: build.query<{ data: User[] }, string>({
      query: (id) => {
        return {
          url: `${routes.API.USER}/faculty/${id}`,
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ id }) => ({ type: 'USERS' as const, id })), { type: 'USERS', id: 'LIST' }]
          : [{ type: 'USERS', id: 'LIST' }],
    }),
    getUsersFromGroup: build.query<{ data: User[] }, string>({
      query: (id) => {
        return {
          url: `${routes.API.USER}/group/${id}`,
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ id }) => ({ type: 'USERS' as const, id })), { type: 'USERS', id: 'LIST' }]
          : [{ type: 'USERS', id: 'LIST' }],
    }),
    getUserById: build.query<{ data: User }, string>({
      query: (id) => ({
        url: `${routes.API.USER}/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'USERS', id }],
    }),
    getMe: build.query<{ data: User }, void>({
      query: () => ({
        url: `${routes.API.USER}/me`,
        method: 'GET',
      }),
      providesTags: [{ type: 'USERS', id: 'ME' }],
      keepUnusedDataFor: 0,
    }),
    getTeachersByFacultyId: build.query<{ data: User[] }, string>({
      query: (id) => ({
        url: `${routes.API.USER}/teachers/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'USERS', id }],
    }),
    getUsersInMyGroup: build.query<{ data: User[] }, void>({
      query: () => ({
        url: `${routes.API.USER}/in-my-group`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ id }) => ({ type: 'USERS' as const, id })), { type: 'USERS', id: 'LIST' }]
          : [{ type: 'USERS', id: 'LIST' }],
    }),
    updateUserRole: build.mutation<void, { id: string; role: string }>({
      query: ({ id, role }) => ({
        url: `${routes.API.USER}/role/${id}`,
        method: 'PATCH',
        body: { role },
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'USERS', id }],
    }),
    registerUser: build.mutation<User, Partial<User>>({
      query(body) {
        return {
          url: 'user/register',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: () => ['USERS'],
    }),
    deleteUser: build.mutation<void, string>({
      query: (id) => ({
        url: `${routes.API.USER}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'USERS', id },
        { type: 'USERS', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useRegisterUserMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useGetMeQuery,
  useGetUsersFromFacultyQuery,
  useGetUsersFromGroupQuery,
  useGetUsersInMyGroupQuery,
  useGetTeachersByFacultyIdQuery,
} = usersApiSlice;
