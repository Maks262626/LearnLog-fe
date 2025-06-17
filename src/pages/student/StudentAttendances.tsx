import { useTranslation } from 'react-i18next';

import { Box, CircularProgress, Typography } from '@mui/material';

import AttendancesView from '@/components/attendance/AttendancesView';

import { useGetStudentAttendancesReportQuery } from '@/redux/reportsApiSlice';

const StudentAttendances = () => {
  const { data, isLoading } = useGetStudentAttendancesReportQuery();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data?.data?.length) {
    return (
      <Typography variant="h6" align="center" mt={5}>
        {t('attendance.noAttendance')}
      </Typography>
    );
  }

  return <AttendancesView data={data.data} />;
};

export default StudentAttendances;
