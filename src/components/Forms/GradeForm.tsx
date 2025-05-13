import { Controller, useForm } from 'react-hook-form';

import { Grade } from '@/models/Grade';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField } from '@mui/material';

import { GradeValidationType, gradeValidation } from '@/utils/zod-validation';

interface IGradeForm {
  onSubmit: (data: GradeValidationType) => void;
  grade: Grade | null;
}

const GradeForm = ({ onSubmit, grade }: IGradeForm) => {
  const defaultValues = {
    user_id: '',
    assignment_id: '',
    grade_value: undefined,
  };

  const formMethods = useForm<GradeValidationType>({
    resolver: zodResolver(gradeValidation),
    mode: 'all',
    defaultValues: grade ? { ...grade, grade_value: grade.grade_value ?? '' } : defaultValues,
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
          name="grade_value"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={'Grade'}
              error={!!errors.grade_value}
              helperText={errors.grade_value?.message}
              variant="outlined"
              fullWidth
              onChange={(e) => field.onChange(+e.target.value)}
            />
          )}
        />

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={!isValid}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default GradeForm;
