import { Day, SubjectInstance } from '@/models/SubjectInstance';
import { routes } from '@/routes';

import { apiSlice } from './apiSlice';

export const subjectInstanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSubjectInstanceById: build.query<{ data: SubjectInstance }, string>({
      query: (id) => {
        return {
          url: `${routes.API.SUBJECT_INSTANCE}/${id}`,
          method: 'GET',
        };
      },
      providesTags: (_result, _error, id) => [{ type: 'SUBJECT_INSTANCE', id }],
    }),
    getSubjectInstancesBySubjectId: build.query<{ data: SubjectInstance[] }, string>({
      query: (id) => {
        return {
          url: `${routes.API.SUBJECT_INSTANCE}/by-subject-id/${id}`,
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'SUBJECT_INSTANCE' as const, id })),
              { type: 'SUBJECT_INSTANCE', id: 'LIST' },
            ]
          : [{ type: 'SUBJECT_INSTANCE', id: 'LIST' }],
    }),
    getSubjectInstancesByGroupId: build.query<
      { data: Record<Day, SubjectInstance[]> },
      { id: string; start_date: string; end_date: string }
    >({
      query: ({ id, start_date, end_date }) => ({
        url: `${routes.API.SUBJECT_INSTANCE}/by-group-id/${id}`,
        method: 'GET',
        params: { start_date, end_date },
      }),
      providesTags: (_result, _error, { id }) => [{ type: 'SUBJECT_INSTANCE', id: `BY_SUBJECT_${id}` }],
    }),
    getSubjectInstancesInMyGroup: build.query<
      { data: Record<Day, SubjectInstance[]> },
      { start_date: string; end_date: string }
    >({
      query: ({ start_date, end_date }) => ({
        url: `${routes.API.SUBJECT_INSTANCE}/in-my-group`,
        method: 'GET',
        params: { start_date, end_date },
      }),
      providesTags: (_result, _error) => [{ type: 'SUBJECT_INSTANCE', id: `LIST` }],
    }),
    getTeacherSubjectInstances: build.query<
      { data: Record<Day, SubjectInstance[]> },
      { start_date: string; end_date: string }
    >({
      query: ({ start_date, end_date }) => ({
        url: `${routes.API.SUBJECT_INSTANCE}/teacher-schedule`,
        method: 'GET',
        params: { start_date, end_date },
      }),
      providesTags: (_result, _error) => [{ type: 'SUBJECT_INSTANCE', id: `LIST` }],
    }),
    createSubjectInstance: build.mutation<{ data: SubjectInstance }, Partial<SubjectInstance>>({
      query: (body) => {
        return {
          url: routes.API.SUBJECT_INSTANCE,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'SUBJECT_INSTANCE', id: 'LIST' }],
    }),
    updateSubjectInstance: build.mutation<{ data: SubjectInstance }, { id: string; body: Partial<SubjectInstance> }>({
      query: ({ id, body }) => ({
        url: `${routes.API.SUBJECT_INSTANCE}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'SUBJECT_INSTANCE', id }],
    }),
    deleteSubjectInstance: build.mutation<void, string>({
      query: (id) => ({
        url: `${routes.API.SUBJECT_INSTANCE}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'SUBJECT_INSTANCE', id },
        { type: 'SUBJECT_INSTANCE', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetSubjectInstanceByIdQuery,
  useCreateSubjectInstanceMutation,
  useGetSubjectInstancesByGroupIdQuery,
  useUpdateSubjectInstanceMutation,
  useGetSubjectInstancesInMyGroupQuery,
  useGetTeacherSubjectInstancesQuery,
  useGetSubjectInstancesBySubjectIdQuery,
  useDeleteSubjectInstanceMutation,
} = subjectInstanceApiSlice;
