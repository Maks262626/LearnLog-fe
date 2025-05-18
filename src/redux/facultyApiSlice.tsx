import { Faculty } from '@/models/Faculty';

import { FACULTY_CONTROLLER, FACULTY_ROUTES, buildRoute } from '@/utils/apiEndpoints';

import { apiSlice } from './apiSlice';

export const facultyApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getFaculties: build.query<{ data: Faculty[] }, void>({
      query: () => {
        return {
          url: buildRoute(FACULTY_CONTROLLER, FACULTY_ROUTES.FIND_ALL),
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ id }) => ({ type: 'FACULTY' as const, id })), { type: 'FACULTY', id: 'LIST' }]
          : [{ type: 'FACULTY', id: 'LIST' }],
    }),
    getFacultiesInMyUniversity: build.query<{ data: Faculty[] }, void>({
      query: () => {
        return {
          url: buildRoute(FACULTY_CONTROLLER, FACULTY_ROUTES.FIND_FACULTIES_IN_MY_UNI),
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ id }) => ({ type: 'FACULTY' as const, id })), { type: 'FACULTY', id: 'LIST' }]
          : [{ type: 'FACULTY', id: 'LIST' }],
    }),
    getFacultyById: build.query<{ data: Faculty }, string>({
      query: (id) => {
        return {
          url: buildRoute(FACULTY_CONTROLLER, FACULTY_ROUTES.FIND_ONE, { id }),
          method: 'GET',
        };
      },
      providesTags: (_result, _error, id) => [{ type: 'FACULTY', id }],
    }),
    getFacultiesByUniversityId: build.query<{ data: Faculty[] }, string>({
      query: (id) => {
        return {
          url: buildRoute(FACULTY_CONTROLLER, FACULTY_ROUTES.FIND_BY_UNI_ID, { id }),
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ id }) => ({ type: 'FACULTY' as const, id })), { type: 'FACULTY', id: 'LIST' }]
          : [{ type: 'FACULTY', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetFacultiesByUniversityIdQuery,
  useGetFacultiesQuery,
  useGetFacultyByIdQuery,
  useGetFacultiesInMyUniversityQuery,
} = facultyApiSlice;
