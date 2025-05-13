import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal } from '@mui/material';

import { StudentSubmissionValidationType } from '@/utils/zod-validation';

import StudentSubmissionForm from '../Forms/StudentSubmissionForm';

interface IStudentSubmissionModal {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: StudentSubmissionValidationType) => void;
  assignmentId: string | null;
}

const StudentSubmissionModal = ({ open, onClose, onSubmit, assignmentId }: IStudentSubmissionModal) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 450,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          px: 3,
          pt: 7,
          pb: 4,
        }}
      >
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8, color: 'primary.main' }}>
          <CloseIcon />
        </IconButton>
        <StudentSubmissionForm assignmentId={assignmentId} onSubmit={onSubmit} />
      </Box>
    </Modal>
  );
};

export default StudentSubmissionModal;
