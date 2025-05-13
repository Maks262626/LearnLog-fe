import { useState } from 'react';
import { ClockLoader } from 'react-spinners';

import { SubjectInstance } from '@/models/SubjectInstance';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

import SubjectInstanceCard from '@/components/Cards/SubjectInstanceCard';
import WeekDateRangePicker from '@/components/WeekDateRangePicker';
import WeekView from '@/components/WeekView';

import { getStartEndWeekDates } from '@/utils/dateService';

import { useGetSubjectInstancesInMyGroupQuery } from '@/redux/subjectInstanceApiSlice';

const StudentSchedule = () => {
  const dateRange = getStartEndWeekDates(dayjs());

  const [startWeekDate, setStartWeekDate] = useState<Dayjs>(dayjs(dateRange[0]));
  const [endWeekDate, setEndWeekDate] = useState<Dayjs>(dayjs(dateRange[1]));
  const [subjectInstance, setSubjectInstance] = useState<SubjectInstance | null>(null);
  const [open, setOpen] = useState(false);

  const { data: lessons, isFetching } = useGetSubjectInstancesInMyGroupQuery({
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

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 450,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            px: 3,
            pt: 7,
            pb: 4,
          }}
        >
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', top: 8, right: 8, color: 'primary.main' }}
          >
            <CloseIcon />
          </IconButton>
          <SubjectInstanceCard subjectInstance={subjectInstance} />
        </Box>
      </Modal>
    </>
  );
};

export default StudentSchedule;
