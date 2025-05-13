import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { StudentSubmissionStatus } from '@/models/StudentSubmission';
import { UserRoleName } from '@/models/User';
import { Color } from '@/types/Color';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button, Chip, Divider, IconButton, Tooltip, Typography } from '@mui/material';

import GradeModal from '@/components/Modals/GradeModal';
import Loader from '@/components/common/Loader';

import { GradeValidationType } from '@/utils/zod-validation';

import { useUserRole } from '@/hooks/useUserRole';

import { useGetGradeByUserIdAndAssignmentIdQuery, useUpdateGradeMutation } from '@/redux/gradeApiSlice';
import {
  useGetStudentSubmissionByIdQuery,
  useUpdateStudentSubmissionMutation,
} from '@/redux/studentSubmissionApiSlice';

const getStatusColor = (status: StudentSubmissionStatus): Color => {
  const map: Record<StudentSubmissionStatus, Color> = {
    [StudentSubmissionStatus.PENDING]: 'warning',
    [StudentSubmissionStatus.REVIEWED]: 'info',
    [StudentSubmissionStatus.GRADED]: 'success',
    [StudentSubmissionStatus.RESUBMISSION_REQUESTED]: 'error',
    [StudentSubmissionStatus.LATE_SUBMISSION]: 'secondary',
  };
  return map[status];
};

const Submission = () => {
  const { id } = useParams();
  if (!id) return;
  const { role } = useUserRole();
  const { data: submission, isLoading } = useGetStudentSubmissionByIdQuery(id);
  const { data: studentGrade } = useGetGradeByUserIdAndAssignmentIdQuery(
    {
      userId: submission?.data.user.id!,
      assignmentId: submission?.data.assignment.id!,
    },
    {
      skip: !submission?.data.user.id || !submission?.data.assignment.id,
    },
  );
  const [updateStudentSubmission] = useUpdateStudentSubmissionMutation();
  const [updateGrade] = useUpdateGradeMutation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (submission && submission.data.status === StudentSubmissionStatus.PENDING) {
      updateStudentSubmission({
        id: submission.data.id,
        body: { status: StudentSubmissionStatus.REVIEWED },
      });
    }
  }, [submission]);

  const handleRequestResubmission = () => {
    if (!submission) return;
    updateStudentSubmission({
      id: submission.data.id,
      body: { status: StudentSubmissionStatus.RESUBMISSION_REQUESTED },
    });
  };

  const handleApprove = () => {
    setOpen(true);
  };
  const onSubmit = async (data: GradeValidationType) => {
    if (!studentGrade || !submission) return;
    await updateGrade({ id: studentGrade?.data.id, body: data });
    await updateStudentSubmission({ id: submission.data.id, body: { status: StudentSubmissionStatus.GRADED } });
    setOpen(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(submission?.data.file_url || '');
  };

  if (isLoading || !submission || !studentGrade) {
    return <Loader />;
  }

  return (
    <Box maxWidth="700px" margin="0 auto" padding={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Submission Info</Typography>
        <Chip
          label={submission.data.status.replace('_', ' ').toUpperCase()}
          color={getStatusColor(submission.data.status)}
          size="medium"
        />
      </Box>

      <Box mb={3}>
        <Typography variant="subtitle2" color="text.secondary">
          Assignment:
        </Typography>
        <Typography variant="h5">{submission.data.assignment.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {submission.data.assignment.description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Due Date: {new Date(submission.data.assignment.due_date).toLocaleString()}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box mb={3}>
        <Typography variant="subtitle2" color="text.secondary">
          Submitted by:
        </Typography>
        <Typography variant="body1">
          {submission.data.user.first_name} {submission.data.user.last_name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(submission.data.submission_date).toLocaleString()}
        </Typography>
      </Box>

      {submission.data.student_comments && (
        <Box mb={3}>
          <Typography variant="subtitle2" color="text.secondary">
            Comments:
          </Typography>
          <Typography variant="body1">{submission.data.student_comments}</Typography>
        </Box>
      )}

      <Box mb={3}>
        <Typography variant="subtitle2" color="text.secondary">
          File URL:
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2" sx={{ wordBreak: 'break-word', flexGrow: 1 }}>
            {submission.data.file_url}
          </Typography>
          <Tooltip title="Copy URL">
            <IconButton onClick={handleCopy} size="small">
              <ContentCopyIcon fontSize="small" sx={{ color: 'white' }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {role === UserRoleName.TEACHER && (
        <Box display="flex" gap={2} mt={4}>
          <Button variant="contained" color="success" onClick={handleApprove}>
            Approve
          </Button>
          <Button variant="outlined" color="error" onClick={handleRequestResubmission}>
            Request Resubmission
          </Button>
        </Box>
      )}
      <GradeModal open={open} onClose={() => setOpen(false)} onSubmit={onSubmit} grade={studentGrade.data} />
    </Box>
  );
};

export default Submission;
