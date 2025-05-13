import { sidebarWidth } from '@/constants';

export const styles = {
  wrapper: { width: { md: sidebarWidth }, flexShrink: { md: 0 }, display: { sm: 'none', md: 'block' } },
  permanentDrawer: {
    display: { xs: 'none', md: 'block' },
    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: sidebarWidth },
  },
  tempDrawer: {
    display: { xs: 'block', md: 'none' },
    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: sidebarWidth },
  },
  bottomNav: {
    wrapper: {
      position: 'fixed',
      width: '100%',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'background.paper',
      bottom: 0,
      left: 0,
      display: { sm: 'flex', md: 'none' },
      zIndex: 100,
    },
    inner: { width: '100%', py: 2 },
    stack: { display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' },
    link: { textDecoration: 'none' },
    icon: {
      color: 'text.primary',
      bgcolor: 'background.paper',
      width: 56,
      height: 56,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      '&:hover': {
        bgcolor: 'primary.main',
        color: 'background.paper',
      },
    },
  },
  leftNav: {
    wrapper: {
      height: '100svh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    logoWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      width: '100%',
      marginBottom: '24px',
    },
    logoInner: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      overflow: 'hidden',
      border: '2px solid #FAFAFA',
    },
    logo: { width: '100%', height: '100%', objectFit: 'cover' },
    divider: { width: '100%', mb: 2, backgroundColor: 'text.primary' },
    stackWrapper: { width: '100%', mt: 2 },
    stack: { display: 'flex', alignItems: 'center' },
    link: { textDecoration: 'none' },
    icon: {
      color: 'text.primary',
      bgcolor: 'background.paper',
      width: 56,
      height: 56,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      '&:hover': {
        bgcolor: 'primary.main',
        color: 'background.paper',
      },
    },
  },
};
