import { StudentSubmission } from '@/models/StudentSubmission';
import { Grid, Typography } from '@mui/material';

import StudentSubmissionCard from '../Cards/StudentSubmissionCard';

interface IStudentSubmissionList {
  submissions: StudentSubmission[];
}

const StudentSubmissionList = ({ submissions }: IStudentSubmissionList) => {
  if (submissions.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" align="center">
        No submissions available
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      {submissions.map((submission) => (
        <Grid item xs={12} sm={6} md={4} key={submission.id}>
          <StudentSubmissionCard submission={submission} />
        </Grid>
      ))}
    </Grid>
  );
};

export default StudentSubmissionList;
