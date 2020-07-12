import React, { useMemo } from 'react';
import ClientRouter from './ClientRouter';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { deepOrange, teal, grey, pink } from "@material-ui/core/colors";
import NavigationBar from './NavigationBar';
import { useLocation } from 'react-router-dom';
import ErrorHandler from './ErrorHandler';


function useTheme() {
  const { pathname } = useLocation();
  const context = useMemo(() => pathname.split('/')[1], [pathname]);
  return useMemo(() => {
    switch (context) {
      case 'conductores':
        return createMuiTheme({ palette: { type: "dark", primary: teal, secondary: grey } })
      case 'admin':
        return createMuiTheme({ palette: { type: "dark", primary: deepOrange, secondary: grey } });
      default:
        return createMuiTheme({ palette: { type: "dark", primary: pink, secondary: grey } });
    }
  }, [context]);
}

/**
 * Main component
 */
export default function App() {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <ErrorHandler>
          <NavigationBar />
          <ClientRouter />
        </ErrorHandler>
      </CssBaseline>
    </ThemeProvider>
  );
}