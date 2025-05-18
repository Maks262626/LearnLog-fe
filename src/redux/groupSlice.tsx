import { Group } from '@/models/Group';

import { GROUP_CONTROLLER, GROUP_ROUTES, buildRoute } from '@/utils/apiEndpoints';

import { apiSlice } from './apiSlice';

export const groupApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getGroups: build.query<{ data: Group[] }, void>({
      query: () => {
        return {
          url: buildRoute(GROUP_CONTROLLER, GROUP_ROUTES.FIND_ALL),
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ id }) => ({ type: 'GROUPS' as const, id })), { type: 'GROUPS', id: 'LIST' }]
          : [{ type: 'GROUPS', id: 'LIST' }],
    }),
    getGroupById: build.query<{ data: Group }, string>({
      query: (id) => {
        return {
          url: buildRoute(GROUP_CONTROLLER, GROUP_ROUTES.FIND_ONE, { id }),
          method: 'GET',
        };
      },
      providesTags: (_result, _error, id) => [{ type: 'GROUPS', id }],
    }),
    getGroupsByFacultyId: build.query<{ data: Group[] }, string>({
      query: (id) => {
        return {
          url: buildRoute(GROUP_CONTROLLER, GROUP_ROUTES.FIND_BY_FACULTY_ID, { id }),
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ id }) => ({ type: 'GROUPS' as const, id })), { type: 'GROUPS', id: 'LIST' }]
          : [{ type: 'GROUPS', id: 'LIST' }],
    }),
    getGroupsInMyFaculty: build.query<{ data: Group[] }, void>({
      query: () => {
        return {
          url: buildRoute(GROUP_CONTROLLER, GROUP_ROUTES.FIND_IN_MY_FACULTY),
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ id }) => ({ type: 'GROUPS' as const, id })), { type: 'GROUPS', id: 'LIST' }]
          : [{ type: 'GROUPS', id: 'LIST' }],
    }),
    createGroup: build.mutation<{ data: Group }, Partial<Group>>({
      query: (body) => ({
        url: buildRoute(GROUP_CONTROLLER, GROUP_ROUTES.CREATE),
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'GROUPS', id: 'LIST' }],
    }),
    updateGroup: build.mutation<{ data: Group }, { id: string; body: Partial<Group> }>({
      query: ({ id, body }) => ({
        url: buildRoute(GROUP_CONTROLLER, GROUP_ROUTES.UPDATE, { id }),
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'GROUPS', id },
        { type: 'GROUPS', id: 'LIST' },
      ],
    }),
    deleteGroup: build.mutation<void, string>({
      query: (id) => ({
        url: buildRoute(GROUP_CONTROLLER, GROUP_ROUTES.REMOVE, { id }),
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'GROUPS', id },
        { type: 'GROUPS', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetGroupsByFacultyIdQuery,
  useGetGroupByIdQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useGetGroupsInMyFacultyQuery,
  useDeleteGroupMutation,
} = groupApiSlice;
