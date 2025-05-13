export enum UserRoleName {
  STUDENT = 'student',
  TEACHER = 'teacher',
  MANAGER = 'manager',
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  is_approved: boolean;
  is_registration_completed: boolean;
  role?: UserRoleName;
  university_id?: string;
  faculty_id?: string;
  group_id?: string;
}
