import { Assignment } from '@/models/Assignment';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal } from '@mui/material';

import { AssigmentValidationType } from '@/utils/zod-validation';

import AssignmentForm from '../Forms/AssignmentForm';

interface IAssignmentModal {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AssigmentValidationType) => void;
  subjectId: string | null;
  assignment: Assignment | null;
}

const AssignmentModal = ({ open, onClose, onSubmit, subjectId, assignment }: IAssignmentModal) => {
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
        <AssignmentForm onSubmit={onSubmit} subjectId={subjectId} assignment={assignment} />
      </Box>
    </Modal>
  );
};

export default AssignmentModal;
