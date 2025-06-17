import { useTranslation } from 'react-i18next';

import { AttendanceStatus } from '@/models/Attendance';
import { SubjectInstance } from '@/models/SubjectInstance';
import { Box, Button, List, ListItem, ListItemText, Paper, Stack, Typography } from '@mui/material';

import { useGetAttendanceBySubjectInstanceIdQuery, useUpdateAttendanceMutation } from '@/redux/attendanceApiSlice';

interface IAttendanceManage {
  subjectInstance: SubjectInstance | null;
}

const AttendanceManage = ({ subjectInstance }: IAttendanceManage) => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetAttendanceBySubjectInstanceIdQuery(subjectInstance?.id!, {
    skip: !subjectInstance,
  });
  const [updateAttendance] = useUpdateAttendanceMutation();

  const handleStatus = async (id: string, status: AttendanceStatus) => {
    await updateAttendance({ id, body: { status } });
  };

  if (!subjectInstance) {
    return (
      <Typography variant="h6" textAlign="center" mt={4}>
        {t('general.comingSoon')}
      </Typography>
    );
  }

  if (data?.data.length === 0 && !isLoading) {
    return (
      <Typography variant="h6" textAlign="center" mt={4}>
        {t('group.noStudent')}
      </Typography>
    );
  }

  return (
    <Box mt={3}>
      <Typography variant="h5" gutterBottom>
        {t('attendance.manage')}
      </Typography>
      <Paper elevation={2}>
        <List>
          {data?.data.map((attendance) => (
            <ListItem key={attendance.id} divider>
              <ListItemText primary={`${attendance.user.first_name} ${attendance.user.last_name}`} />
              <Stack direction="row" spacing={1}>
                <Button
                  variant={attendance.status === AttendanceStatus.PRESENT ? 'contained' : 'outlined'}
                  color="success"
                  size="small"
                  onClick={() => handleStatus(attendance.id, AttendanceStatus.PRESENT)}
                >
                  {t('attendance.status.present')}
                </Button>
                <Button
                  variant={attendance.status === AttendanceStatus.ABSENT ? 'contained' : 'outlined'}
                  color="error"
                  size="small"
                  onClick={() => handleStatus(attendance.id, AttendanceStatus.ABSENT)}
                >
                  {t('attendance.status.absent')}
                </Button>
                <Button
                  variant={attendance.status === AttendanceStatus.LATE ? 'contained' : 'outlined'}
                  color="warning"
                  size="small"
                  onClick={() => handleStatus(attendance.id, AttendanceStatus.LATE)}
                >
                  {t('attendance.status.late')}
                </Button>
              </Stack>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default AttendanceManage;
