import { Grade } from '@/models/Grade';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal } from '@mui/material';

import { GradeValidationType } from '@/utils/zod-validation';

import GradeForm from '../Forms/GradeForm';

interface IGradeModal {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: GradeValidationType) => void;
  grade: Grade | null;
}

const GradeModal = ({ open, onClose, onSubmit, grade }: IGradeModal) => {
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
        <GradeForm onSubmit={onSubmit} grade={grade} />
      </Box>
    </Modal>
  );
};

export default GradeModal;
