import { StudentGroupGradesSummaryReport } from '@/types/Reports';
import {
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const SubjectsGradesTableView = ({ data }: { data: StudentGroupGradesSummaryReport[] }) => {
  const {t} = useTranslation();

  return (
    <Box p={2}>
      {data.map((subjectReport) => (
        <Box key={subjectReport.subject.id} mb={4}>
          <Typography variant="h5" gutterBottom>
            {subjectReport.subject.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom color="textSecondary">
            {t('subject.teacher')}: {subjectReport.subject.teacher.first_name} {subjectReport.subject.teacher.last_name} | {t('group.name')}:{' '}
            {subjectReport.subject.group.name}
          </Typography>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>{t('user.roles.student')}</strong>
                  </TableCell>
                  {subjectReport.studentGrades[0]?.grades.map((g, i) => (
                    <TableCell key={i}>
                      <strong>{g.assignment.name}</strong>
                    </TableCell>
                  ))}
                  <TableCell>
                    <strong>{t('finalGrade.name')}</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subjectReport.studentGrades.map((student) => (
                  <TableRow key={student.user.id}>
                    <TableCell>
                      {student.user.first_name} {student.user.last_name}
                    </TableCell>
                    {student.grades.map((g) => (
                      <TableCell key={g.assignment.id}>{g.grade.grade_value ?? '—'}</TableCell>
                    ))}
                    <TableCell>{student.finalGrade?.final_grade ?? '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider sx={{ my: 3 }} />
        </Box>
      ))}
    </Box>
  );
};

export default SubjectsGradesTableView;
