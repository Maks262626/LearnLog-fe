import { createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#FFFD02',
    },
    secondary: {
      main: '#1A1A1A',
    },
    background: {
      default: '#FAFAFA',
      paper: '#282828',
    },
    text: {
      primary: '#FAFAFA',
      secondary: '#FFFD02',
    },
    action: {
      disabledBackground: 'rgba(255, 253, 2, 0.3)',
      disabled: 'rgba(255, 253, 2, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#FAFAFA',
          '&.Mui-disabled': {
            color: '#FAFAFA !important',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            backgroundColor: 'rgba(255, 253, 2, 0.3)',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 253, 2, 0.3)',
          },
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: 'black',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: 'black',
          },
          '& .MuiInputLabel-root.Mui-disabled': {
            color: 'black',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: 'black',
          },
          '& .MuiInputLabel-root.Mui-disabled': {
            color: 'black',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#9c9a0e',
            color: 'black',
            cursor: 'pointer',
          },
        },
      },
    },
  },
});

export default darkTheme;
