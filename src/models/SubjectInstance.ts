import { Attendance } from './Attendance';
import { Group } from './Group';
import { Subject } from './Subject';

export enum SubjectInstanceType {
  LECTURE = 'lecture',
  PRACTICE = 'practice',
}

export enum SubjectInstanceStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
export type Day = (typeof daysOfWeek)[number];

export interface SubjectInstance {
  id: string;
  schedule_id: string;
  name: string;
  subject: Pick<Subject, 'id' | 'name'> & { group: Group };
  attendances: Attendance[];
  start_time: string;
  end_time: string;
  date: Date;
  type: SubjectInstanceType;
  status: SubjectInstanceStatus;
  location?: string;
  url?: string;
}
