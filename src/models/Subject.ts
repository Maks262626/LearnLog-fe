import { FinalGrade } from './FinalGrade';
import { Group } from './Group';
import { User } from './User';

export enum SubjectType {
  EXAM = 'exam',
  CREDIT = 'credit',
}

export interface Subject {
  id: string;
  group: Pick<Group, 'id' | 'name' | 'faculty_id'>;
  teacher: Pick<User, 'id' | 'first_name' | 'last_name'>;
  name: string;
  description: string;
  type: SubjectType;
  finalGrades: FinalGrade[];
}
