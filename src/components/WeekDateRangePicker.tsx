import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

import { getStartEndWeekDates } from '@/utils/dateService';

interface IWeekDateRangePicker {
  startWeekDate: Dayjs;
  endWeekDate: Dayjs;
  setStartWeekDate: React.Dispatch<React.SetStateAction<Dayjs>>;
  setEndWeekDate: React.Dispatch<React.SetStateAction<Dayjs>>;
}

const WeekDateRangePicker = ({
  startWeekDate,
  endWeekDate,
  setStartWeekDate,
  setEndWeekDate,
}: IWeekDateRangePicker) => {
  const handleDateChange = (newValue: Dayjs | null) => {
    if (!newValue) return;
    const [startDate, endDate] = getStartEndWeekDates(newValue);
    setStartWeekDate(dayjs(startDate));
    setEndWeekDate(dayjs(endDate));
  };

  const handlePrevWeek = () => {
    const date = startWeekDate.subtract(7, 'day');
    handleDateChange(date);
  };
  const handleNextWeek = () => {
    const date = startWeekDate.add(7, 'day');
    handleDateChange(date);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        p: 1,
        boxShadow: 2,
        mt: 1,
      }}
    >
      <Tooltip title="Previous week" onClick={handlePrevWeek}>
        <IconButton color="primary">
          <ChevronLeftIcon />
        </IconButton>
      </Tooltip>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          p: { xs: 2, sm: 0 },
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
        }}
      >
        <DatePicker
          label="Week Start"
          value={startWeekDate}
          onChange={(newValue) => handleDateChange(newValue)}
          slotProps={{
            textField: {
              size: 'small',
              sx: { minWidth: 150 },
            },
          }}
        />

        <Typography variant="h4" color="text.secondary">
          -
        </Typography>

        <DatePicker
          label="Week End"
          value={endWeekDate}
          disabled
          sx={{ color: 'red' }}
          slotProps={{
            textField: {
              size: 'small',
              sx: { minWidth: 150, color: 'red' },
            },
          }}
        />
      </Box>
      <Tooltip title="Next week" onClick={handleNextWeek}>
        <IconButton color="primary">
          <ChevronRightIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default WeekDateRangePicker;
