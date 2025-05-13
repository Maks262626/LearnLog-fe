import { useParams } from 'react-router-dom';

import { defaultColDef, myTableTheme } from '@/constants';
import { Faculty } from '@/models/Faculty';
import { Box } from '@mui/material';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import Loader from '@/components/common/Loader';

import { useGetFacultiesByUniversityIdQuery } from '@/redux/facultyApiSlice';

const UniversityFaculties = () => {
  const { id } = useParams();
  if (!id) return;
  const { data, isLoading } = useGetFacultiesByUniversityIdQuery(id);

  const columns: ColDef<Faculty>[] = [
    { field: 'name', headerName: 'Name' },
    { field: 'created_at', headerName: 'Created At' },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box sx={{ height: 500, width: '80%', display: 'grid', margin: '0 auto' }}>
      <AgGridReact theme={myTableTheme} rowData={data?.data} columnDefs={columns} defaultColDef={defaultColDef} />
    </Box>
  );
};

export default UniversityFaculties;
