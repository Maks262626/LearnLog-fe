import { StudentGroupGradesSummaryReport } from '@/types/Reports';
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

const SubjectsGradesView = ({ data }: { data: StudentGroupGradesSummaryReport[] }) => {
  return (
    <Box sx={{ p: 2 }}>
      {data.map(({ subject, studentGrades }) => (
        <Accordion key={subject.id} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box>
              <Typography variant="h6">{subject.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {subject.description} — Type: {subject.type.toUpperCase()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Group: {subject.group.name}, Teacher: {subject.teacher.first_name} {subject.teacher.last_name}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Student</TableCell>
                    <TableCell>Assignments</TableCell>
                    <TableCell>Final Grade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentGrades.map(({ user, finalGrade, grades }) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        {user.first_name} {user.last_name}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          {grades.map(({ assignment, grade }) => (
                            <Box key={assignment.id} sx={{ border: '1px solid #eee', p: 1, borderRadius: 1 }}>
                              <Typography variant="body2">
                                <strong>{assignment.name}</strong>
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {assignment.description}
                              </Typography>
                              <Typography variant="body2" component={'span'}>
                                Grade:{' '}
                                {grade.grade_value !== null ? (
                                  <Chip label={grade.grade_value} color="primary" size="small" />
                                ) : (
                                  <Chip label="Not graded" color="warning" size="small" />
                                )}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell>
                        {finalGrade !== null ? (
                          <Chip label={finalGrade.final_grade} color="success" />
                        ) : (
                          <Chip label="Pending" color="default" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default SubjectsGradesView;
