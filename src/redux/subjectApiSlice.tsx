import { Subject } from '@/models/Subject';

import { SUBJECT_CONTROLLER, SUBJECT_ROUTES, buildRoute } from '@/utils/apiEndpoints';

import { apiSlice } from './apiSlice';

export const subjectApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSubjectById: build.query<{ data: Subject }, string>({
      query: (id) => {
        return {
          url: buildRoute(SUBJECT_CONTROLLER, SUBJECT_ROUTES.FIND_ONE, { id }),
          method: 'GET',
        };
      },
      providesTags: (_result, _error, id) => [{ type: 'SUBJECTS', id }],
    }),
    createSubject: build.mutation<{ data: Subject }, Partial<Subject>>({
      query: (body) => ({
        url: buildRoute(SUBJECT_CONTROLLER, SUBJECT_ROUTES.CREATE),
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'SUBJECTS', id: 'LIST' }],
    }),
    updateSubject: build.mutation<{ data: Subject }, { id: string; body: Partial<Subject> }>({
      query: ({ id, body }) => ({
        url: buildRoute(SUBJECT_CONTROLLER, SUBJECT_ROUTES.UPDATE, { id }),
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'SUBJECTS', id },
        { type: 'SUBJECTS', id: 'LIST' },
      ],
    }),
    getSubjectsInMyFaculty: build.query<{ data: Subject[] }, void>({
      query: () => {
        return {
          url: buildRoute(SUBJECT_CONTROLLER, SUBJECT_ROUTES.GET_MY_COURSES),
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ id }) => ({ type: 'SUBJECTS' as const, id })), { type: 'SUBJECTS', id: 'LIST' }]
          : [{ type: 'SUBJECTS', id: 'LIST' }],
    }),
    getSubjectsInMyGroup: build.query<{ data: Subject[] }, void>({
      query: () => {
        return {
          url: buildRoute(SUBJECT_CONTROLLER, SUBJECT_ROUTES.GET_SUBJECTS_IN_MY_GROUP),
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ id }) => ({ type: 'SUBJECTS' as const, id })), { type: 'SUBJECTS', id: 'LIST' }]
          : [{ type: 'SUBJECTS', id: 'LIST' }],
    }),
    getTeacherSubjects: build.query<{ data: Subject[] }, void>({
      query: () => {
        return {
          url: buildRoute(SUBJECT_CONTROLLER, SUBJECT_ROUTES.GET_TEACHER_SUBJECTS),
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ id }) => ({ type: 'SUBJECTS' as const, id })), { type: 'SUBJECTS', id: 'LIST' }]
          : [{ type: 'SUBJECTS', id: 'LIST' }],
    }),
    getSubjectsByGroupId: build.query<{ data: Subject[] }, string>({
      query: (id) => {
        return {
          url: buildRoute(SUBJECT_CONTROLLER, SUBJECT_ROUTES.GET_SUBJECTS_BY_GROUP_ID, { id }),
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ id }) => ({ type: 'SUBJECTS' as const, id })), { type: 'SUBJECTS', id: 'LIST' }]
          : [{ type: 'SUBJECTS', id: 'LIST' }],
    }),
    deleteSubject: build.mutation<void, string>({
      query: (id) => ({
        url: buildRoute(SUBJECT_CONTROLLER, SUBJECT_ROUTES.DELETE, { id }),
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'SUBJECTS', id },
        { type: 'SUBJECTS', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetSubjectByIdQuery,
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
  useGetSubjectsInMyFacultyQuery,
  useGetSubjectsByGroupIdQuery,
  useGetSubjectsInMyGroupQuery,
  useGetTeacherSubjectsQuery,
  useDeleteSubjectMutation,
} = subjectApiSlice;
