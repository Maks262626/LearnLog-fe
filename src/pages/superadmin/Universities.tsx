import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { defaultColDef, myTableTheme } from '@/constants';
import { University } from '@/models/University';
import { routes } from '@/routes';
import { Box } from '@mui/material';
import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import Loader from '@/components/common/Loader';

import { useGetUniversitiesQuery } from '@/redux/universityApiSlice';

const Universities = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isLoading } = useGetUniversitiesQuery();

  const columns: ColDef<University>[] = [
    { field: 'name', headerName: t('general.name') },
    { field: 'created_at', headerName: t('general.createdAt') },
  ];

  const handleClick = (uni: University) => {
    navigate(`${routes.PUBLIC.UNIVERSITY}/${uni.id}`);
  };

  const onRowClick = (e: RowClickedEvent) => {
    const user = e.data as University;
    handleClick(user);
  };

  if (isLoading) {
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

export default Universities;
