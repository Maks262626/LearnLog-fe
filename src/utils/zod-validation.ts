import { StudentSubmissionStatus } from '@/models/StudentSubmission';
import { SubjectType } from '@/models/Subject';
import { SubjectInstanceStatus, SubjectInstanceType } from '@/models/SubjectInstance';
import { nativeEnum, z } from 'zod';

export const registerValidation = z.object({
  first_name: z.string().min(2, { message: '2 символа мінімум' }).max(50, { message: '50 символів максимум' }),
  last_name: z.string().min(2, { message: '2 символа мінімум' }).max(50, { message: '50 символів максимум' }),
  university_id: z.string(),
  faculty_id: z.string().optional(),
  group_id: z.string().optional(),
});

export const groupValidation = z.object({
  name: z.string().min(2, { message: '2 символа мінімум' }).max(50, { message: '50 символів максимум' }),
  faculty_id: z.string().min(1),
});

export const subjectValidation = z.object({
  type: nativeEnum(SubjectType),
  name: z.string().min(2, { message: '2 символа мінімум' }).max(50, { message: '50 символів максимум' }),
  description: z.string().min(2, { message: '2 символа мінімум' }).max(150, { message: '150 символів максимум' }),
  group_id: z.string().min(1),
  teacher_id: z.string().min(1),
});

export const subjectInstanceValidation = z.object({
  subject_id: z.string().min(1),
  name: z.string().min(3),
  date: z.date(),
  start_time: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/),
  end_time: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/),
  type: nativeEnum(SubjectInstanceType),
  status: nativeEnum(SubjectInstanceStatus),
  url: z.string().optional(),
  location: z.string().optional(),
});

export const assigmentValidation = z.object({
  subject_id: z.string().min(1),
  name: z.string(),
  description: z.string(),
  due_date: z.date(),
});

export const gradeValidation = z.object({
  user_id: z.string().min(1),
  assignment_id: z.string().min(1),
  grade_value: z.number().positive(),
});

export const finalGradeValidation = z.object({
  subject_id: z.string().min(1),
  user_id: z.string().min(1),
  final_grade: z.number().positive(),
  exam_grade: z.number().positive().nullable().optional(),
});

export const studentSubmissionValidation = z.object({
  assignment_id: z.string().min(1),
  submission_date: z.date(),
  status: nativeEnum(StudentSubmissionStatus),
  file_url: z.string().optional(),
  student_comments: z.string().optional(),
});

export type RegisterValidationType = z.infer<typeof registerValidation>;
export type GroupValidationType = z.infer<typeof groupValidation>;
export type SubjectValidationType = z.infer<typeof subjectValidation>;
export type SubjectInstanceValidationType = z.infer<typeof subjectInstanceValidation>;
export type AssigmentValidationType = z.infer<typeof assigmentValidation>;
export type GradeValidationType = z.infer<typeof gradeValidation>;
export type FinalGradeValidationType = z.infer<typeof finalGradeValidation>;
export type StudentSubmissionValidationType = z.infer<typeof studentSubmissionValidation>;
