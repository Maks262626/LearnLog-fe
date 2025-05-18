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
  title = 'Danger Zone',
  description = 'Deleting this item is irreversible. This action cannot be undone.',
  confirmTitle = 'Confirm Deletion',
  confirmText = 'Are you sure you want to delete this item? This action cannot be undone.',
  deleteButtonLabel = 'Delete',
}: IDangerZone) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  return (
    <>
      <Paper sx={{ p: 3, border: '1px solid red', backgroundColor: '#ffebee', width: '70%' }}>
        <Typography variant="h6" gutterBottom color="error">
          {title}
        </Typography>
        <Typography variant="body2" color="error" gutterBottom>
          {description}
        </Typography>
        <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={() => setOpenDeleteDialog(true)}>
          {deleteButtonLabel}
        </Button>
      </Paper>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>{confirmTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            {deleteButtonLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DangerZone;
