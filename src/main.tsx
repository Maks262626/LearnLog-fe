import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import 'dayjs/locale/uk';

import App from './App.tsx';
import Auth0Wrapper from './components/wrappers/Auth0Wrapper.tsx';
import './index.css';
import { setupStore } from './redux/store.ts';
import darkTheme from './utils/theme.ts';

const store = setupStore();
ModuleRegistry.registerModules([AllCommunityModule]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0Wrapper>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
            <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </LocalizationProvider>
        </Provider>
      </Auth0Wrapper>
    </BrowserRouter>
  </StrictMode>,
);
