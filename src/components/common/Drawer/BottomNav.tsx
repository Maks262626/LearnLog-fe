import { Link } from 'react-router-dom';

import { sidebarLinks } from '@/routes';
import { Box, IconButton, Stack } from '@mui/material';

import { styles } from './styles.mui';

const { bottomNav: s } = styles;

const BottomNav = () => {
  return (
    <Box sx={s.wrapper}>
      <Box sx={s.inner}>
        <Stack sx={s.stack}>
          {sidebarLinks.map((link, idx) => (
            <Link key={idx} to={link.route} style={s.link}>
              <IconButton sx={s.icon}>
                <link.icon />
              </IconButton>
            </Link>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default BottomNav;
