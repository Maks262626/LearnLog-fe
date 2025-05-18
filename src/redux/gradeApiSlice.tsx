import { Grade } from '@/models/Grade';

import { GRADE_CONTROLLER, GRADE_ROUTES, buildRoute } from '@/utils/apiEndpoints';

import { apiSlice } from './apiSlice';

export const gradeApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getGradesByAssignmentId: build.query<{ data: Grade[] }, string>({
      query: (id) => ({
        url: buildRoute(GRADE_CONTROLLER, GRADE_ROUTES.FIND_BY_ASSIGNMENT, { id }),
        method: 'GET',
      }),
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ id }) => ({ type: 'GRADES' as const, id })), { type: 'GRADES', id: 'LIST' }]
          : [{ type: 'GRADES', id: 'LIST' }],
    }),
    getGradeByUserIdAndAssignmentId: build.query<{ data: Grade }, { userId: string; assignmentId: string }>({
      query: ({ userId, assignmentId }) => ({
        url: buildRoute(GRADE_CONTROLLER, GRADE_ROUTES.FIND_BY_USER_ASSIGNMENT, { userId, assignmentId }),
        method: 'GET',
      }),
    }),
    createGrade: build.mutation<{ data: Grade }, Partial<Grade>>({
      query: (body) => ({
        url: buildRoute(GRADE_CONTROLLER, GRADE_ROUTES.CREATE),
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'GRADES', id: 'LIST' }],
    }),
    updateGrade: build.mutation<{ data: Grade }, { id: string; body: Partial<Grade> }>({
      query: ({ id, body }) => ({
        url: buildRoute(GRADE_CONTROLLER, GRADE_ROUTES.UPDATE, { id }),
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'GRADES', id },
        { type: 'GRADES', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useCreateGradeMutation,
  useUpdateGradeMutation,
  useGetGradesByAssignmentIdQuery,
  useGetGradeByUserIdAndAssignmentIdQuery,
} = gradeApiSlice;
