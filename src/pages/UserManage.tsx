import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { UserRoleName } from '@/models/User';
import { routes } from '@/routes';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

import Loader from '@/components/common/Loader';

import { useGetFacultyByIdQuery } from '@/redux/facultyApiSlice';
import { useGetGroupByIdQuery } from '@/redux/groupSlice';
import { useGetUniversityByIdQuery } from '@/redux/universityApiSlice';
import { useDeleteUserMutation, useGetUserByIdQuery, useUpdateUserRoleMutation } from '@/redux/usersApiSlice';
import { useTranslation } from 'react-i18next';

const UserManage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: user, isLoading, error, refetch } = useGetUserByIdQuery(id!, { skip: !id });
  const { data: university } = useGetUniversityByIdQuery(user?.data.university_id!, { skip: !user });
  const { data: faculty } = useGetFacultyByIdQuery(user?.data.faculty_id!, { skip: !user });
  const { data: group } = useGetGroupByIdQuery(user?.data.group_id!, { skip: !user });

  const [updateUserRole, { isLoading: isUpdating }] = useUpdateUserRoleMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [selectedRole, setSelectedRole] = useState<UserRoleName>(UserRoleName.STUDENT);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    if (user?.data?.role) {
      setSelectedRole(user.data.role);
      refetch();
    }
  }, [user]);

  if (!id) return <Typography>{t('errors.NoId')}</Typography>;
  if (isLoading) return <Loader />;
  if (error || !user?.data) return <Typography>{t('errors.fetch')}</Typography>;

  const handleRoleChange = (event: SelectChangeEvent<UserRoleName>) => {
    setSelectedRole(event.target.value as UserRoleName);
  };

  const handleRoleUpdate = async () => {
    await updateUserRole({ id, role: selectedRole });
    refetch();
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = async () => {
    await deleteUser(id);
    navigate(routes.PUBLIC.USERS);
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          {t('user.details')}
        </Typography>
        <Typography>
          <strong>{t('user.firstName')}:</strong> {user.data.first_name}
        </Typography>
        <Typography>
          <strong>{t('user.lastName')}:</strong> {user.data.last_name}
        </Typography>
        <Typography>
          <strong>{t('profile.university')}:</strong> {university?.data.name || t('errors.NA')}
        </Typography>
        <Typography>
          <strong>{t('profile.faculty')}:</strong> {faculty?.data.name || t('errors.NA')}
        </Typography>
        <Typography>
          <strong>{t('profile.group')}:</strong> {group?.data.name || t('errors.NA')}
        </Typography>
        <Typography>
          <strong>{t('profile.role')}</strong> {user.data.role || t('errors.NA')}
        </Typography>
        <Box display="flex" alignItems="center" mt={2}>
          <Typography>
            <strong>{t('buttons.approve')}:</strong>
          </Typography>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: user.data.is_approved ? 'green' : 'red',
              ml: 1,
            }}
          />
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t('user.manageRole')}
        </Typography>
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel>Role</InputLabel>
          <Select label="Role" value={selectedRole} onChange={handleRoleChange}>
            {Object.values(UserRoleName).map((role) => (
              <MenuItem key={role} value={role}>
                {role.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleRoleUpdate} sx={{ mt: 2 }} disabled={isUpdating}>
          {isUpdating ? <CircularProgress size={24} /> : 'Save Role'}
        </Button>
      </Paper>

      <Paper sx={{ p: 3, border: '1px solid red', backgroundColor: '#ffebee' }}>
        <Typography variant="h6" gutterBottom color="error">
          {t('general.dangerZone')}
        </Typography>
        <Typography variant="body2" color="error" gutterBottom>
          {t('user.irreversibleDelete')}
        </Typography>
        <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={handleOpenDeleteDialog}>
          {t('user.deleteUser')}
        </Button>
      </Paper>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>{t('user.dialog.confirmDeletionTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('user.dialog.confirmDeletionText')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            {t('buttons.cancel')}
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            {t('buttons.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManage;
