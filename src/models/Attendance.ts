import { SubjectInstance } from './SubjectInstance';
import { User } from './User';

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
}

export interface Attendance {
  id: string;
  subject_instance_id: string;
  subjectInstance: SubjectInstance;
  status: AttendanceStatus;
  user: Pick<User, 'id' | 'first_name' | 'last_name'>;
}
