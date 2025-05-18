import {
  StudentAttendancesReport,
  StudentGradesReports,
  StudentGroupAttendanceSummaryReport,
  StudentGroupGradesSummaryReport,
} from '@/types/Reports';

import { REPORTS_CONTROLLER, REPORTS_ROUTES, buildRoute } from '@/utils/apiEndpoints';

import { apiSlice } from './apiSlice';

export const reportsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getStudentGradesReport: build.query<{ data: StudentGradesReports[] }, void>({
      query: () => {
        return {
          url: buildRoute(REPORTS_CONTROLLER, REPORTS_ROUTES.STUDENT_GRADES),
          method: 'GET',
        };
      },
    }),
    getStudentGradesReportByUserId: build.query<{ data: StudentGradesReports[] }, string>({
      query: (id) => {
        return {
          url: buildRoute(REPORTS_CONTROLLER, REPORTS_ROUTES.STUDENT_GRADES_BY_USER_ID, { id }),
          method: 'GET',
        };
      },
    }),
    getStudentAttendancesReport: build.query<{ data: StudentAttendancesReport[] }, void>({
      query: () => {
        return {
          url: buildRoute(REPORTS_CONTROLLER, REPORTS_ROUTES.STUDENT_INDIVIDUAL_ATTENDANCES),
          method: 'GET',
        };
      },
    }),
    getStudentAttendancesReportByUserId: build.query<{ data: StudentAttendancesReport[] }, string>({
      query: (id) => {
        return {
          url: buildRoute(REPORTS_CONTROLLER, REPORTS_ROUTES.STUDENT_INDIVIDUAL_ATTENDANCES_BY_USER_ID, { id }),
          method: 'GET',
        };
      },
    }),
    getStudentGroupGradeSummary: build.query<{ data: StudentGroupGradesSummaryReport[] }, string>({
      query: (id) => {
        return {
          url: buildRoute(REPORTS_CONTROLLER, REPORTS_ROUTES.STUDENT_GROUP_GRADE_SUMMARY, { id }),
          method: 'GET',
        };
      },
    }),
    getStudentGroupAttendanceSummary: build.query<{ data: StudentGroupAttendanceSummaryReport[] }, string>({
      query: (id) => {
        return {
          url: buildRoute(REPORTS_CONTROLLER, REPORTS_ROUTES.STUDENT_GROUP_ATTENDANCE_SUMMARY, { id }),
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
