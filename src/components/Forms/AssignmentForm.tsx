import { Controller, useForm } from 'react-hook-form';

import { Assignment } from '@/models/Assignment';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

import { AssigmentValidationType, assigmentValidation } from '@/utils/zod-validation';

interface IAssignmentForm {
  onSubmit: (data: AssigmentValidationType) => void;
  subjectId: string | null;
  assignment: Assignment | null;
}

const AssignmentForm = ({ onSubmit, subjectId, assignment }: IAssignmentForm) => {
  const defaultValues = {
    subject_id: subjectId ?? '',
    name: '',
    description: '',
    due_date: new Date(),
  };

  const formMethods = useForm<AssigmentValidationType>({
    resolver: zodResolver(assigmentValidation),
    mode: 'all',
    defaultValues: assignment ? { ...assignment, due_date: new Date(assignment.due_date) } : defaultValues,
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
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={'Assignment Name'}
              error={!!errors.name}
              helperText={errors.name?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={'Description'}
              error={!!errors.description}
              helperText={errors.description?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Controller
          name="due_date"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              value={field.value ? dayjs(field.value) : null}
              onChange={(newValue: Dayjs | null) => {
                field.onChange(newValue && new Date(newValue.format()));
              }}
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

export default AssignmentForm;
