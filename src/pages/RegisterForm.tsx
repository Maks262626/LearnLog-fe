import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { routes } from '@/routes';
import { useAuth0 } from '@auth0/auth0-react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material';

import Loader from '@/components/common/Loader';

import { RegisterValidationType, registerValidation } from '@/utils/zod-validation';

import { useGetFacultiesByUniversityIdQuery } from '@/redux/facultyApiSlice';
import { useGetGroupsByFacultyIdQuery } from '@/redux/groupSlice';
import { useGetUniversitiesQuery } from '@/redux/universityApiSlice';
import { useRegisterUserMutation } from '@/redux/usersApiSlice';

const RegisterForm = () => {
  const navigate = useNavigate();

  const { data: universities } = useGetUniversitiesQuery();
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(null);

  const { data: faculties } = useGetFacultiesByUniversityIdQuery(selectedUniversity!, { skip: !selectedUniversity });
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);

  const { data: groups } = useGetGroupsByFacultyIdQuery(selectedFaculty!, { skip: !selectedFaculty });

  const [selectedRole, setSelectedRole] = useState<string>('student');
  const [registerUser] = useRegisterUserMutation();
  const { user } = useAuth0();
  const formMethods = useForm<RegisterValidationType>({
    resolver: zodResolver(registerValidation),
    mode: 'all',
    defaultValues: {
      first_name: 'first_name',
      last_name: 'last_name',
      university_id: '',
      faculty_id: '',
      group_id: '',
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = formMethods;

  const onSubmit = async (regData: RegisterValidationType) => {
    const auth0_user_id = user?.sub;
    const data = { ...regData, auth0_user_id, is_registration_completed: true };

    await registerUser({ ...data });
  };

  if (!universities) {
    return <Loader />;
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: { sm: '100%', md: '70%' },
        gap: 3,
        py: 5,
        px: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Controller
          name="first_name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={'First Name'}
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Controller
          name="last_name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={'Last Name'}
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Box>
      <FormControl component="fieldset">
        <FormLabel component="legend">Role</FormLabel>
        <RadioGroup
          row
          value={selectedRole}
          onChange={(e) => {
            setSelectedRole(e.target.value);
            setValue('university_id', '');
            setValue('faculty_id', '');
            setValue('group_id', '');
          }}
        >
          <FormControlLabel value="manager" control={<Radio />} label="Manager" />
          <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
          <FormControlLabel value="student" control={<Radio />} label="Student" />
        </RadioGroup>
      </FormControl>

      <Controller
        name="university_id"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="university-label">University</InputLabel>
            <Select
              {...field}
              error={!!errors.university_id}
              label="University"
              onChange={(event) => {
                const value = event.target.value;
                field.onChange(value);
                setSelectedUniversity(value);
                setValue('faculty_id', '');
                setValue('group_id', '');
              }}
            >
              {universities.data.map((uni) => (
                <MenuItem key={uni.id} value={uni.id}>
                  {uni.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="faculty_id"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="faculty-label">Faculty</InputLabel>
            <Select
              {...field}
              value={field.value || ''}
              error={!!errors.faculty_id}
              label="Faculty"
              onChange={(event) => {
                const value = event.target.value;
                field.onChange(value);
                setSelectedFaculty(value);
                setValue('group_id', '');
              }}
            >
              {faculties?.data.map((faculty) => (
                <MenuItem key={faculty.id} value={faculty.id}>
                  {faculty.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      {!['manager', 'teacher'].includes(selectedRole) && (
        <Controller
          name="group_id"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="group-label">Group</InputLabel>
              <Select {...field} value={field.value || ''} error={!!errors.group_id} label="Group">
                {groups?.data.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => navigate(routes.PUBLIC.PROFILE)}
        disabled={!isValid}
        sx={{ mt: 2 }}
      >
        Save
      </Button>
    </Paper>
  );
};

export default RegisterForm;
