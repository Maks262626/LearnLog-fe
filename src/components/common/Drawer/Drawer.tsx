import { Box, Drawer } from '@mui/material';

import BottomNav from './BottomNav';
import LeftNav from './LeftNav';
import { styles } from './styles.mui';

const SideBar = () => {
  return (
    <>
      <Box component="nav" sx={styles.wrapper}>
        <Drawer variant="permanent" sx={styles.permanentDrawer} open>
          <LeftNav />
        </Drawer>
      </Box>
      <BottomNav />
    </>
  );
};

export default SideBar;
