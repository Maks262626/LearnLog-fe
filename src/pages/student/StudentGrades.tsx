import { useTranslation } from 'react-i18next';

import { Alert, Box, CircularProgress } from '@mui/material';

import GradesView from '@/components/journal/GradesView';

import { useGetStudentGradesReportQuery } from '@/redux/reportsApiSlice';

const StudentGrades = () => {
  const { data, isLoading, error } = useGetStudentGradesReportQuery();
  const { t } = useTranslation();

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
        <Alert severity="error">{t('grade.noGrades')}</Alert>
      </Box>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px">
        <Alert severity="info">{t('grades.noGrades')}</Alert>
      </Box>
    );
  }

  return <GradesView data={data.data || []} />;
};

export default StudentGrades;
