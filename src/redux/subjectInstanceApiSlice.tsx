import { Day, SubjectInstance } from '@/models/SubjectInstance';

import { SUBJECT_INSTANCE_CONTROLLER, SUBJECT_INSTANCE_ROUTES, buildRoute } from '@/utils/apiEndpoints';

import { apiSlice } from './apiSlice';

export const subjectInstanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSubjectInstanceById: build.query<{ data: SubjectInstance }, string>({
      query: (id) => {
        return {
          url: buildRoute(SUBJECT_INSTANCE_CONTROLLER, SUBJECT_INSTANCE_ROUTES.FIND_ONE, { id }),
          method: 'GET',
        };
      },
      providesTags: (_result, _error, id) => [{ type: 'SUBJECT_INSTANCE', id }],
    }),
    getSubjectInstancesBySubjectId: build.query<{ data: SubjectInstance[] }, string>({
      query: (id) => {
        return {
          url: buildRoute(SUBJECT_INSTANCE_CONTROLLER, SUBJECT_INSTANCE_ROUTES.BY_SUBJECT_ID, { id }),
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
        url: buildRoute(SUBJECT_INSTANCE_CONTROLLER, SUBJECT_INSTANCE_ROUTES.BY_GROUP_ID, { id }),
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
        url: buildRoute(SUBJECT_INSTANCE_CONTROLLER, SUBJECT_INSTANCE_ROUTES.STUDENT_GROUP),
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
        url: buildRoute(SUBJECT_INSTANCE_CONTROLLER, SUBJECT_INSTANCE_ROUTES.TEACHER_SCHEDULE),
        method: 'GET',
        params: { start_date, end_date },
      }),
      providesTags: (_result, _error) => [{ type: 'SUBJECT_INSTANCE', id: `LIST` }],
    }),
    createSubjectInstance: build.mutation<{ data: SubjectInstance }, Partial<SubjectInstance>>({
      query: (body) => {
        return {
          url: buildRoute(SUBJECT_INSTANCE_CONTROLLER, SUBJECT_INSTANCE_ROUTES.CREATE),
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'SUBJECT_INSTANCE', id: 'LIST' }],
    }),
    updateSubjectInstance: build.mutation<{ data: SubjectInstance }, { id: string; body: Partial<SubjectInstance> }>({
      query: ({ id, body }) => ({
        url: buildRoute(SUBJECT_INSTANCE_CONTROLLER, SUBJECT_INSTANCE_ROUTES.UPDATE, { id }),
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'SUBJECT_INSTANCE', id }],
    }),
    deleteSubjectInstance: build.mutation<void, string>({
      query: (id) => ({
        url: buildRoute(SUBJECT_INSTANCE_CONTROLLER, SUBJECT_INSTANCE_ROUTES.DELETE, { id }),
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
