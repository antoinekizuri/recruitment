// src/pages/Home.jsx
import React, { useEffect } from 'react';
import Header from '../components/users/Header';
import Hero from '../components/users/Hero';
import JobPositions from '../components/users/JobPositions';
import Footer from '../components/users/Footer';
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

  return (
    <>
      <Header />
      <Hero />
      <JobPositions /> 
      <Footer />
    </>
  );
};

export default Home;