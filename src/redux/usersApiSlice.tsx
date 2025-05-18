import { User } from '@/models/User';

import { USER_CONTROLLER, USER_ROUTES, buildRoute } from '@/utils/apiEndpoints';

import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<{ data: User[] }, void>({
      query: () => {
        return {
          url: buildRoute(USER_CONTROLLER, USER_ROUTES.FIND_ALL_USERS),
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
          url: buildRoute(USER_CONTROLLER, USER_ROUTES.FIND_USERS_FROM_FACULTY, { id }),
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
          url: buildRoute(USER_CONTROLLER, USER_ROUTES.FIND_USERS_FROM_GROUP, { id }),
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
        url: buildRoute(USER_CONTROLLER, USER_ROUTES.FIND_USER, { id }),
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'USERS', id }],
    }),
    getMe: build.query<{ data: User }, void>({
      query: () => ({
        url: buildRoute(USER_CONTROLLER, USER_ROUTES.ME),
        method: 'GET',
      }),
      providesTags: [{ type: 'USERS', id: 'ME' }],
      keepUnusedDataFor: 0,
    }),
    getTeachersByFacultyId: build.query<{ data: User[] }, string>({
      query: (id) => ({
        url: buildRoute(USER_CONTROLLER, USER_ROUTES.GET_TEACHERS_BY_FACULTY_ID, { id }),
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'USERS', id }],
    }),
    getUsersInMyGroup: build.query<{ data: User[] }, void>({
      query: () => ({
        url: buildRoute(USER_CONTROLLER, USER_ROUTES.GET_USERS_IN_MY_GROUP),
        method: 'GET',
      }),
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ id }) => ({ type: 'USERS' as const, id })), { type: 'USERS', id: 'LIST' }]
          : [{ type: 'USERS', id: 'LIST' }],
    }),
    updateUserRole: build.mutation<void, { id: string; role: string }>({
      query: ({ id, role }) => ({
        url: buildRoute(USER_CONTROLLER, USER_ROUTES.SET_USER_ROLE, { id }),
        method: 'PATCH',
        body: { role },
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'USERS', id }],
    }),
    registerUser: build.mutation<User, Partial<User>>({
      query(body) {
        return {
          url: buildRoute(USER_CONTROLLER, USER_ROUTES.REGISTER),
          method: 'POST',
          body,
        };
      },
      invalidatesTags: () => ['USERS'],
    }),
    deleteUser: build.mutation<void, string>({
      query: (id) => ({
        url: buildRoute(USER_CONTROLLER, USER_ROUTES.DELETE_USER, { id }),
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
