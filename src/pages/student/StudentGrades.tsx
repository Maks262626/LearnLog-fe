import { Alert, Box, CircularProgress } from '@mui/material';

import GradesView from '@/components/GradesView';

import { useGetStudentGradesReportQuery } from '@/redux/reportsApiSlice';

const StudentGrades = () => {
  const { data, isLoading, error } = useGetStudentGradesReportQuery();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px">
        <Alert severity="error">Failed to load grades.</Alert>
      </Box>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px">
        <Alert severity="info">No grades available.</Alert>
      </Box>
    );
  }

  return <GradesView data={data.data || []} />;
};

export default StudentGrades;
