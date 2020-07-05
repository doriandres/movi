import React, { useMemo } from 'react';
import ClientRouter from './ClientRouter';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { deepOrange, teal, grey } from "@material-ui/core/colors";
import NavigationBar from './NavigationBar';
import { useLocation } from 'react-router-dom';


function useTheme() {
  const { pathname } = useLocation();
  const context = useMemo(() => pathname.split('/')[1], [pathname]);
  return useMemo(() => {
    switch (context) {
      case 'conductores':
        return createMuiTheme({ palette: { type: "dark", primary: teal, secondary: grey } })
      case 'admin':
      default:
        return createMuiTheme({ palette: { type: "dark", primary: deepOrange, secondary: grey } });
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
        <NavigationBar />
        <ClientRouter />
      </CssBaseline>
    </ThemeProvider>
  );
}