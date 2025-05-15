// src/pages/Home.jsx
import React, { useEffect } from 'react';

import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Reset CSS for the entire application
const theme = createTheme({
  palette: {
    primary: {
      main: '#0a2463',
    },
    secondary: {
      main: '#3e92cc',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': {
          margin: 0,
          padding: 0,
          overflowX: 'hidden',
          width: '100%',
          minHeight: '100vh',
          boxSizing: 'border-box',
        },
        '#root': {
          width: '100%',
          margin: 0,
          padding: 0,
          position: 'relative',
          display: 'block',
        },
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        }
      },
    },
  },
});

const Home = () => {
  // This useEffect ensures no unwanted margins are affecting the layout
  useEffect(() => {
    // Remove any margin or padding on html/body
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    
    // Force full height and width
    document.documentElement.style.height = '100%';
    document.documentElement.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.width = '100%';
    
    // Ensure there's no space at the top
    document.body.style.paddingTop = '0';
    document.body.style.marginTop = '0';
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ position: 'relative' }}>

      </div>
    </ThemeProvider>
  );
};

export default Home;