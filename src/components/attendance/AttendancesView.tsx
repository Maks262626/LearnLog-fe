import { useTranslation } from 'react-i18next';

import { Attendance, AttendanceStatus } from '@/models/Attendance';
import { SubjectInstance } from '@/models/SubjectInstance';
import { Color } from '@/types/Color';
import { StudentAttendancesReport } from '@/types/Reports';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import dayjs from 'dayjs';

interface IAttendancesView {
  data: StudentAttendancesReport[];
}

const getStatusColor = (status: AttendanceStatus): Color => {
  const statusColorMap: Record<AttendanceStatus, Color> = {
    [AttendanceStatus.PRESENT]: 'success',
    [AttendanceStatus.LATE]: 'warning',
    [AttendanceStatus.ABSENT]: 'error',
  };
  return statusColorMap[status];
};

interface AttendanceEntry {
  subjectInstance: SubjectInstance;
  attendance: Attendance;
}

interface AttendanceStats {
  total: number;
  present: number;
  late: number;
  absent: number;
  percentage: string;
}

const getAttendanceStats = (attendances: AttendanceEntry[]): AttendanceStats => {
  const total = attendances.length;
  const present = attendances.filter((a) => a.attendance.status === AttendanceStatus.PRESENT).length;
  const late = attendances.filter((a) => a.attendance.status === AttendanceStatus.LATE).length;
  const absent = attendances.filter((a) => a.attendance.status === AttendanceStatus.ABSENT).length;
  const percentage = total ? (((present + late) / total) * 100).toFixed(0) : '0';

  return { total, present, late, absent, percentage };
};

interface PieDataItem {
  id: number;
  value: number;
  label: string;
}

const getPieData = (attendances: AttendanceEntry[]): PieDataItem[] => {
  const stats = getAttendanceStats(attendances);
  return [
    { id: 0, value: stats.present, label: 'Present' },
    { id: 1, value: stats.late, label: 'Late' },
    { id: 2, value: stats.absent, label: 'Absent' },
  ];
};

const AttendancesView = ({ data }: IAttendancesView) => {
  const { t } = useTranslation();

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        {t('attendance.your')}
      </Typography>

      {data.map(({ subject, attendances }) => {
        const stats = getAttendanceStats(attendances);

        return (
          <Accordion key={subject.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box>
                <Typography variant="h6">{subject.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {subject.description}
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              {attendances.length === 0 ? (
                <Typography>{t('attendance.noAttendance')}</Typography>
              ) : (
                <>
                  <Box mb={2}>
                    <Typography variant="body2" gutterBottom>
                      {t('general.total')}: {stats.total} | {t('attendance.status.present')}: {stats.present} |{' '}
                      {t('attendance.status.late')}: {stats.late} | {t('attendance.status.absent')}: {stats.absent} —
                      {t('attendance.name')}: {stats.percentage}%
                    </Typography>
                    <PieChart series={[{ data: getPieData(attendances) }]} width={300} height={200} />
                  </Box>

                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>{t('general.date')}</TableCell>
                          <TableCell>{t('general.time')}</TableCell>
                          <TableCell>{t('general.lesson')}</TableCell>
                          <TableCell>{t('general.status')}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {attendances.map(({ subjectInstance, attendance }) => (
                          <TableRow
                            key={subjectInstance.id}
                            sx={(theme) => ({
                              backgroundColor:
                                attendance.status === AttendanceStatus.PRESENT
                                  ? theme.palette.success.light
                                  : attendance.status === AttendanceStatus.LATE
                                    ? theme.palette.warning.light
                                    : theme.palette.error.light,
                            })}
                          >
                            <TableCell>{dayjs(subjectInstance.date).format('DD/MM/YYYY')}</TableCell>
                            <TableCell>
                              {subjectInstance.start_time} - {subjectInstance.end_time}
                            </TableCell>
                            <TableCell>{subjectInstance.name}</TableCell>
                            <TableCell>
                              <Chip label={attendance.status} color={getStatusColor(attendance.status)} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default AttendancesView;
