import { Assignment } from './Assignment';
import { User } from './User';

export enum StudentSubmissionStatus {
  PENDING = 'pending',
  REVIEWED = 'reviewed',
  GRADED = 'graded',
  RESUBMISSION_REQUESTED = 'resubmission_requested',
  LATE_SUBMISSION = 'late_submission',
}

export interface StudentSubmission {
  id: string;
  file_url: string;
  student_comments: string;
  submission_date: Date;
  status: StudentSubmissionStatus;
  assignment: Assignment;
  user: Pick<User, 'id' | 'first_name' | 'last_name'>;
}
