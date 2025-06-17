import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Group } from '@/models/Group';
import { routes } from '@/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Paper, TextField } from '@mui/material';

import { GroupValidationType, groupValidation } from '@/utils/zod-validation';

import { useGetMeQuery } from '@/redux/usersApiSlice';

interface IGroupForm {
  group?: Group;
  onSubmit: (data: GroupValidationType) => void;
}

const GroupForm = ({ group, onSubmit }: IGroupForm) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: user } = useGetMeQuery(undefined, { skip: group !== undefined });

  const defaultValues = {
    name: 'name',
    faculty_id: user?.data.faculty_id,
  };
  const formMethods = useForm<GroupValidationType>({
    resolver: zodResolver(groupValidation),
    mode: 'all',
    defaultValues: group ?? defaultValues,
  });
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = formMethods;

  return (
    <Box sx={{ display: 'grid', placeItems: 'center' }}>
      <Paper
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '70%',
          gap: 3,
          py: 5,
          px: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('group.name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => navigate(routes.PUBLIC.GROUP)}
          disabled={!isValid}
          sx={{ mt: 2 }}
        >
          {t('buttons.save')}
        </Button>
      </Paper>
    </Box>
  );
};

export default GroupForm;
