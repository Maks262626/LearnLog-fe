import { Box, CircularProgress, Typography } from '@mui/material';

import AttendancesView from '@/components/AttendancesView';

import { useGetStudentAttendancesReportQuery } from '@/redux/reportsApiSlice';

const StudentAttendances = () => {
  const { data, isLoading } = useGetStudentAttendancesReportQuery();

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
        No attendance records available.
      </Typography>
    );
  }

  return <AttendancesView data={data.data} />;
};

export default StudentAttendances;
