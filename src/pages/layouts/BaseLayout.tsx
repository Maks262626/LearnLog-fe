import { Outlet } from 'react-router-dom';

import { sidebarWidth } from '@/constants';
import { Box } from '@mui/material';

import SideBar from '@/components/common/Drawer/Drawer';

const BaseLayout = () => {
  return (
    <Box sx={{ height: '100dvh', pl: { xs: 0, md: `${sidebarWidth}px` } }}>
      <SideBar />
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          pt: 8,
          backgroundColor: 'secondary.main',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default BaseLayout;
