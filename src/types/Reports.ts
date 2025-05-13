import { Assignment } from '@/models/Assignment';
import { Attendance } from '@/models/Attendance';
import { FinalGrade } from '@/models/FinalGrade';
import { Grade } from '@/models/Grade';
import { Subject } from '@/models/Subject';
import { SubjectInstance } from '@/models/SubjectInstance';
import { User } from '@/models/User';

export interface StudentGradesReports {
  subject: Subject;
  finalGrade: FinalGrade;
  grades: {
    assignment: Assignment;
    grade: Grade;
  }[];
}

export interface StudentAttendancesReport {
  subject: Subject;
  attendances: {
    subjectInstance: SubjectInstance;
    attendance: Attendance;
  }[];
}

export interface StudentGroupAttendanceSummaryReport {
  subject: Subject;
  studentAttendances: {
    user: Pick<User, 'id' | 'first_name' | 'last_name'>;
    attendances: {
      subjectInstance: SubjectInstance;
      attendance: Attendance;
    }[];
  }[];
}

export interface StudentGroupGradesSummaryReport {
  subject: Subject;
  studentGrades: {
    user: Pick<User, 'id' | 'first_name' | 'last_name'>;
    finalGrade: FinalGrade;
    grades: {
      assignment: Assignment;
      grade: Grade;
    }[];
  }[];
}
