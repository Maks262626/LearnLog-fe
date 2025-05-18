import { FinalGrade } from '@/models/FinalGrade';

import { FINAL_GRADE_CONTROLLER, FINAL_GRADE_ROUTES, buildRoute } from '@/utils/apiEndpoints';

import { apiSlice } from './apiSlice';

export const finalGradeApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createFinalGrade: build.mutation<{ data: FinalGrade }, Partial<FinalGrade>>({
      query: (body) => ({
        url: buildRoute(FINAL_GRADE_CONTROLLER, FINAL_GRADE_ROUTES.CREATE),
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'FINAL_GRADES', id: 'LIST' }],
    }),
    updateFinalGrade: build.mutation<{ data: FinalGrade }, { id: string; body: Partial<FinalGrade> }>({
      query: ({ id, body }) => ({
        url: buildRoute(FINAL_GRADE_CONTROLLER, FINAL_GRADE_ROUTES.UPDATE, { id }),
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'FINAL_GRADES', id },
        { type: 'FINAL_GRADES', id: 'LIST' },
      ],
    }),
  }),
});

export const { useUpdateFinalGradeMutation } = finalGradeApiSlice;
