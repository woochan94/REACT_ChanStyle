import React from 'react';
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from '../Styles/Theme';
import Routes from './Routes';
import { HashRouter as Router } from "react-router-dom";
import { useQuery, useMutation } from 'react-apollo-hooks';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Footer from './Footer';
import Navigator from './Navigator';
import { QUERY, MEMUTATION } from './SharedQueries';
import { useState } from 'react';
import Loader from './Loader';



export default () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);

  const meMutation = useMutation(MEMUTATION);
  const meFunction = async () => {
    const { data } = await meMutation();
    if (data.me.email === process.env.REACT_APP_ADMIN) {
      setIsAdmin(true);
    }
    setLoading(true);
  }

  if (isLoggedIn) {
    meFunction();
  }


  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          {!loading && <Loader />}
          {loading && (
            <>
              <Header />
              <Navigator isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
              <Routes isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
              <Footer />
              <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
            </>

          )}
        </Router>
      </>
    </ThemeProvider>
  );
}