export function buildRoute(base: string, path: string, params?: Record<string, string | number>) {
  if (!params) {
    return `/${base}/${path}`;
  }
  const url = Object.entries(params).reduce((acc, [key, value]) => acc.replace(`:${key}`, value.toString()), path);
  return `${base}/${url}`;
}

export const USER_CONTROLLER = 'user';
export const UNIVERSITY_CONTROLLER = 'university';
export const SUBJECT_INSTANCE_CONTROLLER = 'subject-instance';
export const SUBJECT_CONTROLLER = 'subject';
export const STUDENT_SUBMISSION_CONTROLLER = 'student-submission';
export const REPORTS_CONTROLLER = 'reports';
export const GROUP_CONTROLLER = 'group';
export const GRADE_CONTROLLER = 'grade';
export const FINAL_GRADE_CONTROLLER = 'final-grade';
export const FACULTY_CONTROLLER = 'faculty';
export const ATTENDANCE_CONTROLLER = 'attendance';
export const ASSIGNMENT_CONTROLLER = 'assignment';

export const USER_ROUTES = {
  REGISTER: 'register',
  ME: 'me',
  FIND_ALL_USERS: '',
  GET_TEACHERS_BY_FACULTY_ID: 'teachers/:id',
  GET_USERS_IN_MY_GROUP: 'in-my-group',
  GET_USERS_IN_MY_FACULTY: 'in-my-faculty',
  FIND_USER: ':id',
  FIND_USERS_FROM_UNIVERSITY: 'university/:id',
  FIND_USERS_FROM_FACULTY: 'faculty/:id',
  FIND_USERS_FROM_GROUP: 'group/:id',
  UPDATE_USER: ':id',
  SET_USER_ROLE: 'role/:id',
  DELETE_USER: ':id',
} as const;
export const UNIVERSITY_ROUTES = {
  CREATE: '',
  FIND_ALL: '',
  FIND_ONE: ':id',
  UPDATE: ':id',
  DELETE: ':id',
} as const;
export const SUBJECT_INSTANCE_ROUTES = {
  CREATE: '',
  FIND_ALL: '',
  FIND_ONE: ':id',
  TEACHER_SCHEDULE: 'teacher-schedule',
  STUDENT_GROUP: 'in-my-group',
  BY_SUBJECT_ID: 'by-subject-id/:id',
  BY_GROUP_ID: 'by-group-id/:id',
  UPDATE: ':id',
  DELETE: ':id',
} as const;
export const SUBJECT_ROUTES = {
  CREATE: '',
  FIND_ALL: '',
  GET_TEACHER_SUBJECTS: 'teacher-subject',
  GET_MY_COURSES: 'in-my-faculty',
  GET_SUBJECTS_IN_MY_GROUP: 'in-my-group',
  GET_SUBJECTS_BY_GROUP_ID: 'by-group-id/:id',
  FIND_ONE: ':id',
  UPDATE: ':id',
  DELETE: ':id',
} as const;
export const STUDENT_SUBMISSION_ROUTES = {
  CREATE: '',
  FIND_ALL: '',
  FIND_ONE: ':id',
  FIND_BY_SUBJECT_ID: 'by-subject-id/:id',
  UPDATE: ':id',
  DELETE: ':id',
} as const;
export const REPORTS_ROUTES = {
  STUDENT_GRADES: 'student-grades',
  STUDENT_INDIVIDUAL_ATTENDANCES: 'student-individual-attendances',
  STUDENT_INDIVIDUAL_ATTENDANCES_PDF: 'student-individual-attendances/pdf',
  STUDENT_INDIVIDUAL_GRADES_PDF: 'student-individual-grades/pdf',
  STUDENT_GRADES_BY_USER_ID: 'student-grades/:id',
  STUDENT_INDIVIDUAL_ATTENDANCES_BY_USER_ID: 'student-individual-attendances/:id',
  STUDENT_GROUP_ATTENDANCE_SUMMARY: 'student-group-attendance-summary/:id',
  STUDENT_GROUP_GRADE_SUMMARY: 'student-group-grade-summary/:id',
  STUDENT_GROUP_ATTENDANCE_INDIVIDUAL_PDF: 'student-group-attendance-individual/pdf/:id',
  STUDENT_GROUP_ATTENDANCE_SUMMARY_XLSX: 'student-group-attendance-summary/xlsx/:id',
  STUDENT_GROUP_GRADE_SUMMARY_XLSX: 'student-group-grade-summary/xlsx/:id',
} as const;
export const GROUP_ROUTES = {
  CREATE: '',
  FIND_ALL: '',
  FIND_IN_MY_FACULTY: 'get-in-my-faculty',
  FIND_BY_FACULTY_ID: 'get-by-faculty-id/:id',
  FIND_ONE: ':id',
  UPDATE: ':id',
  REMOVE: ':id',
} as const;
export const GRADE_ROUTES = {
  CREATE: '',
  FIND_ALL: '',
  FIND_BY_USER_ASSIGNMENT: 'by-user-assignment-id/:userId/:assignmentId',
  FIND_BY_ASSIGNMENT: 'by-assignment-id/:id',
  FIND_ONE: ':id',
  UPDATE: ':id',
  REMOVE: ':id',
} as const;
export const FINAL_GRADE_ROUTES = {
  CREATE: '',
  FIND_ALL: '',
  FIND_ONE: ':id',
  UPDATE: ':id',
  REMOVE: ':id',
} as const;
export const FACULTY_ROUTES = {
  CREATE: '',
  FIND_ALL: '',
  FIND_FACULTIES_IN_MY_UNI: 'get-faculties-in-my-uni',
  FIND_ONE: ':id',
  FIND_BY_UNI_ID: 'get-by-uni-id/:id',
  UPDATE: ':id',
  REMOVE: ':id',
} as const;
export const ATTENDANCE_ROUTES = {
  CREATE: '',
  FIND_ALL: '',
  GET_BY_SUBJECT_INSTANCE_ID: 'subject-instance/:id',
  FIND_ONE: ':id',
  UPDATE: ':id',
  REMOVE: ':id',
} as const;
export const ASSIGNMENT_ROUTES = {
  CREATE: '',
  FIND_ALL: '',
  FIND_BY_SUBJECT_ID: 'by-subject-id/:id',
  FIND_ONE: ':id',
  UPDATE: ':id',
  REMOVE: ':id',
} as const;
