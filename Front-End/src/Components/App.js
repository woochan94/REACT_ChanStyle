import React from 'react';
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from '../Styles/Theme';
import Routes from './Routes';
import { HashRouter as Router } from "react-router-dom";
import { gql } from "apollo-boost"; 
import { useQuery } from 'react-apollo-hooks';
import Header from "./Header";
import Footer from './Footer';
import Navigator from './Navigator';

const QUERY = gql`
  {
    isLoggedIn @client 
  }
`; 

const Wrapper = styled.div`
  margin: 0 auto; 
  max-width: ${props => props.theme.maxWidth};
  width: 100%; 
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
        <Navigator />
        <Wrapper>
          <Routes isLoggedIn={isLoggedIn} isAdmin={false}/>
        </Wrapper>
        <Footer />
        </>
      </Router>
    </>
  </ThemeProvider>
  );
}