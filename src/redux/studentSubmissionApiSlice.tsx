import { StudentSubmission } from '@/models/StudentSubmission';
import { routes } from '@/routes';

import { apiSlice } from './apiSlice';

export const studentSubmissionApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createStudentSubmission: build.mutation<{ data: StudentSubmission }, Partial<StudentSubmission>>({
      query: (body) => ({
        url: routes.API.STUDENT_SUBMISSION,
        method: 'POST',
        body,
      }),
    }),
    getStudentSubmissionBySubjectId: build.query<{ data: StudentSubmission[] }, string>({
      query: (id) => ({
        url: `${routes.API.STUDENT_SUBMISSION}/by-subject-id/${id}`,
        method: 'GET',
      }),
    }),
    getStudentSubmissionById: build.query<{ data: StudentSubmission }, string>({
      query: (id) => ({
        url: `${routes.API.STUDENT_SUBMISSION}/${id}`,
        method: 'GET',
      }),
    }),
    updateStudentSubmission: build.mutation<
      { data: StudentSubmission },
      { id: string; body: Partial<StudentSubmission> }
    >({
      query: ({ id, body }) => ({
        url: `${routes.API.STUDENT_SUBMISSION}/${id}`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const {
  useCreateStudentSubmissionMutation,
  useGetStudentSubmissionBySubjectIdQuery,
  useGetStudentSubmissionByIdQuery,
  useUpdateStudentSubmissionMutation,
} = studentSubmissionApiSlice;
