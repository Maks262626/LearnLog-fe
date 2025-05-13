import { FinalGrade } from '@/models/FinalGrade';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal } from '@mui/material';

import { FinalGradeValidationType } from '@/utils/zod-validation';

import FinalGradeForm from '../Forms/FinalGradeForm';

interface IFinalGradeModal {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FinalGradeValidationType) => void;
  finalGrade: FinalGrade | null;
}

const FinalGradeModal = ({ open, onClose, onSubmit, finalGrade }: IFinalGradeModal) => {
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
        <FinalGradeForm onSubmit={onSubmit} finalGrade={finalGrade} />
      </Box>
    </Modal>
  );
};

export default FinalGradeModal;
