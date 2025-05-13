import { Faculty } from '@/models/Faculty';
import { routes } from '@/routes';

import { apiSlice } from './apiSlice';

export const facultyApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getFaculties: build.query<{ data: Faculty[] }, void>({
      query: () => {
        return {
          url: routes.API.FACULTY,
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
          url: `${routes.API.FACULTY}/get-faculties-in-my-uni`,
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
          url: `${routes.API.FACULTY}/${id}`,
          method: 'GET',
        };
      },
      providesTags: (_result, _error, id) => [{ type: 'FACULTY', id }],
    }),
    getFacultiesByUniversityId: build.query<{ data: Faculty[] }, string>({
      query: (id) => {
        return {
          url: `${routes.API.FACULTY}/get-by-uni-id/${id}`,
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
