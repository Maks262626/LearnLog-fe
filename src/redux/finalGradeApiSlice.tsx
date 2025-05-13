import { FinalGrade } from '@/models/FinalGrade';
import { routes } from '@/routes';

import { apiSlice } from './apiSlice';

export const finalGradeApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createFinalGrade: build.mutation<{ data: FinalGrade }, Partial<FinalGrade>>({
      query: (body) => ({
        url: routes.API.FINAL_GRADE,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'FINAL_GRADES', id: 'LIST' }],
    }),
    updateFinalGrade: build.mutation<{ data: FinalGrade }, { id: string; body: Partial<FinalGrade> }>({
      query: ({ id, body }) => ({
        url: `${routes.API.FINAL_GRADE}/${id}`,
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
