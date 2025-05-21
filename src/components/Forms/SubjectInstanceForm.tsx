import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { SubjectInstance, SubjectInstanceStatus, SubjectInstanceType } from '@/models/SubjectInstance';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { TimeField } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/uk';

import { SubjectInstanceValidationType, subjectInstanceValidation } from '@/utils/zod-validation';

import { useGetGroupsInMyFacultyQuery } from '@/redux/groupSlice';
import { useGetSubjectsByGroupIdQuery } from '@/redux/subjectApiSlice';
import { useTranslation } from 'react-i18next';

interface ISubjectInstanceForm {
  onSubmit: (data: SubjectInstanceValidationType) => void;
  subjectInstance: SubjectInstance | null;
  handleDelete: () => void;
}

const SubjectInstanceForm = ({ subjectInstance, onSubmit, handleDelete }: ISubjectInstanceForm) => {
  const { t } = useTranslation();
  const { data: groups } = useGetGroupsInMyFacultyQuery();
  const [groupId, setGroupId] = useState<string | undefined>(subjectInstance?.subject.group.id ?? undefined);
  const { data: subjects } = useGetSubjectsByGroupIdQuery(groupId!, { skip: !groupId || Boolean(subjectInstance) });

  const defaultValues = {
    name: `${new Date().toLocaleDateString()}`,
    subject_id: '',
    date: new Date(),
    start_time: '',
    end_time: '',
    type: SubjectInstanceType.LECTURE,
    status: SubjectInstanceStatus.PENDING,
    url: '',
    location: '',
  };

  const formMethods = useForm<SubjectInstanceValidationType>({
    resolver: zodResolver(subjectInstanceValidation),
    mode: 'all',
    defaultValues: subjectInstance ? { ...subjectInstance, date: new Date(subjectInstance.date) } : defaultValues,
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isValid, errors },
  } = formMethods;

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setGroupId(value);
    setValue('subject_id', '');
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'grid', placeItems: 'center', gap: 3 }}>
      <FormControl fullWidth>
        <InputLabel id="group-label">{t('group.name')}</InputLabel>
        <Select label={t('group.name')} value={groupId} onChange={handleSelectChange} disabled={Boolean(subjectInstance)}>
          {groups?.data.map((group) => (
            <MenuItem key={group.id} value={group.id}>
              {group.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Controller
        name="subject_id"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="subject-label">{t('subject.name')}</InputLabel>
            <Select
              {...field}
              error={!!errors.subject_id}
              label={t('subject.name')}
              disabled={Boolean(subjectInstance)}
              onChange={(event) => {
                const value = event.target.value;
                field.onChange(value);
              }}
            >
              {subjectInstance && (
                <MenuItem value={subjectInstance.subject.id}>{subjectInstance.subject.name}</MenuItem>
              )}
              {subjects?.data.map((subject) => (
                <MenuItem key={subject.id} value={subject.id}>
                  {subject.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('subject.name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="date"
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
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Controller
          name="start_time"
          control={control}
          render={({ field }) => (
            <TimeField
              {...field}
              label={t('subjectInstance.startTime')}
              format="HH:mm"
              value={field.value ? dayjs(field.value, 'HH:mm') : null}
              onChange={(newValue: Dayjs | null) => {
                field.onChange(newValue ? newValue.format('HH:mm') : null);
              }}
            />
          )}
        />
        <Controller
          name="end_time"
          control={control}
          render={({ field }) => (
            <TimeField
              {...field}
              label={t('subjectInstance.endTime')}
              format="HH:mm"
              value={field.value ? dayjs(field.value, 'HH:mm') : null}
              onChange={(newValue: Dayjs | null) => {
                field.onChange(newValue ? newValue.format('HH:mm') : null);
              }}
            />
          )}
        />
      </Box>

      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="type-label">{t('general.type')}</InputLabel>
            <Select
              {...field}
              error={!!errors.type}
              label={t('general.type')}
              onChange={(event) => {
                const value = event.target.value;
                field.onChange(value);
              }}
            >
              {Object.values(SubjectInstanceType).map((status) => (
                <MenuItem key={status} value={status}>
                  {t(`subjectInstance.type.${status}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="status-label">{t('general.status')}</InputLabel>
            <Select
              {...field}
              error={!!errors.status}
              label={t('general.status')}
              onChange={(event) => {
                const value = event.target.value;
                field.onChange(value);
              }}
            >
              {Object.values(SubjectInstanceStatus).map((status) => (
                <MenuItem key={status} value={status}>
                  {t(`subjectInstance.status.${status}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="url"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('subjectInstance.url')}
            error={!!errors.url}
            helperText={errors.url?.message}
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('subjectInstance.location')}
            error={!!errors.location}
            helperText={errors.location?.message}
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={!isValid}>
          {t('buttons.save')}
        </Button>
        <Button variant="contained" color="error" sx={{ mt: 2 }} disabled={!isValid} onClick={handleDelete}>
          {t('buttons.delete')}
        </Button>
      </Box>
    </Box>
  );
};

export default SubjectInstanceForm;
