import { User } from './User';

export interface FinalGrade {
  id: string;
  subject_id: string;
  user_id: string;
  user: Pick<User, 'id' | 'first_name' | 'last_name'>;
  final_grade: number;
  exam_grade?: number | null;
}
