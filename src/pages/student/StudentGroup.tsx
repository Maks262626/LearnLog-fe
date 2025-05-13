import { defaultColDef, myTableTheme } from '@/constants';
import { User } from '@/models/User';
import { Box } from '@mui/material';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import Loader from '@/components/common/Loader';

import { useGetUsersInMyGroupQuery } from '@/redux/usersApiSlice';

const StudentGroup = () => {
  const { data: users, isLoading } = useGetUsersInMyGroupQuery();

  const columns: ColDef<User>[] = [
    {
      valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
      width: 80,
      cellStyle: { fontWeight: 'bold', textAlign: 'center' },
      pinned: 'left',
    },
    { field: 'first_name', headerName: 'First Name' },
    { field: 'last_name', headerName: 'Last Name' },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box sx={{ height: 500, width: '80%', display: 'grid', margin: '0 auto' }}>
      <AgGridReact
        theme={myTableTheme}
        rowData={users?.data}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        getRowHeight={() => 60}
        rowStyle={{ fontSize: '20px' }}
      />
    </Box>
  );
};

export default StudentGroup;
