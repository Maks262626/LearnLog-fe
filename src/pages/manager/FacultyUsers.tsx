import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { defaultColDef, myTableTheme } from '@/constants';
import { User } from '@/models/User';
import { routes } from '@/routes';
import { Box } from '@mui/material';
import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import Loader from '@/components/common/Loader';

import { useGetMeQuery, useGetUsersFromFacultyQuery } from '@/redux/usersApiSlice';

const FacultyUsers = () => {
  const navigate = useNavigate();
  const { data: user, isLoading: isMe } = useGetMeQuery();
  const facultyId = user?.data.faculty_id;
  if (!facultyId) return;

  const { t } = useTranslation();
  const { data, isLoading } = useGetUsersFromFacultyQuery(facultyId);

  const columns: ColDef<User>[] = [
    { field: 'first_name', headerName: t('user.firstName') },
    { field: 'last_name', headerName: t('user.lastName') },
    { field: 'is_approved', headerName: t('general.isApproved') },
  ];

  const handleClick = (user: User) => {
    navigate(`${routes.PUBLIC.USERS}/${user.id}`);
  };

  const onRowClick = (e: RowClickedEvent) => {
    const user = e.data as User;
    handleClick(user);
  };

  if (isLoading || isMe) {
    return <Loader />;
  }

  return (
    <Box sx={{ height: 500, width: '80%', display: 'grid', margin: '0 auto' }}>
      <AgGridReact
        theme={myTableTheme}
        rowData={data?.data}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        onRowClicked={onRowClick}
      />
    </Box>
  );
};

export default FacultyUsers;
