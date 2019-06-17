import React from 'react';
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from '../Styles/Theme';
import AppRouter from './Routes';
import { HashRouter as Router } from "react-router-dom";
import { gql } from "apollo-boost"; 
import { useQuery } from 'react-apollo-hooks';
import Header from "./header";

const QUERY = gql`
  {
    isLoggedIn @client 
  }
`; 

export default () => {
  const {
    data: { isLoggedIn } 
  }= useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
    <>
      <GlobalStyles />
      <Router>
        <>
        <Header />
        <AppRouter isLoggedIn={isLoggedIn} isAdmin={false}/>
        </>
      </Router>
    </>
  </ThemeProvider>
  );
}
  