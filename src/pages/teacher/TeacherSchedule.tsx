import { useState } from 'react';
import { ClockLoader } from 'react-spinners';

import { SubjectInstance } from '@/models/SubjectInstance';
import { Box } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

import TeacherScheduleModal from '@/components/Modals/TeacherScheduleModal';
import WeekDateRangePicker from '@/components/WeekDateRangePicker';
import WeekView from '@/components/WeekView';

import { getStartEndWeekDates } from '@/utils/dateService';

import { useGetTeacherSubjectInstancesQuery } from '@/redux/subjectInstanceApiSlice';

const TeacherSchedule = () => {
  const dateRange = getStartEndWeekDates(dayjs());

  const [startWeekDate, setStartWeekDate] = useState<Dayjs>(dayjs(dateRange[0]));
  const [endWeekDate, setEndWeekDate] = useState<Dayjs>(dayjs(dateRange[1]));
  const [subjectInstance, setSubjectInstance] = useState<SubjectInstance | null>(null);
  const [open, setOpen] = useState(false);

  const { data: lessons, isFetching } = useGetTeacherSubjectInstancesQuery({
    start_date: startWeekDate.format('YYYY-MM-DD'),
    end_date: endWeekDate.format('YYYY-MM-DD'),
  });

  const handleSubjectInstance = (lecture: SubjectInstance) => {
    setSubjectInstance(lecture);
    setOpen(true);
  };
  return (
    <>
      <Box sx={{ px: 2, display: 'inline-flex', alignItems: 'center', gap: 2 }}>
        <WeekDateRangePicker
          startWeekDate={startWeekDate}
          endWeekDate={endWeekDate}
          setEndWeekDate={setEndWeekDate}
          setStartWeekDate={setStartWeekDate}
        />
        {isFetching && <ClockLoader size={30} color="yellow" />}
      </Box>
      {!isFetching && <WeekView lessons={lessons?.data} handleClick={handleSubjectInstance} />}
      <TeacherScheduleModal open={open} onClose={() => setOpen(false)} subjectInstance={subjectInstance} />
    </>
  );
};

export default TeacherSchedule;
