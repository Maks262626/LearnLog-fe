import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { StudentSubmissionStatus } from '@/models/StudentSubmission';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField } from '@mui/material';

import { StudentSubmissionValidationType, studentSubmissionValidation } from '@/utils/zod-validation';

interface IStudentSubmissionForm {
  onSubmit: (data: StudentSubmissionValidationType) => void;
  assignmentId: string | null;
}

const StudentSubmissionForm = ({ onSubmit, assignmentId }: IStudentSubmissionForm) => {
  const { t } = useTranslation();

  const defaultValues = {
    assignment_id: assignmentId ?? '',
    submission_date: new Date(),
    status: StudentSubmissionStatus.PENDING,
    file_url: '',
    student_comments: '',
  };

  const formMethods = useForm<StudentSubmissionValidationType>({
    resolver: zodResolver(studentSubmissionValidation),
    mode: 'all',
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = formMethods;

  return (
    <Box sx={{ display: 'grid', placeItems: 'center' }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Controller
          name="file_url"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('submission.fileURL')}
              error={!!errors.file_url}
              helperText={errors.file_url?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Controller
          name="student_comments"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('submission.comments')}
              error={!!errors.student_comments}
              helperText={errors.student_comments?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={!isValid}>
          {t('buttons.save')}
        </Button>
      </Box>
    </Box>
  );
};

export default StudentSubmissionForm;
