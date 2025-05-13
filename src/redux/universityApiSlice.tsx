import { University } from '@/models/University';
import { routes } from '@/routes';

import { apiSlice } from './apiSlice';

export const universityApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUniversities: build.query<{ data: University[] }, void>({
      query: () => {
        return {
          url: routes.API.UNIVERSITY,
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ id }) => ({ type: 'UNIVERSITY' as const, id })), { type: 'UNIVERSITY', id: 'LIST' }]
          : [{ type: 'UNIVERSITY', id: 'LIST' }],
    }),
    getUniversityById: build.query<{ data: University }, string>({
      query: (id) => {
        return {
          url: `${routes.API.UNIVERSITY}/${id}`,
          method: 'GET',
        };
      },
      providesTags: (_result, _error, id) => [{ type: 'UNIVERSITY', id }],
    }),
  }),
});

export const { useGetUniversitiesQuery, useGetUniversityByIdQuery } = universityApiSlice;
