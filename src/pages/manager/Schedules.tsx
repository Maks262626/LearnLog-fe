import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SubjectInstance } from '@/models/SubjectInstance';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

import ScheduleModal from '@/components/Modals/ScheduleModal';
import WeekDateRangePicker from '@/components/common/WeekDateRangePicker';
import WeekView from '@/components/common/WeekView';

import { getStartEndWeekDates } from '@/utils/dateService';
import { SubjectInstanceValidationType } from '@/utils/zod-validation';

import { useGetGroupsInMyFacultyQuery } from '@/redux/groupSlice';
import {
  useCreateSubjectInstanceMutation,
  useGetSubjectInstancesByGroupIdQuery,
  useUpdateSubjectInstanceMutation,
} from '@/redux/subjectInstanceApiSlice';

const WeeklyLecturesView = () => {
  const { t } = useTranslation();
  const dateRange = getStartEndWeekDates(dayjs());

  const [startWeekDate, setStartWeekDate] = useState<Dayjs>(dayjs(dateRange[0]));
  const [endWeekDate, setEndWeekDate] = useState<Dayjs>(dayjs(dateRange[1]));
  const [subjectInstance, setSubjectInstance] = useState<SubjectInstance | null>(null);

  const { data: groups } = useGetGroupsInMyFacultyQuery();
  const [groupId, setGroupId] = useState<string | undefined>(undefined);

  const { data: lessons, refetch } = useGetSubjectInstancesByGroupIdQuery(
    {
      id: groupId!,
      start_date: startWeekDate.format('YYYY-MM-DD'),
      end_date: endWeekDate.format('YYYY-MM-DD'),
    },
    { skip: !groupId || !dateRange },
  );

  const [open, setOpen] = useState(false);
  const [createSubjectInstance] = useCreateSubjectInstanceMutation();
  const [updateSubjectInstance] = useUpdateSubjectInstanceMutation();

  const handleSchedule = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddSubjectInstance = () => {
    setSubjectInstance(null);
    handleSchedule();
  };
  const onSubmit = async (data: SubjectInstanceValidationType) => {
    if (subjectInstance) {
      await updateSubjectInstance({ id: subjectInstance.id, body: data });
    } else {
      await createSubjectInstance(data);
    }
    setSubjectInstance(null);
    refetch();
    handleClose();
  };

  const handleSelectGroupChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setGroupId(value);
  };

  const handleSubjectInstance = (lecture: SubjectInstance) => {
    setSubjectInstance(lecture);
    handleSchedule();
  };

  return (
    <>
      <Box sx={{ px: 2, display: { xs: 'flex', sm: 'inline-flex' }, flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddSubjectInstance}>
          <LibraryAddIcon /> {t('general.add')}
        </Button>
        <FormControl fullWidth>
          <InputLabel id="group-label">{t('group.name')}</InputLabel>
          <Select label={t('group.name')} value={groupId ?? ''} onChange={handleSelectGroupChange}>
            {groups?.data.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <WeekDateRangePicker
          startWeekDate={startWeekDate}
          endWeekDate={endWeekDate}
          setEndWeekDate={setEndWeekDate}
          setStartWeekDate={setStartWeekDate}
        />
      </Box>
      <WeekView lessons={lessons?.data} handleClick={handleSubjectInstance} />
      <ScheduleModal
        open={open}
        onClose={handleClose}
        onSubmit={onSubmit}
        subjectInstance={subjectInstance}
        refetch={refetch}
      />
    </>
  );
};

export default WeeklyLecturesView;
