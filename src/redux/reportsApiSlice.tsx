import { routes } from '@/routes';
import {
  StudentAttendancesReport,
  StudentGradesReports,
  StudentGroupAttendanceSummaryReport,
  StudentGroupGradesSummaryReport,
} from '@/types/Reports';

import { apiSlice } from './apiSlice';

export const reportsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getStudentGradesReport: build.query<{ data: StudentGradesReports[] }, void>({
      query: () => {
        return {
          url: `${routes.API.REPORTS}/student-grades`,
          method: 'GET',
        };
      },
    }),
    getStudentGradesReportByUserId: build.query<{ data: StudentGradesReports[] }, string>({
      query: (id) => {
        return {
          url: `${routes.API.REPORTS}/student-grades/${id}`,
          method: 'GET',
        };
      },
    }),
    getStudentAttendancesReport: build.query<{ data: StudentAttendancesReport[] }, void>({
      query: () => {
        return {
          url: `${routes.API.REPORTS}/student-individual-attendances`,
          method: 'GET',
        };
      },
    }),
    getStudentAttendancesReportByUserId: build.query<{ data: StudentAttendancesReport[] }, string>({
      query: (id) => {
        return {
          url: `${routes.API.REPORTS}/student-individual-attendances/${id}`,
          method: 'GET',
        };
      },
    }),
    getStudentGroupGradeSummary: build.query<{ data: StudentGroupGradesSummaryReport[] }, string>({
      query: (id) => {
        return {
          url: `${routes.API.REPORTS}/student-group-grade-summary/${id}`,
          method: 'GET',
        };
      },
    }),
    getStudentGroupAttendanceSummary: build.query<{ data: StudentGroupAttendanceSummaryReport[] }, string>({
      query: (id) => {
        return {
          url: `${routes.API.REPORTS}/student-group-attendance-summary/${id}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useGetStudentGradesReportQuery,
  useGetStudentAttendancesReportQuery,
  useGetStudentGroupGradeSummaryQuery,
  useGetStudentGroupAttendanceSummaryQuery,
  useGetStudentAttendancesReportByUserIdQuery,
  useGetStudentGradesReportByUserIdQuery,
} = reportsApiSlice;
