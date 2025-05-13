import { useNavigate } from 'react-router-dom';

import { routes } from '@/routes';
import { Box, Button } from '@mui/material';

import TileList from '@/components/Lists/TileList';

import { useGetGroupsInMyFacultyQuery } from '@/redux/groupSlice';

const Groups = () => {
  const navigate = useNavigate();
  const { data: groups } = useGetGroupsInMyFacultyQuery();
  const tileData = groups?.data.map((group) => ({
    title: group.name,
    path: `${routes.PUBLIC.GROUP}/${group.id}`,
    onEdit: () => navigate(`${routes.PUBLIC.UPDATE_GROUP}/${group.id}`),
  }));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(routes.PUBLIC.CREATE_GROUP)}
        sx={{ alignSelf: 'center' }}
      >
        Create Group
      </Button>
      {tileData && <TileList tileData={tileData} />}
    </Box>
  );
};

export default Groups;
