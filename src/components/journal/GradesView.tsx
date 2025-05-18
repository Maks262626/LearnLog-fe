import { StudentGradesReports } from '@/types/Reports';
import { Box, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

import GradeLineChart from '../common/GradeLineChart';

interface IGradesView {
  data: StudentGradesReports[];
}

const GradesView = ({ data }: IGradesView) => {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Your Grades
      </Typography>

      <Box display="flex" flexDirection="column" gap={4}>
        {data.map((subjectReport) => (
          <Card key={subjectReport.subject.id} variant="outlined">
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                {subjectReport.subject.name}
              </Typography>

              {subjectReport.finalGrade ? (
                <Typography color="success.main" mb={2}>
                  Final Grade: {subjectReport.finalGrade.final_grade}
                </Typography>
              ) : (
                <Typography color="warning.main" mb={2}>
                  Final Grade: Not assigned yet
                </Typography>
              )}

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Assignment</TableCell>
                    <TableCell>Grade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjectReport.grades.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        <Typography color="text.secondary" fontStyle="italic">
                          No Assignments
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                  {subjectReport.grades.length !== 0 &&
                    subjectReport.grades.map(({ assignment, grade }) => (
                      <TableRow key={assignment.id}>
                        <TableCell>{assignment.name.slice(0, 5)}</TableCell>
                        <TableCell>
                          {grade ? (
                            <Typography color="success.main">{grade.grade_value}</Typography>
                          ) : (
                            <Typography color="text.secondary" fontStyle="italic">
                              Not graded
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
            {subjectReport.grades.length > 0 && (
              <GradeLineChart
                grades={subjectReport.grades
                  .filter((g) => g.grade?.grade_value != null)
                  .map((g) => ({
                    name: g.assignment.name,
                    grade: g.grade!.grade_value,
                  }))}
              />
            )}
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default GradesView;
