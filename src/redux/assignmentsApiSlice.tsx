import { Assignment } from '@/models/Assignment';

import { ASSIGNMENT_CONTROLLER, ASSIGNMENT_ROUTES, buildRoute } from '@/utils/apiEndpoints';

import { apiSlice } from './apiSlice';

export const assignmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAssignmentsBySubjectId: build.query<{ data: Assignment[] }, string>({
      query: (id) => {
        return {
          url: buildRoute(ASSIGNMENT_CONTROLLER, ASSIGNMENT_ROUTES.FIND_BY_SUBJECT_ID, { id }),
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'ASSIGNMENTS' as const, id })),
              { type: 'ASSIGNMENTS', id: 'LIST' },
            ]
          : [{ type: 'ASSIGNMENTS', id: 'LIST' }],
    }),
    getAssignmentById: build.query<{ data: Assignment }, string>({
      query: (id) => {
        return {
          url: buildRoute(ASSIGNMENT_CONTROLLER, ASSIGNMENT_ROUTES.FIND_ONE, { id }),
          method: 'GET',
        };
      },
      providesTags: (_result, _error, id) => [{ type: 'ASSIGNMENTS', id }],
    }),
    createAssignment: build.mutation<{ data: Assignment }, Partial<Assignment>>({
      query: (body) => ({
        url: buildRoute(ASSIGNMENT_CONTROLLER, ASSIGNMENT_ROUTES.CREATE),
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'ASSIGNMENTS', id: 'LIST' }],
    }),
    updateAssignment: build.mutation<{ data: Assignment }, { id: string; body: Partial<Assignment> }>({
      query: ({ id, body }) => ({
        url: buildRoute(ASSIGNMENT_CONTROLLER, ASSIGNMENT_ROUTES.UPDATE, { id }),
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'ASSIGNMENTS', id },
        { type: 'ASSIGNMENTS', id: 'LIST' },
      ],
    }),
    deleteAssignment: build.mutation<void, string>({
      query: (id) => ({
        url: buildRoute(ASSIGNMENT_CONTROLLER, ASSIGNMENT_ROUTES.REMOVE, { id }),
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'ASSIGNMENTS', id },
        { type: 'ASSIGNMENTS', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetAssignmentsBySubjectIdQuery,
  useCreateAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
  useGetAssignmentByIdQuery,
} = assignmentsApiSlice;
