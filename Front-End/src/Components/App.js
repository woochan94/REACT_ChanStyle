import React from 'react';
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from '../Styles/Theme';
import AppRouter from './Routes';
import { HashRouter as Router } from "react-router-dom";

export default () => (
  <ThemeProvider theme={Theme}>
    <>
      <GlobalStyles />
      <Router>
        <AppRouter isLoggedIn={true} isAdmin={false}/>
      </Router>
    </>
  </ThemeProvider>
)
