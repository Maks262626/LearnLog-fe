import { Subject } from '@/models/Subject';
import { routes } from '@/routes';

import { apiSlice } from './apiSlice';

export const subjectApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSubjectById: build.query<{ data: Subject }, string>({
      query: (id) => {
        return {
          url: `${routes.API.SUBJECT}/${id}`,
          method: 'GET',
        };
      },
      providesTags: (_result, _error, id) => [{ type: 'SUBJECTS', id }],
    }),
    createSubject: build.mutation<{ data: Subject }, Partial<Subject>>({
      query: (body) => ({
        url: routes.API.SUBJECT,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'SUBJECTS', id: 'LIST' }],
    }),
    updateSubject: build.mutation<{ data: Subject }, { id: string; body: Partial<Subject> }>({
      query: ({ id, body }) => ({
        url: `${routes.API.SUBJECT}/${id}`,
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
          url: `${routes.API.SUBJECT}/in-my-faculty`,
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
          url: `${routes.API.SUBJECT}/in-my-group`,
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
          url: `${routes.API.SUBJECT}/teacher-subject`,
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
          url: `${routes.API.SUBJECT}/by-group-id/${id}`,
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
        url: `${routes.API.SUBJECT}/${id}`,
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
