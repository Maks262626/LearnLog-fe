import { Grade } from './Grade';

export interface Assignment {
  id: string;
  subject_id: string;
  name: string;
  description: string;
  due_date: Date;
  grades: Grade[];
}
