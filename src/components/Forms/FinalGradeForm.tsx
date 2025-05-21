import { Controller, useForm } from 'react-hook-form';

import { FinalGrade } from '@/models/FinalGrade';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField } from '@mui/material';

import { FinalGradeValidationType, finalGradeValidation } from '@/utils/zod-validation';
import { useTranslation } from 'react-i18next';

interface IFinalGradeForm {
  onSubmit: (data: FinalGradeValidationType) => void;
  finalGrade: FinalGrade | null;
}

const FinalGradeForm = ({ onSubmit, finalGrade }: IFinalGradeForm) => {
  const {t} = useTranslation();
  const defaultValues = {
    subject_id: '',
    user_id: '',
    final_grade: 0,
  };

  const formMethods = useForm<FinalGradeValidationType>({
    resolver: zodResolver(finalGradeValidation),
    mode: 'all',
    defaultValues: finalGrade ?? defaultValues,
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
          name="final_grade"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('finalGrade.name')}
              error={!!errors.final_grade}
              helperText={errors.final_grade?.message}
              variant="outlined"
              fullWidth
              onChange={(e) => field.onChange(+e.target.value)}
            />
          )}
        />

        <Controller
          name="exam_grade"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('finalGrade.examGrade')}
              error={!!errors.exam_grade}
              helperText={errors.exam_grade?.message}
              variant="outlined"
              fullWidth
              onChange={(e) => field.onChange(+e.target.value)}
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

export default FinalGradeForm;
