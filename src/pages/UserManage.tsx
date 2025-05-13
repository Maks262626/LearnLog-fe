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

const UserManage = () => {
  const { id } = useParams();
  if (!id) return <Typography>No user ID provided.</Typography>;

  const { data: user, isLoading, error, refetch } = useGetUserByIdQuery(id);
  if (!user?.data) return <Typography>User Not Found</Typography>;

  const { data: university } = useGetUniversityByIdQuery(user?.data.university_id!, { skip: !user });
  const { data: faculty } = useGetFacultyByIdQuery(user?.data.faculty_id!, { skip: !user });
  const { data: group } = useGetGroupByIdQuery(user?.data.group_id!, { skip: !user });

  const [updateUserRole, { isLoading: isUpdating }] = useUpdateUserRoleMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [selectedRole, setSelectedRole] = useState<UserRoleName>(user?.data.role || UserRoleName.STUDENT);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.data?.role) {
      setSelectedRole(user.data.role);
      refetch();
    }
  }, [user]);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !user) {
    return <Typography>Error fetching user data.</Typography>;
  }

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
      {/* User Details */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          User Details
        </Typography>
        <Typography>
          <strong>First Name:</strong> {user.data.first_name}
        </Typography>
        <Typography>
          <strong>Last Name:</strong> {user.data.last_name}
        </Typography>
        <Typography>
          <strong>University ID:</strong> {university?.data.name || 'N/A'}
        </Typography>
        <Typography>
          <strong>Faculty ID:</strong> {faculty?.data.name || 'N/A'}
        </Typography>
        <Typography>
          <strong>Group ID:</strong> {group?.data.name || 'N/A'}
        </Typography>
        <Typography>
          <strong>Current Role</strong> {user.data.role || 'N/A'}
        </Typography>
        <Box display="flex" alignItems="center" mt={2}>
          <Typography>
            <strong>Approved:</strong>
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

      {/* Role Management */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Manage Role
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

      {/* Danger Zone */}
      <Paper sx={{ p: 3, border: '1px solid red', backgroundColor: '#ffebee' }}>
        <Typography variant="h6" gutterBottom color="error">
          Danger Zone
        </Typography>
        <Typography variant="body2" color="error" gutterBottom>
          Deleting this user is irreversible. This action cannot be undone.
        </Typography>
        <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={handleOpenDeleteDialog}>
          Delete User
        </Button>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm User Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManage;
