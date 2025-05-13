import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Subject, SubjectType } from '@/models/Subject';
import { routes } from '@/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

import Loader from '@/components/common/Loader';

import { SubjectValidationType, subjectValidation } from '@/utils/zod-validation';

import { useGetFacultiesInMyUniversityQuery } from '@/redux/facultyApiSlice';
import { useGetGroupsInMyFacultyQuery } from '@/redux/groupSlice';
import { useGetTeachersByFacultyIdQuery } from '@/redux/usersApiSlice';

interface ISubjectForm {
  subject?: Subject;
  onSubmit: (data: SubjectValidationType) => void;
}

const SubjectForm = ({ subject, onSubmit }: ISubjectForm) => {
  const navigate = useNavigate();
  const { data: groups, isLoading: isGroupLoading } = useGetGroupsInMyFacultyQuery();
  const { data: faculties } = useGetFacultiesInMyUniversityQuery();
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  const { data: teachers, isLoading: isTeachersLoading } = useGetTeachersByFacultyIdQuery(selectedFaculty!, {
    skip: !selectedFaculty,
  });

  const defaultValues = {
    teacher_id: subject ? subject.teacher.id : '',
    group_id: subject ? subject.group.id : '',
    name: subject ? subject.name : '',
    description: subject ? subject.description : '',
    type: subject ? subject.type : SubjectType.CREDIT,
  };

  const formMethods = useForm<SubjectValidationType>({
    resolver: zodResolver(subjectValidation),
    mode: 'all',
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    setValue,
  } = formMethods;

  if (isGroupLoading) {
    return <Loader />;
  }

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
              label={'Subject Name'}
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
              label={'Subject Name'}
              error={!!errors.description}
              helperText={errors.description?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <ToggleButtonGroup
              sx={{ display: 'flex', gap: 2 }}
              value={field.value}
              exclusive
              onChange={(_, value) => value && field.onChange(value)}
              fullWidth
            >
              <ToggleButton
                value={SubjectType.CREDIT}
                sx={{
                  flex: 1,
                  bgcolor: field.value === SubjectType.CREDIT ? 'primary.main' : 'transparent',
                  color: field.value === SubjectType.CREDIT ? 'white' : 'gray',
                  border: `2px solid ${field.value === SubjectType.CREDIT ? 'red' : 'gray'}`,
                }}
              >
                Credit
              </ToggleButton>
              <ToggleButton
                value={SubjectType.EXAM}
                sx={{
                  flex: 1,
                  bgcolor: field.value === SubjectType.EXAM ? 'error.main' : 'transparent',
                  color: field.value === SubjectType.EXAM ? 'white' : 'gray',
                  border: `2px solid ${field.value === SubjectType.EXAM ? 'yellow' : 'gray'} !important`,
                }}
              >
                Exam
              </ToggleButton>
            </ToggleButtonGroup>
          )}
        />

        <Controller
          name="group_id"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="faculty-label">Group</InputLabel>
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

        <FormControl fullWidth>
          <InputLabel id="faculty-label">Teacher Faculty</InputLabel>
          <Select
            value={selectedFaculty || ''}
            label="Teacher Faculty"
            onChange={(event) => {
              const value = event.target.value;
              setSelectedFaculty(value ?? undefined);
              setValue('teacher_id', '');
            }}
          >
            {faculties?.data.map((faculty) => (
              <MenuItem key={faculty.id} value={faculty.id}>
                {faculty.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Controller
          name="teacher_id"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="teacher-label">Teacher</InputLabel>
              <Select {...field} value={field.value || ''} error={!!errors.teacher_id} label="Teacher">
                {teachers?.data.map((teachers) => (
                  <MenuItem key={teachers.id} value={teachers.id}>
                    {teachers.first_name} {teachers.last_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={!isValid}
          onClick={() => navigate(routes.PUBLIC.SUBJECT)}
        >
          Save
        </Button>
      </Paper>
    </Box>
  );
};

export default SubjectForm;
