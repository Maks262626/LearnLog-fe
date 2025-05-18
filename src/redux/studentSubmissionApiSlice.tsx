import { StudentSubmission } from '@/models/StudentSubmission';

import { STUDENT_SUBMISSION_CONTROLLER, STUDENT_SUBMISSION_ROUTES, buildRoute } from '@/utils/apiEndpoints';

import { apiSlice } from './apiSlice';

export const studentSubmissionApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createStudentSubmission: build.mutation<{ data: StudentSubmission }, Partial<StudentSubmission>>({
      query: (body) => ({
        url: buildRoute(STUDENT_SUBMISSION_CONTROLLER, STUDENT_SUBMISSION_ROUTES.CREATE),
        method: 'POST',
        body,
      }),
    }),
    getStudentSubmissionBySubjectId: build.query<{ data: StudentSubmission[] }, string>({
      query: (id) => ({
        url: buildRoute(STUDENT_SUBMISSION_CONTROLLER, STUDENT_SUBMISSION_ROUTES.FIND_BY_SUBJECT_ID, { id }),
        method: 'GET',
      }),
    }),
    getStudentSubmissionById: build.query<{ data: StudentSubmission }, string>({
      query: (id) => ({
        url: buildRoute(STUDENT_SUBMISSION_CONTROLLER, STUDENT_SUBMISSION_ROUTES.FIND_ONE, { id }),
        method: 'GET',
      }),
    }),
    updateStudentSubmission: build.mutation<
      { data: StudentSubmission },
      { id: string; body: Partial<StudentSubmission> }
    >({
      query: ({ id, body }) => ({
        url: buildRoute(STUDENT_SUBMISSION_CONTROLLER, STUDENT_SUBMISSION_ROUTES.UPDATE, { id }),
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
