import { Link } from 'react-router-dom';

import { sidebarLinks } from '@/routes';
import { Box, Divider, IconButton, Stack, Tooltip } from '@mui/material';

import { styles } from './styles.mui';

const { leftNav: s } = styles;

const LeftNav = () => {
  return (
    <Box sx={s.wrapper}>
      <Box sx={s.logoWrapper}>
        <Box sx={s.logoInner}>
          <img src="/logoIcon.png" alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </Box>
      </Box>

      <Divider sx={s.divider} />

      <Box sx={s.stackWrapper}>
        <Stack spacing={2} sx={s.stack}>
          {sidebarLinks.map((link, idx) => (
            <Link key={idx} to={link.route} style={s.link}>
              <Tooltip title={link.label} arrow>
                <IconButton sx={s.icon}>
                  <link.icon />
                </IconButton>
              </Tooltip>
            </Link>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default LeftNav;
