import { useTranslation } from 'react-i18next';

import { AttendanceStatus } from '@/models/Attendance';
import { Color } from '@/types/Color';
import { StudentGroupAttendanceSummaryReport } from '@/types/Reports';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

interface AttendanceReportProps {
  data: StudentGroupAttendanceSummaryReport[];
}

const getStatusColor = (status: AttendanceStatus): Color => {
  const statusColorMap: Record<AttendanceStatus, Color> = {
    [AttendanceStatus.PRESENT]: 'success',
    [AttendanceStatus.LATE]: 'warning',
    [AttendanceStatus.ABSENT]: 'error',
  };

  const color = statusColorMap[status];
  return color;
};
const AttendanceReport = ({ data }: AttendanceReportProps) => {
  const { t } = useTranslation();

  return (
    <Box>
      {data.map((subjectReport) => {
        const allDates = Array.from(
          new Set(
            subjectReport.studentAttendances.flatMap((s) =>
              s.attendances.map((a) => new Date(a.subjectInstance.date).toLocaleDateString()),
            ),
          ),
        ).sort();

        return (
          <Accordion key={subjectReport.subject.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 'bold' }}>
                {subjectReport.subject.name} ({subjectReport.subject.type})
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{t('user.roles.student')}</TableCell>
                    {allDates.map((date) => (
                      <TableCell key={date} align="center">
                        {date}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjectReport.studentAttendances.map(({ user, attendances }) => {
                    const attendanceByDate: Record<string, AttendanceStatus> = {};
                    attendances.forEach((a) => {
                      const date = new Date(a.subjectInstance.date).toLocaleDateString();
                      attendanceByDate[date] = a.attendance?.status;
                    });

                    return (
                      <TableRow key={user.id}>
                        <TableCell>
                          {user.last_name} {user.first_name}
                        </TableCell>
                        {allDates.map((date) => (
                          <TableCell key={date} align="center">
                            <Chip
                              label={attendanceByDate[date] ?? '-'}
                              size="small"
                              color={getStatusColor(attendanceByDate[date] ?? AttendanceStatus.ABSENT)}
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default AttendanceReport;
