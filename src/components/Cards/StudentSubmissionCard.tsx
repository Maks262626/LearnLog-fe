import { useNavigate } from 'react-router-dom';

import { StudentSubmission, StudentSubmissionStatus } from '@/models/StudentSubmission';
import { routes } from '@/routes';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Card, CardContent, Chip, IconButton, Tooltip, Typography } from '@mui/material';

import { Color } from '@/redux/types/Color';

interface IStudentSubmissionCard {
  submission: StudentSubmission;
}

const StudentSubmissionCard = ({ submission }: IStudentSubmissionCard) => {
  const navigate = useNavigate();

  const getStatusColor = (status: StudentSubmissionStatus): Color => {
    const map: Record<StudentSubmissionStatus, Color> = {
      [StudentSubmissionStatus.PENDING]: 'warning',
      [StudentSubmissionStatus.REVIEWED]: 'info',
      [StudentSubmissionStatus.GRADED]: 'success',
      [StudentSubmissionStatus.RESUBMISSION_REQUESTED]: 'error',
      [StudentSubmissionStatus.LATE_SUBMISSION]: 'secondary',
    };
    const color = map[status];
    return color;
  };

  const handleCopy = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(submission.file_url);
  };

  const handleClick = () => {
    navigate(`${routes.PUBLIC.ASSIGNMENTS}/${submission.id}`);
  };

  return (
    <Card
      variant="outlined"
      onClick={handleClick}
      sx={{
        maxWidth: 500,
        border: '1px solid transparent',
        '&:hover': { border: '1px solid #FFFD02', cursor: 'pointer' },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Submission Details</Typography>
          {submission.status && (
            <Chip
              label={submission.status.replace('_', ' ').toUpperCase()}
              color={getStatusColor(submission.status)}
              size="small"
            />
          )}
        </Box>

        <Box mb={1}>
          <Typography variant="h5" color="text.secondary">
            {submission.assignment.name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Submitted on:
          </Typography>
          <Typography variant="body2">{new Date(submission.submission_date).toLocaleString()}</Typography>
        </Box>

        {submission.student_comments && (
          <Box mb={1}>
            <Typography variant="subtitle2" color="text.secondary">
              Comments:
            </Typography>
            <Typography variant="body2">{submission.student_comments}</Typography>
          </Box>
        )}

        <Box mb={1}>
          <Typography variant="subtitle2" color="text.secondary">
            File URL:
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              variant="body2"
              sx={{
                wordBreak: 'break-word',
                flexGrow: 1,
              }}
            >
              {submission.file_url}
            </Typography>
            <Tooltip title="Copy URL" onClick={(e) => handleCopy(e)}>
              <IconButton size="small">
                <ContentCopyIcon fontSize="small" sx={{ color: 'white' }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StudentSubmissionCard;
