import React from 'react';
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from '../Styles/Theme';
import Routes from './Routes';
import { HashRouter as Router } from "react-router-dom";
import { gql } from "apollo-boost"; 
import { useQuery } from 'react-apollo-hooks';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Footer from './Footer';
import Navigator from './Navigator';

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
        <Navigator isLoggedIn={isLoggedIn} />
        <Routes isLoggedIn={isLoggedIn} isAdmin={false}/>
        <Footer />
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
        </>
      </Router>
    </>
  </ThemeProvider>
  );
}