import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import firebase from "./firebase";
import "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout";
import Header from "./components/Header";
import Reminders from "./components/Reminders";
import NotFound from "./components/NotFound";

const auth = firebase.auth();

function App() {
  const [sessionStarted, setSessionStarted] = useState(false);

  const handleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  const handleLogout = () => {
    auth.signOut();
    setSessionStarted(false);
  };

  auth.onAuthStateChanged((response) => {
    if (response) {
      setSessionStarted(response);
    }
  });

  return (
    <BrowserRouter>
      <Layout
        session={sessionStarted}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      >
        <Switch>
          {sessionStarted ? (
            <Route exact path="/">
              <Reminders />
              <ToastContainer />
            </Route>
          ) : (
            <Route exact path="/">
              <Header handleLogin={handleLogin} />
            </Route>
          )}
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
