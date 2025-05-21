import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface IDangerZone {
  handleDelete: () => void;
  title?: string;
  description?: string;
  confirmTitle?: string;
  confirmText?: string;
  deleteButtonLabel?: string;
}
const DangerZone = ({
  handleDelete,
  title,
  description,
  confirmTitle,
  confirmText,
  deleteButtonLabel,
}: IDangerZone) => {
  const { t } = useTranslation();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  return (
    <>
      <Paper sx={{ p: 3, border: '1px solid red', backgroundColor: '#ffebee', width: '70%' }}>
        <Typography variant="h6" gutterBottom color="error">
          {title ?? t('dangerZone.title')}
        </Typography>
        <Typography variant="body2" color="error" gutterBottom>
          {description ?? t('dangerZone.description')}
        </Typography>
        <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={() => setOpenDeleteDialog(true)}>
          {deleteButtonLabel ?? t('dangerZone.deleteButtonLabel')}
        </Button>
      </Paper>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>{confirmTitle ?? t('dangerZone.confirmTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmText ?? t('dangerZone.confirmText')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            {t('buttons.cancel')}
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            {deleteButtonLabel ?? t('dangerZone.deleteButtonLabel')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DangerZone;
