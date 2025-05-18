import { Attendance } from '@/models/Attendance';

import { ATTENDANCE_CONTROLLER, ATTENDANCE_ROUTES, buildRoute } from '@/utils/apiEndpoints';

import { apiSlice } from './apiSlice';

export const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAttendanceBySubjectInstanceId: build.query<{ data: Attendance[] }, string>({
      query: (id) => {
        return {
          url: buildRoute(ATTENDANCE_CONTROLLER, ATTENDANCE_ROUTES.GET_BY_SUBJECT_INSTANCE_ID, { id }),
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ id }) => ({ type: 'ATTENDANCE' as const, id })), { type: 'ATTENDANCE', id: 'LIST' }]
          : [{ type: 'ATTENDANCE', id: 'LIST' }],
    }),
    updateAttendance: build.mutation<{ data: Attendance }, { id: string; body: Partial<Attendance> }>({
      query: ({ id, body }) => ({
        url: buildRoute(ATTENDANCE_CONTROLLER, ATTENDANCE_ROUTES.UPDATE, { id }),
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'ATTENDANCE', id }],
    }),
  }),
});

export const { useGetAttendanceBySubjectInstanceIdQuery, useUpdateAttendanceMutation } = attendanceApiSlice;
