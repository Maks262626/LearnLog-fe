import { Attendance } from '@/models/Attendance';
import { User } from '@/models/User';
import { routes } from '@/routes';

import { apiSlice } from './apiSlice';

export const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAttendanceBySubjectInstanceId: build.query<{ data: Attendance[] }, string>({
      query: (id) => {
        return {
          url: `${routes.API.ATTENDANCE}/subject-instance/${id}`,
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ id }) => ({ type: 'ATTENDANCE' as const, id })), { type: 'ATTENDANCE', id: 'LIST' }]
          : [{ type: 'ATTENDANCE', id: 'LIST' }],
    }),
    getAttendanceBySubjectId: build.query<{ data: { user: User; attendances: Attendance[] }[] }, string>({
      query: (id) => {
        return {
          url: `${routes.API.ATTENDANCE}/by-subject-id/${id}`,
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ user }) => ({ type: 'ATTENDANCE' as const, id: user.id })),
              { type: 'ATTENDANCE', id: 'LIST' },
            ]
          : [{ type: 'ATTENDANCE', id: 'LIST' }],
    }),
    updateAttendance: build.mutation<{ data: Attendance }, { id: string; body: Partial<Attendance> }>({
      query: ({ id, body }) => ({
        url: `${routes.API.ATTENDANCE}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'ATTENDANCE', id }],
    }),
  }),
});

export const {
  useGetAttendanceBySubjectInstanceIdQuery,
  useUpdateAttendanceMutation,
  useGetAttendanceBySubjectIdQuery,
} = attendanceApiSlice;
