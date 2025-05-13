import { Group } from '@/models/Group';
import { routes } from '@/routes';

import { apiSlice } from './apiSlice';

export const groupApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getGroups: build.query<{ data: Group[] }, void>({
      query: () => {
        return {
          url: routes.API.GROUP,
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
          url: `${routes.API.GROUP}/${id}`,
          method: 'GET',
        };
      },
      providesTags: (_result, _error, id) => [{ type: 'GROUPS', id }],
    }),
    getGroupsByFacultyId: build.query<{ data: Group[] }, string>({
      query: (id) => {
        return {
          url: `${routes.API.GROUP}/get-by-faculty-id/${id}`,
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
          url: `${routes.API.GROUP}/get-in-my-faculty`,
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
        url: routes.API.GROUP,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'GROUPS', id: 'LIST' }],
    }),
    updateGroup: build.mutation<{ data: Group }, { id: string; body: Partial<Group> }>({
      query: ({ id, body }) => ({
        url: `${routes.API.GROUP}/${id}`,
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
        url: `${routes.API.GROUP}/${id}`,
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
