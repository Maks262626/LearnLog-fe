import { User } from './User';

export interface Grade {
  id: string;
  user_id: string;
  assignment_id: string;
  grade_value: number;
  user: Pick<User, 'id' | 'first_name' | 'last_name'>;
}
